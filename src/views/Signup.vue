<template>
  <div class="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
    <h2 class="text-2xl font-semibold mb-4">Create Your Profile</h2>

    <form @submit.prevent="handleSignup" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Password" class="input" required />

      <!-- 👤 Profile Photo Preview -->
      <div class="flex justify-center mb-2">
        <img
          :src="previewUrl || 'https://placehold.co/100x100?text=👤'"
          alt="Preview"
          class="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <!-- 📁 Profile Photo Upload -->
      <input
        type="file"
        accept="image/*"
        @change="handleFileChange"
        class="input"
      />

      <input v-model="full_name" type="text" placeholder="Full Name" class="input" required />
      <input v-model="title" type="text" placeholder="Title (e.g. Professor)" class="input" />
      <input v-model="institution" type="text" placeholder="Institution" class="input" />
      <input v-model="department" type="text" placeholder="Department" class="input" />
      <input v-model="research_areas" type="text" placeholder="Research Areas" class="input" />
      <input v-model="phone" type="text" placeholder="Phone" class="input" />
      <input v-model="website" type="text" placeholder="Website" class="input" />
      <input v-model="linkedin" type="text" placeholder="LinkedIn" class="input" />

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>

    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
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

<style scoped>
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded;
}
</style>
