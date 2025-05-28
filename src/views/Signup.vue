<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
    <div class="w-full max-w-3xl">
      <h1 class="text-[#2E4172] text-3xl font-bold text-center mb-12">Create Profile</h1>

      <form @submit.prevent="handleSignup" class="space-y-8">
        <!-- Contact Information -->
        <div>
          <h2 class="text-[#2E4172] text-xl font-semibold mb-6">Contact Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-gray-700">First Name<span class="text-red-500">*</span></label>
              <input
                v-model="firstName"
                type="text"
                required
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">Last Name<span class="text-red-500">*</span></label>
              <input
                v-model="lastName"
                type="text"
                required
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">Work Email<span class="text-red-500">*</span></label>
              <input
                v-model="email"
                type="email"
                required
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">Work Phone Number</label>
              <input
                v-model="phone"
                type="tel"
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">LinkedIn URL</label>
              <input
                v-model="linkedin"
                type="url"
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">Company Website URL</label>
              <input
                v-model="website"
                type="url"
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
          </div>
        </div>

        <!-- About Information -->
        <div>
          <h2 class="text-[#2E4172] text-xl font-semibold mb-6">About Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-gray-700">Job Title<span class="text-red-500">*</span></label>
              <input
                v-model="title"
                type="text"
                required
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">Company<span class="text-red-500">*</span></label>
              <input
                v-model="company"
                type="text"
                required
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">Organization<span class="text-red-500">*</span></label>
              <select
                v-model="organization"
                required
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              >
                <option value="">Select Organization</option>
                <option value="org1">Organization 1</option>
                <option value="org2">Organization 2</option>
              </select>
            </div>
          </div>

          <!-- Address Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="space-y-2">
              <label class="block text-gray-700">Company Address Line 1</label>
              <input
                v-model="addressLine1"
                type="text"
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">Company Address Line 2</label>
              <input
                v-model="addressLine2"
                type="text"
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="space-y-2">
              <label class="block text-gray-700">City</label>
              <input
                v-model="city"
                type="text"
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">State</label>
              <select
                v-model="state"
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              >
                <option value="">Select State</option>
                <option value="IL">Illinois</option>
                <!-- Add other states as needed -->
              </select>
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700">Zip Code</label>
              <input
                v-model="zipCode"
                type="text"
                class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
              />
            </div>
          </div>

          <div class="space-y-2 mt-6">
            <label class="block text-gray-700">Bio</label>
            <textarea
              v-model="bio"
              rows="4"
              class="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
            ></textarea>
          </div>
        </div>

        <!-- Profile Image -->
        <div>
          <h2 class="text-[#2E4172] text-xl font-semibold mb-6">Profile Image</h2>
          <div class="flex items-center gap-4">
            <img
              :src="previewUrl || 'https://placehold.co/100x100?text=👤'"
              alt="Preview"
              class="w-24 h-24 rounded-full object-cover border"
            />
            <label class="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-100 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                @change="handleFileChange"
                class="hidden"
              />
            </label>
          </div>
        </div>

        <div class="flex justify-center pt-6">
          <button
            type="submit"
            class="px-8 py-3 bg-[#2E4172] text-white rounded hover:bg-[#1E2B4A] transition"
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { uploadProfileImage } from '../lib/upload_image'

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const linkedin = ref('')
const website = ref('')
const title = ref('')
const company = ref('')
const organization = ref('')
const addressLine1 = ref('')
const addressLine2 = ref('')
const city = ref('')
const state = ref('')
const zipCode = ref('')
const bio = ref('')
const profilePhoto = ref(null)
const previewUrl = ref('')
const error = ref('')

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  profilePhoto.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const handleSignup = async () => {
  error.value = ''

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: email.value,
    password: 'tempPassword123', // You might want to add a password field or generate a random one
  })

  if (signUpError) {
    error.value = signUpError.message
    return
  }

  const user = signUpData.user
  if (!user) {
    error.value = 'User not returned from Supabase.'
    return
  }

  let photoUrl = ''
  if (profilePhoto.value) {
    try {
      photoUrl = await uploadProfileImage(profilePhoto.value, user.id)
    } catch (e) {
      error.value = 'Photo upload failed.'
      return
    }
  }

  const { error: profileError } = await supabase.from('profiles').insert([{
    id: user.id,
    full_name: `${firstName.value} ${lastName.value}`,
    title: title.value,
    company: company.value,
    organization: organization.value,
    address_line1: addressLine1.value,
    address_line2: addressLine2.value,
    city: city.value,
    state: state.value,
    zip_code: zipCode.value,
    bio: bio.value,
    phone: phone.value,
    email: email.value,
    website: website.value,
    linkedin: linkedin.value,
    profile_photo_url: photoUrl,
    status: 'pending'
  }])

  if (profileError) {
    error.value = profileError.message
  } else {
    router.push('/directory')
  }
}
</script>