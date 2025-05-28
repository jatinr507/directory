<template>
  <div class="min-h-screen bg-neutral-50 font-sans">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link
            v-if="isLoggedIn"
            to="/directory"
            class="text-xl font-bold text-primary hover:text-primary-light transition"
          >ICSPS Network</router-link>
          <h1 v-else class="text-xl font-bold text-primary">ICSPS Network</h1>

          <nav class="flex items-center gap-8" v-if="!checkingRole">
            <!-- Not logged in -->
            <template v-if="!isLoggedIn">
              <router-link 
                to="/signup" 
                class="text-secondary hover:text-secondary-dark transition font-medium"
                :class="{ 'text-secondary-dark': $route.path === '/signup' }"
              >Sign Up</router-link>
              <router-link 
                to="/login" 
                class="text-secondary hover:text-secondary-dark transition font-medium"
                :class="{ 'text-secondary-dark': $route.path === '/login' }"
              >Login</router-link>
            </template>

            <!-- Logged in -->
            <template v-else>
              <router-link 
                to="/directory" 
                class="text-secondary hover:text-secondary-dark transition font-medium"
                :class="{ 'text-secondary-dark': $route.path === '/directory' }"
              >Directory</router-link>
              <router-link 
                v-if="isAdmin" 
                to="/admin" 
                class="text-secondary hover:text-secondary-dark transition font-medium"
                :class="{ 'text-secondary-dark': $route.path === '/admin' }"
              >Approvals</router-link>
              <router-link 
                to="/profile" 
                class="text-secondary hover:text-secondary-dark transition font-medium"
                :class="{ 'text-secondary-dark': $route.path === '/profile' }"
              >My Profile</router-link>
              <button 
                @click="signOut" 
                class="text-red-600 hover:text-red-700 transition font-medium"
              >Sign Out</button>
            </template>
          </nav>
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