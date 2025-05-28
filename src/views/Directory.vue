<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">User Directory</h1>
        
        <!-- Search input -->
        <div class="mb-6">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search users..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- User grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="profile in filteredProfiles"
            :key="profile.id"
            class="bg-white border rounded-lg shadow-sm p-4"
          >
            <router-link :to="`/profile/${profile.id}`" class="block">
              <div class="flex items-center space-x-4">
                <img
                  :src="profile.avatar_url || '/default-avatar.png'"
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const profiles = ref([])
const loading = ref(true)
const searchQuery = ref('')

const filteredProfiles = computed(() => {
  if (!searchQuery.value) return profiles.value
  
  const query = searchQuery.value.toLowerCase()
  return profiles.value.filter(profile => 
    profile.full_name?.toLowerCase().includes(query) ||
    profile.title?.toLowerCase().includes(query)
  )
})

async function fetchProfiles() {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
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