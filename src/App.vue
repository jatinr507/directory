<template>
  <div class="min-h-screen bg-neutral-50 font-sans">
    <!-- Header -->
    <header class="bg-white border-b border-red-600">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logos -->
          <div class="flex items-center gap-4">
            <img 
              src="https://icsps.illinoisstate.edu/wp-content/uploads/2022/12/ICSPS-Logo-1.png" 
              alt="ICSPS Logo" 
              class="h-8 object-contain"
            />
            <div class="w-px h-8 bg-neutral-200"></div>
            <img 
              src="https://www.iccb.org/iccb/wp-content/uploads/2016/01/iccb-logo.png" 
              alt="ICCB Logo" 
              class="h-8 object-contain"
            />
          </div>

          <!-- Logout Button -->
          <button 
            v-if="isLoggedIn"
            @click="signOut" 
            class="flex items-center gap-2 px-4 py-2 text-[#2E4172] hover:bg-gray-50 rounded border border-[#2E4172] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from './lib/supabase'

const isAdmin = ref(false)
const isLoggedIn = ref(false)
const checkingRole = ref(true)
const router = useRouter()

const checkAuthState = async () => {
  checkingRole.value = true

  const { data: { user } } = await supabase.auth.getUser()
  console.log('🧪 Logged in as:', user?.id)
  isLoggedIn.value = !!user

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    isAdmin.value = profile?.is_admin === true
  } else {
    isAdmin.value = false
  }

  checkingRole.value = false
}

const signOut = async () => {
  await supabase.auth.signOut()
  isLoggedIn.value = false
  isAdmin.value = false
  router.push('/login')
}

let authListener = null

onMounted(() => {
  checkAuthState()
  authListener = supabase.auth.onAuthStateChange(() => {
    checkAuthState()
  })
})

onBeforeUnmount(() => {
  authListener?.data?.unsubscribe()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>