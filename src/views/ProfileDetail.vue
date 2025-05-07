<template>
  <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border">
    <div class="flex flex-col md:flex-row items-center gap-6">
      <!-- Profile photo -->
      <img
        :src="profile.profile_photo_url || 'https://placehold.co/150x150?text=👤'"
        alt="Profile Photo"
        class="w-32 h-32 rounded-full object-cover border"
      />

      <!-- Basic info -->
      <div class="text-center md:text-left">
        <h2 class="text-2xl font-bold text-primary">{{ profile.full_name }}</h2>
        <p class="text-gray-600">{{ profile.title }}</p>
        <p class="text-gray-500">{{ profile.institution }}</p>
      </div>
    </div>

    <!-- Meta info -->
    <div class="mt-6 space-y-2 text-sm text-gray-700">
      <p><strong>Department:</strong> {{ profile.department }}</p>
      <p><strong>Research Areas:</strong> {{ profile.research_areas }}</p>
      <p>
        <strong>Email:</strong>
        <a :href="`mailto:${profile.email}`" class="text-blue-600 hover:underline">{{ profile.email }}</a>
      </p>
      <p v-if="profile.phone">
        <strong>Phone:</strong> {{ profile.phone }}
      </p>
      <p v-if="profile.website">
        <strong>Website:</strong>
        <a :href="profile.website" class="text-blue-600 hover:underline" target="_blank">{{ profile.website }}</a>
      </p>
      <p v-if="profile.linkedin">
        <strong>LinkedIn:</strong>
        <a :href="profile.linkedin" class="text-blue-600 hover:underline" target="_blank">{{ profile.linkedin }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()
const profile = ref({})

onMounted(async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (!error) {
    profile.value = data
  }
})
</script>
