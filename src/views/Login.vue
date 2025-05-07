<template>
  <div class="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow bg-white">
    <h2 class="text-2xl font-bold mb-6 text-center text-primary">Login to ICSPS Network</h2>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="input"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input"
        required
      />

      <p class="text-right text-sm">
        <router-link to="/forgot-password" class="text-blue-600 hover:underline">
          Forgot Password?
        </router-link>
      </p>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Sign In
      </button>
    </form>

    <p v-if="error" class="text-red-600 text-sm mt-4 text-center">{{ error }}</p>
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

<style scoped>
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600;
}
</style>
