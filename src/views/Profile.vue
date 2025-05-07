<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow">
    <h2 class="text-2xl font-semibold mb-6 text-center">
      {{ route.params.id ? `Editing ${profile.full_name || 'User'}'s Profile` : 'My Profile' }}
    </h2>

    <div v-if="loading">Loading profile...</div>
    <div v-else>
      <p v-if="route.params.id" class="text-sm text-yellow-600 mb-4 text-center">
        You are editing another user's profile.
      </p>

      <p v-if="formattedUpdatedAt" class="text-right text-sm text-gray-500 mb-2">
        Last updated: {{ formattedUpdatedAt }}
      </p>

      <!-- Profile Photo Upload -->
      <div class="mb-6 text-center">
        <img
          :src="photoPreview || 'https://placehold.co/100x100?text=👤'"
          alt="Profile photo"
          class="w-24 h-24 mx-auto rounded-full object-cover mb-2"
        />
        <input type="file" accept="image/*" @change="handlePhotoChange" class="mt-2" />
      </div>

      <p v-if="message" class="text-green-600 mb-4 text-center">{{ message }}</p>

      <!-- Editable Form -->
      <form @submit.prevent="saveProfile" class="space-y-4">
        <input v-model="profile.full_name" type="text" placeholder="Full Name" class="input" />
        <input v-model="profile.title" type="text" placeholder="Title" class="input" />
        <input v-model="profile.institution" type="text" placeholder="Institution" class="input" />
        <input v-model="profile.department" type="text" placeholder="Department" class="input" />
        <input v-model="profile.research_areas" type="text" placeholder="Research Areas" class="input" />
        <input v-model="profile.phone" type="text" placeholder="Phone" class="input" />
        <input v-model="profile.email" type="email" placeholder="Email" class="input bg-gray-100" readonly />
        <input v-model="profile.website" type="text" placeholder="Website" class="input" />
        <input v-model="profile.linkedin" type="text" placeholder="LinkedIn" class="input" />

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          Save Profile
        </button>
      </form>

      <!-- Change Password Section -->
      <div class="mt-10 border-t pt-6" v-if="!route.params.id">
        <h3 class="text-lg font-semibold mb-2">Change Password</h3>
        <form @submit.prevent="handlePasswordChange" class="space-y-4 max-w-sm">
          <input
            v-model="newPassword"
            type="password"
            placeholder="New Password"
            class="input"
            required
          />
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
            Update Password
          </button>
          <p v-if="passwordMessage" class="text-green-600 text-sm">{{ passwordMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { uploadProfileImage } from '../lib/upload_image'

const profile = ref({})
const loading = ref(true)
const newPhoto = ref(null)
const photoPreview = ref('')
const message = ref('')
const newPassword = ref('')
const passwordMessage = ref('')
const formattedUpdatedAt = ref('')
const route = useRoute()
const router = useRouter()


const loadProfile = async () => {
  let targetUserId = route.params.id || null

  if (!targetUserId) {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      router.push('/login')  // ✅ Redirects unauthorized users
      return
    }
    targetUserId = user.id
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', targetUserId)
    .single()

  if (!error && data) {
    profile.value = data
    photoPreview.value = data.profile_photo_url || ''
    if (data.updated_at) {
      const d = new Date(data.updated_at)
      formattedUpdatedAt.value = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(d)
    }
  }

  loading.value = false
}


const handlePhotoChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  newPhoto.value = file
  photoPreview.value = URL.createObjectURL(file)
}

const saveProfile = async () => {
  let targetUserId = route.params.id

  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser()
    targetUserId = user.id
  }

  let photoUrl = profile.value.profile_photo_url

  if (newPhoto.value) {
    try {
      photoUrl = await uploadProfileImage(newPhoto.value, targetUserId)
    } catch (e) {
      message.value = 'Photo upload failed.'
      return
    }
  }

  const updates = {
    ...profile.value,
    profile_photo_url: photoUrl
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', targetUserId)

  if (!error) {
    message.value = 'Profile updated successfully.'
    profile.value.profile_photo_url = photoUrl
    newPhoto.value = null
    formattedUpdatedAt.value = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date())
  } else {
    message.value = 'Profile update failed.'
  }
}

const handlePasswordChange = async () => {
  const { error } = await supabase.auth.updateUser({ password: newPassword.value })
  passwordMessage.value = error ? error.message : 'Password updated successfully.'
}

onMounted(loadProfile)
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600;
}
</style>
