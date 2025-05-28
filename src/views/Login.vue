<template>
  <div class="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-12">
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

      <!-- Login Form -->
      <div class="bg-white rounded-2xl shadow-card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
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

          <button
            type="submit"
            class="w-full bg-[#2E4172] hover:bg-[#1E2B4A] text-white text-lg font-medium py-3 rounded-lg transition"
          >
            Login
          </button>

          <router-link 
            to="/forgot-password" 
            class="block text-center text-secondary hover:text-secondary-dark font-medium transition"
          >
            Forgot Password
          </router-link>
        </form>

        <div class="mt-6 pt-6 border-t border-neutral-200">
          <router-link 
            to="/signup" 
            class="block text-center text-secondary hover:text-secondary-dark font-medium transition"
          >
            Create Profile
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

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (signInError) {
    error.value = signInError.message
  } else {
    router.push('/directory')
  }
}
</script>