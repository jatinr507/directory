<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-blue-50/50 flex flex-col items-center justify-center px-6 py-12">
    <div class="w-full max-w-md">
      <!-- Logos -->
      <div class="flex items-center justify-center gap-8 mb-12">
        <img 
          src="https://icsps.illinoisstate.edu/wp-content/uploads/2022/12/ICSPS-Logo-1.png" 
          alt="ICSPS Logo" 
          class="h-12 object-contain"
        />
        <div class="w-px h-12 bg-neutral-200"></div>
        <img 
          src="https://www.iccb.org/iccb/wp-content/uploads/2016/01/iccb-logo.png" 
          alt="ICCB Logo" 
          class="h-12 object-contain"
        />
      </div>

      <!-- Signup Form -->
      <div class="bg-white rounded-2xl shadow-card p-8">
        <h2 class="text-2xl font-semibold text-center mb-8 text-primary">Create Your Profile</h2>
        
        <form @submit.prevent="handleSignup" class="space-y-6">
          <div class="space-y-2">
            <label for="email" class="block text-lg text-neutral-600">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="block text-lg text-neutral-600">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="full_name" class="block text-lg text-neutral-600">Full Name</label>
            <input
              id="full_name"
              v-model="full_name"
              type="text"
              required
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="title" class="block text-lg text-neutral-600">Title</label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="e.g. Professor"
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="institution" class="block text-lg text-neutral-600">Institution</label>
            <input
              id="institution"
              v-model="institution"
              type="text"
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="department" class="block text-lg text-neutral-600">Department</label>
            <input
              id="department"
              v-model="department"
              type="text"
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="research_areas" class="block text-lg text-neutral-600">Research Areas</label>
            <input
              id="research_areas"
              v-model="research_areas"
              type="text"
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="phone" class="block text-lg text-neutral-600">Phone</label>
            <input
              id="phone"
              v-model="phone"
              type="text"
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="website" class="block text-lg text-neutral-600">Website</label>
            <input
              id="website"
              v-model="website"
              type="text"
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label for="linkedin" class="block text-lg text-neutral-600">LinkedIn</label>
            <input
              id="linkedin"
              v-model="linkedin"
              type="text"
              class="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-lg text-neutral-600">Profile Photo</label>
            <div class="flex items-center gap-4">
              <img
                :src="previewUrl || 'https://placehold.co/100x100?text=👤'"
                alt="Preview"
                class="w-24 h-24 rounded-full object-cover border border-neutral-200"
              />
              <input
                type="file"
                accept="image/*"
                @change="handleFileChange"
                class="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-[#2E4172] hover:bg-[#1E2B4A] text-white text-lg font-medium py-3 rounded-lg transition"
          >
            Create Profile
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-neutral-200">
          <router-link 
            to="/login" 
            class="block text-center text-secondary hover:text-secondary-dark font-medium transition"
          >
            Back to Login
          </router-link>
        </div>
      </div>

      <!-- Info Text -->
      <p class="mt-8 text-center text-sm text-neutral-600 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-neutral-200">
        All information provided in your profile is public to all directory users, we recommend against using personal emails and phone numbers.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { uploadProfileImage } from '../lib/upload_image'

const email = ref('')
const password = ref('')
const full_name = ref('')
const title = ref('')
const institution = ref('')
const department = ref('')
const research_areas = ref('')
const phone = ref('')
const website = ref('')
const linkedin = ref('')
const profilePhoto = ref(null)
const previewUrl = ref('')
const error = ref('')
const router = useRouter()

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
    password: password.value,
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
    full_name: full_name.value,
    title: title.value,
    institution: institution.value,
    department: department.value,
    research_areas: research_areas.value,
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