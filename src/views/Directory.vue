<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const profiles = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const activeLetter = ref(null)
const router = useRouter()

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push('/login')
    return
  }

  const { data, error: fetchError } = await supabase
    .from('profiles')
    .select('id, full_name, title, institution, department, email, phone, profile_photo_url')
    .eq('status', 'approved')

  if (fetchError) {
    error.value = fetchError.message
  } else {
    profiles.value = (data || []).sort((a, b) => a.full_name.localeCompare(b.full_name))
  }

  loading.value = false
})

const filteredProfiles = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return profiles.value.filter((p) => {
    const matchesSearch =
      p.full_name?.toLowerCase().includes(q) ||
      p.title?.toLowerCase().includes(q) ||
      p.institution?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.phone?.toLowerCase().includes(q)
    const matchesLetter = activeLetter.value
      ? p.full_name?.toLowerCase().startsWith(activeLetter.value.toLowerCase())
      : true
    return matchesSearch && matchesLetter
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto mt-10 p-4">
    <h2 class="text-2xl font-semibold mb-6">Directory</h2>

    <div class="flex flex-wrap gap-1 mb-2">
      <button
        v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')"
        :key="letter"
        @click="activeLetter = activeLetter === letter ? null : letter"
        :class="[
          'px-2 py-1 text-sm rounded border',
          activeLetter === letter ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
        ]"
      >{{ letter }}</button>
    </div>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by name, title, institution, email, or phone"
      class="mb-2 w-full p-2 border border-gray-300 rounded"
    />
    <p class="text-sm text-gray-600 mb-4">
      Showing {{ filteredProfiles.length }} {{ filteredProfiles.length === 1 ? 'profile' : 'profiles' }}
    </p>

    <div v-if="loading" class="text-gray-500">Loading profiles...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        <p class="text-sm text-center text-gray-500">
          <a :href="'mailto:' + profile.email" class="text-blue-600 hover:underline">{{ profile.email }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
