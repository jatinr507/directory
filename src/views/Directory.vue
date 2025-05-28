<template>
  <div class="min-h-screen bg-white">
    <!-- Header with Logos -->
    <div class="border-b">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <img 
            src="https://icsps.illinoisstate.edu/wp-content/uploads/2022/12/ICSPS-Logo-1.png" 
            alt="ICSPS Logo" 
            class="h-8 object-contain"
          />
          <div class="w-px h-8 bg-neutral-200"></div>
          <img 
            src="https://www.iccb.org/iccb/wp-content/uploads/2016/01/iccb-logo.png" 
            alt="ICCB Logo" 
            class="h-8 object-contain"
          />
        </div>
        <button 
          @click="signOut"
          class="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition"
        >
          <span>Logout</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Filter Section -->
      <div class="mb-8">
        <h2 class="text-lg font-medium text-neutral-700 mb-4">Filter</h2>
        
        <!-- Search Bar -->
        <div class="relative mb-6">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Type to Search..."
            class="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            class="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        <!-- Alphabet Filter -->
        <div class="flex flex-wrap gap-1">
          <button
            @click="selectedLetter = ''"
            :class="[
              'px-3 py-1 rounded-lg transition',
              !selectedLetter ? 'bg-secondary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            ]"
          >All</button>
          <button
            v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')"
            :key="letter"
            @click="selectedLetter = letter"
            :class="[
              'px-3 py-1 rounded-lg transition',
              selectedLetter === letter ? 'bg-secondary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            ]"
          >{{ letter }}</button>
        </div>
      </div>

      <!-- Directory Grid -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-secondary mx-auto"></div>
        <p class="mt-4 text-neutral-600">Loading profiles...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="profile in filteredProfiles"
          :key="profile.id"
          class="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition"
        >
          <!-- Profile Image -->
          <div class="aspect-w-4 aspect-h-3 bg-neutral-100">
            <img
              :src="profile.profile_photo_url || 'https://placehold.co/400x300?text=👤'"
              :alt="profile.full_name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Profile Info -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-neutral-800">{{ profile.full_name }}</h3>
            <p class="text-neutral-600 text-sm mb-4">
              {{ profile.title }}<br>
              {{ profile.institution }}
            </p>

            <!-- Tabs -->
            <div class="border-b border-neutral-200 mb-4">
              <div class="flex gap-6">
                <button 
                  @click="profile.activeTab = 'contact'"
                  :class="[
                    'pb-2 text-sm font-medium transition',
                    profile.activeTab === 'contact' 
                      ? 'text-secondary border-b-2 border-secondary' 
                      : 'text-neutral-600 hover:text-neutral-800'
                  ]"
                >Contact</button>
                <button 
                  @click="profile.activeTab = 'about'"
                  :class="[
                    'pb-2 text-sm font-medium transition',
                    profile.activeTab === 'about' 
                      ? 'text-secondary border-b-2 border-secondary' 
                      : 'text-neutral-600 hover:text-neutral-800'
                  ]"
                >About</button>
              </div>
            </div>

            <!-- Tab Content -->
            <div v-if="profile.activeTab === 'contact'" class="space-y-2">
              <a 
                :href="`mailto:${profile.email}`"
                class="flex items-center gap-2 text-sm text-neutral-600 hover:text-secondary transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {{ profile.email }}
              </a>
              <a 
                v-if="profile.phone"
                :href="`tel:${profile.phone}`"
                class="flex items-center gap-2 text-sm text-neutral-600 hover:text-secondary transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {{ profile.phone }}
              </a>
              <a 
                v-if="profile.website"
                :href="profile.website"
                target="_blank"
                class="flex items-center gap-2 text-sm text-neutral-600 hover:text-secondary transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                Website
              </a>
            </div>

            <div v-else class="space-y-2 text-sm text-neutral-600">
              <p><strong>Department:</strong> {{ profile.department }}</p>
              <p><strong>Research Areas:</strong> {{ profile.research_areas }}</p>
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
const selectedLetter = ref('')
const router = useRouter()

const filteredProfiles = computed(() => {
  return profiles.value
    .filter(p => {
      const matchesSearch = !searchQuery.value || [
        p.full_name,
        p.title,
        p.institution,
        p.department,
        p.email
      ].some(field => field?.toLowerCase().includes(searchQuery.value.toLowerCase()))

      const matchesLetter = !selectedLetter.value || 
        p.full_name?.charAt(0).toUpperCase() === selectedLetter.value

      return matchesSearch && matchesLetter
    })
    .map(p => ({
      ...p,
      activeTab: ref('contact')
    }))
})

const signOut = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

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