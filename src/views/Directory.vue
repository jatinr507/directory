<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex gap-8">
        <!-- Left Sidebar -->
        <div class="w-64 flex-shrink-0 flex flex-col h-[calc(100vh-8rem)]">
          <!-- Filter Section -->
          <div class="bg-[#F8F9FC] rounded-lg p-6">
            <h2 class="text-[#2E4172] text-xl font-bold mb-4">Filter</h2>
            
            <!-- Search Input -->
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Type to Search..."
                class="w-full pl-4 pr-10 py-2 bg-white border-b border-[#2E4172] focus:outline-none"
              />
              <div class="absolute right-3 top-2.5 text-[#2E4172]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Edit Profile Section -->
          <div class="mt-auto bg-white rounded-lg shadow-sm">
            <router-link 
              to="/profile" 
              class="flex items-center justify-between px-6 py-4 text-[#2E4172] hover:text-[#1E2B4A] font-medium"
            >
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Edit Profile
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Alphabet Filter -->
          <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div class="flex flex-wrap gap-2">
              <button 
                @click="selectedLetter = 'all'"
                :class="[
                  'px-3 py-1 rounded transition',
                  selectedLetter === 'all' ? 'bg-[#2E4172] text-white' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                All
              </button>
              <button 
                v-for="letter in alphabet" 
                :key="letter"
                @click="selectedLetter = letter"
                :class="[
                  'px-3 py-1 rounded transition',
                  selectedLetter === letter ? 'bg-[#2E4172] text-white' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                {{ letter }}
              </button>
            </div>
          </div>

          <!-- User grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="profile in filteredProfiles"
              :key="profile.id"
              class="bg-white rounded-lg shadow-sm p-4"
            >
              <router-link :to="`/profile/${profile.id}`" class="block">
                <div class="flex items-center space-x-4">
                  <img
                    :src="profile.profile_photo_url || 'https://placehold.co/100x100?text=👤'"
                    :alt="profile.full_name"
                    class="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">
                      {{ profile.full_name }}
                    </h3>
                    <p class="text-sm text-gray-500">{{ profile.title }}</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-500">Loading profiles...</p>
          </div>

          <!-- Empty state -->
          <div v-if="!loading && filteredProfiles.length === 0" class="text-center py-8">
            <p class="text-gray-500">No profiles found</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const profiles = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedLetter = ref('all')

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const filteredProfiles = computed(() => {
  let filtered = profiles.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(profile => 
      profile.full_name?.toLowerCase().includes(query) ||
      profile.title?.toLowerCase().includes(query)
    )
  }

  // Apply letter filter
  if (selectedLetter.value !== 'all') {
    filtered = filtered.filter(profile => 
      profile.full_name?.charAt(0).toUpperCase() === selectedLetter.value
    )
  }

  return filtered
})

async function fetchProfiles() {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('status', 'approved')
      .order('full_name')
    
    if (error) throw error
    profiles.value = data
  } catch (error) {
    console.error('Error fetching profiles:', error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfiles()
})
</script>