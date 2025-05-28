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
              <span class="material-icons">search</span>
            </div>
          </div>
        </div>

        <!-- Edit Profile Section -->
        <div class="mt-auto border-t">
          <button 
            @click="showEditProfile = true"
            class="w-full flex items-center justify-between px-6 py-4 text-[#2E4172] hover:bg-gray-50"
          >
            <div class="flex items-center gap-2">
              <span class="material-icons">person</span>
              Edit Profile
            </div>
            <span class="material-icons">expand_less</span>
          </button>
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
                <span class="material-icons text-sm">email</span>
                {{ profile.email }}
              </a>
              <a 
                v-if="profile.phone"
                :href="`tel:${profile.phone}`"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2E4172]"
              >
                <span class="material-icons text-sm">phone</span>
                {{ profile.phone }}
              </a>
              <a 
                v-if="profile.linkedin"
                :href="profile.linkedin"
                target="_blank"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2E4172]"
              >
                <span class="material-icons text-sm">link</span>
                LinkedIn
              </a>
              <a 
                v-if="profile.website"
                :href="profile.website"
                target="_blank"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2E4172]"
              >
                <span class="material-icons text-sm">language</span>
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

    <!-- Edit Profile Popup -->
    <EditProfilePopup
      :is-open="showEditProfile"
      @close="showEditProfile = false"
      @save="fetchProfiles"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import EditProfilePopup from '../components/EditProfilePopup.vue'

const profiles = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedLetter = ref('all')
const showEditProfile = ref(false)

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