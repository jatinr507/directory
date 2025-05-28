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
        <div :class="showEditProfile ? 'h-full' : 'mt-auto'">
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
            class="bg-[#F8F9FC] h-[calc(100%-56px)] overflow-y-auto"
          >
            <div class="p-6 space-y-6">
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
                      placeholder="Enter"
                    />
                  </div>

                  <div>
                    <label class="block text-gray-700 text-sm mb-1">Company Address Line 2</label>
                    <input
                      v-model="form.addressLine2"
                      type="text"
                      class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                      placeholder="Enter"
                    />
                  </div>

                  <div>
                    <label class="block text-gray-700 text-sm mb-1">City</label>
                    <input
                      v-model="form.city"
                      type="text"
                      class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                      placeholder="Enter"
                    />
                  </div>

                  <div>
                    <label class="block text-gray-700 text-sm mb-1">State</label>
                    <input
                      v-model="form.state"
                      type="text"
                      class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                      placeholder="Enter"
                    />
                  </div>

                  <div>
                    <label class="block text-gray-700 text-sm mb-1">ZIP Code</label>
                    <input
                      v-model="form.zipCode"
                      type="text"
                      class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                      placeholder="Enter"
                    />
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-4">
                <button
                  @click="showEditProfile = false"
                  class="px-6 py-2 text-[#2E4172] border border-[#2E4172] rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  @click="saveProfile"
                  class="px-6 py-2 bg-[#2E4172] text-white rounded hover:bg-[#1E2B4A]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="ml-[280px] p-8">
      <h1 class="text-2xl font-bold text-[#2E4172] mb-6">Directory</h1>
      <!-- Add your directory content here -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showEditProfile = ref(false)
const searchQuery = ref('')

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

const saveProfile = () => {
  // Implement save profile logic here
  showEditProfile.value = false
}
</script>