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
        <div class="mt-auto">
          <button 
            @click="showEditProfile = !showEditProfile"
            class="w-full flex items-center justify-between px-6 py-4 text-[#2E4172] hover:bg-gray-50 border-t"
          >
            <div class="flex items-center gap-2">
              <span class="material-icons">person</span>
              Edit Profile
            </div>
            <span class="material-icons" :class="{ 'rotate-180': showEditProfile }">
              expand_less
            </span>
          </button>

          <!-- Edit Profile Form -->
          <div 
            v-show="showEditProfile"
            class="bg-[#F8F9FC] p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-300px)]"
          >
            <div>
              <h3 class="text-[#2E4172] font-semibold mb-4">Contact Information</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-gray-700 text-sm mb-1">
                    First Name<span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">
                    Last Name<span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">
                    Work Email<span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">Work Phone Number</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                    placeholder="Enter"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">LinkedIn URL</label>
                  <input
                    v-model="form.linkedin"
                    type="url"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                    placeholder="Enter"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">Company Website URL</label>
                  <input
                    v-model="form.website"
                    type="url"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                    placeholder="Enter"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-[#2E4172] font-semibold mb-4">About Information</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-gray-700 text-sm mb-1">
                    Job Title<span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.title"
                    type="text"
                    required
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">
                    Company<span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.company"
                    type="text"
                    required
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">
                    Organization<span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.organization"
                    required
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  >
                    <option value="">Select Organization</option>
                    <option value="Community College">Community College</option>
                    <option value="University">University</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">Company Address Line 1</label>
                  <input
                    v-model="form.addressLine1"
                    type="text"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">Company Address Line 2</label>
                  <input
                    v-model="form.addressLine2"
                    type="text"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">City</label>
                  <input
                    v-model="form.city"
                    type="text"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">State</label>
                  <select
                    v-model="form.state"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  >
                    <option value="">Select State</option>
                    <option value="IL">Illinois</option>
                    <option value="MI">Michigan</option>
                    <option value="WI">Wisconsin</option>
                  </select>
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">Zip Code</label>
                  <input
                    v-model="form.zipCode"
                    type="text"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>
              </div>
            </div>

            <div class="pt-4">
              <button
                @click="handleSubmit"
                class="w-full px-6 py-2 bg-[#2E4172] text-white rounded hover:bg-[#1E2B4A] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const profiles = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedLetter = ref('all')
const showEditProfile = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedin: '',
  website: '',
  title: '',
  company: '',
  organization: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: ''
})

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

const loadUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      const names = profile.full_name.split(' ')
      form.value = {
        firstName: names[0],
        lastName: names.slice(1).join(' '),
        email: profile.email,
        phone: profile.phone || '',
        linkedin: profile.linkedin || '',
        website: profile.website || '',
        title: profile.title || '',
        company: profile.company || '',
        organization: profile.organization || '',
        addressLine1: profile.address_line1 || '',
        addressLine2: profile.address_line2 || '',
        city: profile.city || '',
        state: profile.state || '',
        zipCode: profile.zip_code || ''
      }
    }
  }
}

const handleSubmit = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: `${form.value.firstName} ${form.value.lastName}`,
      email: form.value.email,
      phone: form.value.phone,
      linkedin: form.value.linkedin,
      website: form.value.website,
      title: form.value.title,
      company: form.value.company,
      organization: form.value.organization,
      address_line1: form.value.addressLine1,
      address_line2: form.value.addressLine2,
      city: form.value.city,
      state: form.value.state,
      zip_code: form.value.zipCode
    })
    .eq('id', user.id)

  if (!error) {
    showEditProfile.value = false
    fetchProfiles()
  }
}

onMounted(() => {
  fetchProfiles()
  loadUserProfile()
})
</script>