<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 class="text-2xl font-bold text-primary">Directory</h2>
      
      <div class="flex items-center gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search directory..."
          class="px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
        />
        
        <div class="relative">
          <button 
            @click="showFilters = !showFilters"
            class="px-4 py-2 bg-white border border-neutral-200 rounded-lg flex items-center gap-2 hover:bg-neutral-50 transition"
          >
            <span>Filters</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
          </button>
          
          <!-- Filter dropdown -->
          <div v-if="showFilters" class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-card border border-neutral-200 p-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-1">Institution</label>
              <select v-model="selectedInstitution" class="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary">
                <option value="">All Institutions</option>
                <option v-for="inst in institutions" :key="inst" :value="inst">{{ inst }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-1">Department</label>
              <select v-model="selectedDepartment" class="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary">
                <option value="">All Departments</option>
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-secondary mx-auto"></div>
      <p class="mt-4 text-neutral-600">Loading profiles...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">{{ error }}</div>
    
    <div v-else>
      <p class="text-neutral-600 mb-6">
        Showing {{ filteredProfiles.length }} {{ filteredProfiles.length === 1 ? 'profile' : 'profiles' }}
      </p>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="profile in filteredProfiles"
          :key="profile.id"
          @click="router.push(`/profiles/${profile.id}`)"
          class="bg-white rounded-xl shadow-card hover:shadow-lg transition cursor-pointer border border-neutral-100 overflow-hidden"
        >
          <div class="aspect-w-16 aspect-h-9 bg-neutral-100">
            <img
              :src="profile.profile_photo_url || 'https://placehold.co/400x225?text=👤'"
              :alt="profile.full_name"
              class="w-full h-full object-cover"
            />
          </div>
          
          <div class="p-6">
            <h3 class="text-lg font-semibold text-primary mb-1">{{ profile.full_name }}</h3>
            <p class="text-neutral-600 text-sm mb-4">{{ profile.title }}, {{ profile.institution }}</p>
            
            <div class="flex items-center gap-3 text-sm text-neutral-500">
              <a 
                :href="'mailto:' + profile.email"
                class="text-secondary hover:text-secondary-dark transition"
                @click.stop
              >
                Contact
              </a>
              <span>•</span>
              <span>{{ profile.department }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const profiles = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const showFilters = ref(false)
const selectedInstitution = ref('')
const selectedDepartment = ref('')
const router = useRouter()

const institutions = computed(() => {
  return [...new Set(profiles.value.map(p => p.institution).filter(Boolean))]
})

const departments = computed(() => {
  return [...new Set(profiles.value.map(p => p.department).filter(Boolean))]
})

const filteredProfiles = computed(() => {
  return profiles.value.filter(p => {
    const matchesSearch = !searchQuery.value || [
      p.full_name,
      p.title,
      p.institution,
      p.department,
      p.email
    ].some(field => field?.toLowerCase().includes(searchQuery.value.toLowerCase()))

    const matchesInstitution = !selectedInstitution.value || p.institution === selectedInstitution.value
    const matchesDepartment = !selectedDepartment.value || p.department === selectedDepartment.value

    return matchesSearch && matchesInstitution && matchesDepartment
  })
})

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push('/login')
    return
  }

  const { data, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('status', 'approved')

  if (fetchError) {
    error.value = fetchError.message
  } else {
    profiles.value = (data || []).sort((a, b) => a.full_name.localeCompare(b.full_name))
  }

  loading.value = false
})
</script>