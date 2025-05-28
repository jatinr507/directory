<template>
  <div class="min-h-screen bg-white">
    <!-- Left Sidebar -->
    <div class="fixed left-0 top-[76px] w-[280px] h-[calc(100vh-76px)] bg-white border-r border-gray-200">
      <div class="h-full flex flex-col">
        <!-- Filter Section -->
        <div class="p-6">
          <h2 class="text-[#2E4172] text-xl font-bold mb-4">Filter</h2>
          
          <!-- Search Input -->
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Type to Search..."
              class="w-full pl-4 pr-10 py-2 bg-[#F8F9FC] border-b border-[#2E4172] focus:outline-none"
            />
            <div class="absolute right-3 top-2.5 text-[#2E4172]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Edit Profile Section -->
        <div class="mt-auto border-t">
          <router-link 
            to="/profile" 
            class="flex items-center justify-between px-6 py-4 text-[#2E4172] hover:bg-gray-50"
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
    </div>

    <!-- Main Content -->
    <div class="ml-[280px] min-h-screen">
      <!-- Alphabet Filter -->
      <div class="border-b border-gray-200">
        <div class="px-8 py-4 flex items-center gap-6">
          <button 
            @click="selectedLetter = 'all'"
            class="px-2 py-1 text-sm font-medium"
            :class="selectedLetter === 'all' ? 'text-[#2E4172]' : 'text-gray-500 hover:text-[#2E4172]'"
          >
            All
          </button>
          <button 
            v-for="letter in alphabet" 
            :key="letter"
            @click="selectedLetter = letter"
            class="px-2 py-1 text-sm font-medium"
            :class="selectedLetter === letter ? 'text-[#2E4172]' : 'text-gray-500 hover:text-[#2E4172]'"
          >
            {{ letter }}
          </button>
        </div>
      </div>

      <!-- Selected Letter Header -->
      <div class="px-8 py-6" v-if="selectedLetter !== 'all'">
        <h2 class="text-2xl font-medium text-gray-900">{{ selectedLetter }}</h2>
      </div>

      <!-- Profile Cards Grid -->
      <div class="px-8 py-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="profile in filteredProfiles"
            :key="profile.id"
            class="bg-[#F8F9FC] rounded-lg overflow-hidden"
          >
            <div class="p-4">
              <div class="flex items-start gap-4">
                <img
                  :src="profile.profile_photo_url || 'https://placehold.co/100x100?text=👤'"
                  :alt="profile.full_name"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 class="font-medium text-gray-900">{{ profile.full_name }}</h3>
                  <p class="text-sm text-gray-500">{{ profile.title }}</p>
                  <p class="text-sm text-gray-500">{{ profile.company }}</p>
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div class="border-t border-gray-200">
              <div class="flex">
                <button 
                  class="flex-1 px-4 py-2 text-sm font-medium text-[#2E4172] border-b-2 border-[#2E4172]"
                >
                  Contact
                </button>
                <button 
                  class="flex-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  About
                </button>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="p-4 space-y-2">
              <a 
                :href="`mailto:${profile.email}`"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2E4172]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ profile.email }}
              </a>
              <a 
                v-if="profile.phone"
                :href="`tel:${profile.phone}`"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2E4172]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {{ profile.phone }}
              </a>
              <a 
                v-if="profile.linkedin"
                :href="profile.linkedin"
                target="_blank"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2E4172]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              <a 
                v-if="profile.website"
                :href="profile.website"
                target="_blank"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2E4172]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Website
              </a>
            </div>
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
      profile.title?.toLowerCase().includes(query) ||
      profile.company?.toLowerCase().includes(query)
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