<template>
  <div class="max-w-6xl mx-auto mt-10 p-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">ICSPS Directory</h2>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search by name, email, institution..."
        class="w-64 px-4 py-2 border rounded"
      />
    </div>

    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else-if="filteredProfiles.length === 0" class="text-center text-gray-500">
      No profiles found.
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="profile in filteredProfiles"
        :key="profile.id"
        class="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
      >
        <img
          :src="profile.profile_photo_url || 'https://placehold.co/100x100?text=👤'"
          alt="Profile"
          class="w-20 h-20 rounded-full object-cover mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold text-center">{{ profile.full_name }}</h3>
        <p class="text-sm text-center text-gray-600">{{ profile.title }}, {{ profile.institution }}</p>
        <div class="mt-3 text-center">
          <a
            :href="'mailto:' + profile.email"
            class="text-blue-600 hover:underline flex justify-center items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12l-4-4-4 4m0 0l4 4m-4-4h8" />
            </svg>
            {{ profile.email }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const profiles = ref([])
const searchTerm = ref('')
const loading = ref(true)
const error = ref(null)
const router = useRouter()

const filteredProfiles = computed(() => {
  const q = searchTerm.value.toLowerCase()
  return profiles.value.filter(profile =>
    profile.full_name?.toLowerCase().includes(q) ||
    profile.email?.toLowerCase().includes(q) ||
    profile.institution?.toLowerCase().includes(q) ||
    profile.department?.toLowerCase().includes(q) ||
    profile.phone?.toLowerCase().includes(q)
  )
})

onMounted(async () => {
  const { data: user } = await supabase.auth.getUser()
  if (!user) {
    router.push('/login')
    return
  }

  const { data, error: fetchError } = await supabase
    .from('profiles')
    .select('id, full_name, title, institution, department, email, phone, profile_photo_url, status')
    .eq('status', 'approved')

  if (fetchError) {
    error.value = fetchError.message
  } else {
    profiles.value = data
  }

  loading.value = false
})
</script>

<style scoped>
input {
  @apply border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
