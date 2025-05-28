<template>
  <div class="min-h-screen bg-white">
    <!-- Left Sidebar -->
    <div class="fixed left-0 top-[76px] w-[280px] h-[calc(100vh-76px)] bg-white border-r border-gray-200">
      <div class="h-full flex flex-col">
        <!-- Filter Section -->
        <div v-show="!showEditProfile" class="p-6">
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
            @click="toggleEditProfile"
            class="w-full flex items-center justify-between px-6 py-4 text-[#2E4172] hover:bg-gray-50"
          >
            <div class="flex items-center gap-2">
              <span class="material-icons">person</span>
              Edit Profile
            </div>
            <span class="material-icons" :class="{ 'rotate-180': showEditProfile }">
              expand_less
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="ml-[280px]">
      <!-- Sticky Header -->
      <div class="sticky top-[76px] bg-white z-20 border-b">
        <!-- Main Header -->
        <div class="px-8 py-6 border-b">
          <h1 class="text-2xl font-bold text-[#2E4172]">Directory</h1>
        </div>
        
        <!-- A-Z Filters -->
        <div class="px-8 py-4 bg-white">
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
              @click="clearLetterFilter"
              :class="[
                'px-3 h-8 rounded-full text-sm font-medium flex-shrink-0',
                !selectedLetter 
                  ? 'bg-[#2E4172] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              All
            </button>
            <button 
              v-for="letter in alphabet" 
              :key="letter"
              @click="filterByLetter(letter)"
              :class="[
                'w-8 h-8 rounded-full text-sm font-medium flex-shrink-0',
                selectedLetter === letter 
                  ? 'bg-[#2E4172] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ letter }}
            </button>
          </div>
        </div>
      </div>

      <!-- Profile Grid -->
      <div class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="profile in filteredProfiles" 
            :key="profile.id"
            class="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div class="flex items-start space-x-4">
              <img 
                :src="profile.profile_photo_url || 'https://placehold.co/100x100?text=👤'" 
                :alt="profile.full_name"
                class="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div class="min-w-0 flex-1">
                <h3 class="font-semibold text-lg text-[#2E4172] truncate">{{ profile.full_name }}</h3>
                <p class="text-gray-600 truncate">{{ profile.title }}</p>
                <p class="text-gray-500 text-sm truncate">{{ profile.company }}</p>
              </div>
            </div>
            
            <div class="mt-4 space-y-2">
              <p v-if="profile.email" class="text-sm truncate">
                <span class="material-icons text-gray-400 text-base align-middle mr-2">email</span>
                <a :href="'mailto:' + profile.email" class="text-blue-600 hover:underline">{{ profile.email }}</a>
              </p>
              <p v-if="profile.phone" class="text-sm truncate">
                <span class="material-icons text-gray-400 text-base align-middle mr-2">phone</span>
                {{ profile.phone }}
              </p>
              <p v-if="profile.linkedin" class="text-sm truncate">
                <span class="material-icons text-gray-400 text-base align-middle mr-2">link</span>
                <a :href="profile.linkedin" target="_blank" class="text-blue-600 hover:underline">LinkedIn Profile</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="showEditProfile" class="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class="fixed right-0 top-[76px] w-[480px] h-[calc(100vh-76px)] bg-white shadow-xl overflow-y-auto">
        <div class="p-6 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-[#2E4172] text-xl font-semibold">Edit Profile</h2>
            <button 
              @click="toggleEditProfile"
              class="text-gray-500 hover:text-gray-700"
            >
              <span class="material-icons">close</span>
            </button>
          </div>

          <form @submit.prevent="saveProfile">
            <!-- Contact Information -->
            <div class="space-y-6">
              <h3 class="text-[#2E4172] font-semibold">Contact Information</h3>
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
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">LinkedIn URL</label>
                  <input
                    v-model="form.linkedin"
                    type="url"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>

                <div>
                  <label class="block text-gray-700 text-sm mb-1">Company Website URL</label>
                  <input
                    v-model="form.website"
                    type="url"
                    class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  />
                </div>
              </div>
            </div>

            <!-- About Information -->
            <div class="mt-8 space-y-6">
              <h3 class="text-[#2E4172] font-semibold">About Information</h3>
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

            <div class="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                @click="toggleEditProfile"
                class="px-6 py-2 text-[#2E4172] border border-[#2E4172] rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-[#2E4172] text-white rounded hover:bg-[#1E2B4A]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'

const showEditProfile = ref(false)
const searchQuery = ref('')
const profiles = ref([])
const loading = ref(true)
const selectedLetter = ref('')

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

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

const filteredProfiles = computed(() => {
  let filtered = profiles.value

  if (selectedLetter.value) {
    filtered = filtered.filter(profile => 
      profile.full_name?.charAt(0).toUpperCase() === selectedLetter.value
    )
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(profile => 
      profile.full_name?.toLowerCase().includes(query) ||
      profile.title?.toLowerCase().includes(query) ||
      profile.company?.toLowerCase().includes(query) ||
      profile.email?.toLowerCase().includes(query)
    )
  }

  return filtered
})

const filterByLetter = (letter) => {
  selectedLetter.value = letter
}

const clearLetterFilter = () => {
  selectedLetter.value = ''
}

const toggleEditProfile = () => {
  showEditProfile.value = !showEditProfile.value
  if (showEditProfile.value) {
    loadUserProfile()
  }
}

const fetchProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('status', 'approved')
  
  if (!error && data) {
    profiles.value = data.sort((a, b) => 
      a.full_name.localeCompare(b.full_name)
    )
  }
  loading.value = false
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

const saveProfile = async () => {
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
    await fetchProfiles()
  }
}

onMounted(() => {
  fetchProfiles()
  loadUserProfile()
})
</script>