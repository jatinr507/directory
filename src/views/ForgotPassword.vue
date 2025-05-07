<template>
    <div class="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow bg-white">
      <h2 class="text-xl font-bold mb-4 text-center text-primary">Reset Your Password</h2>
      <form @submit.prevent="handleReset" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="input"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
      <p v-if="message" class="text-green-600 mt-4 text-center text-sm">{{ message }}</p>
      <p class="mt-6 text-center text-sm">
        <router-link to="/login" class="text-blue-600 hover:underline">
          Back to login
        </router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { supabase } from '../lib/supabase'
  
  const email = ref('')
  const message = ref('')
  
  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value)
    message.value = error
      ? error.message
      : 'Check your inbox for a password reset link.'
  }
  </script>
  
  <style scoped>
  .input {
    @apply w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600;
  }
  </style>
  