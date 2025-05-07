<template>
  <div class="max-w-6xl mx-auto mt-10 p-4">
    <h2 class="text-2xl font-semibold mb-6">Approvals</h2>

    <div class="mb-4 flex gap-4">
      <button
        :class="[activeTab === 'pending' ? activeBtnClass : inactiveBtnClass, 'px-4 py-2 rounded']"
        @click="activeTab = 'pending'"
      >
        Pending ({{ pendingProfiles.length }})
      </button>
      <button
        :class="[activeTab === 'rejected' ? activeBtnClass : inactiveBtnClass, 'px-4 py-2 rounded']"
        @click="activeTab = 'rejected'"
      >
        Rejected ({{ rejectedProfiles.length }})
      </button>
    </div>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by name, title, or email"
      class="mb-6 w-full p-2 border border-gray-300 rounded"
    />

    <div v-if="loading" class="text-center text-gray-500">Loading...</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="profile in filteredProfiles"
        :key="profile.id"
        class="bg-white border rounded-lg p-4 shadow hover:shadow-md transition relative"
      >
        <img
          :src="profile.profile_photo_url || 'https://placehold.co/100x100?text=👤'"
          alt="Profile"
          class="w-20 h-20 rounded-full object-cover mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold text-center">{{ profile.full_name }}</h3>
        <p class="text-sm text-center text-gray-600">{{ profile.title }}, {{ profile.institution }}</p>
        <p class="text-sm text-center text-gray-500">
          <a :href="'mailto:' + profile.email" class="text-blue-600 hover:underline">{{ profile.email }}</a>
        </p>

        <div class="mt-4 flex justify-center gap-2">
          <button
            v-if="activeTab === 'pending' || activeTab === 'rejected'"
            @click="updateStatus(profile.id, 'approved')"
            class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Approve
          </button>
          <button
            v-if="activeTab === 'pending'"
            @click="updateStatus(profile.id, 'rejected')"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Reject
          </button>
          <router-link
            :to="`/edit/${profile.id}`"
            class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const loading = ref(true)
const pendingProfiles = ref([])
const rejectedProfiles = ref([])
const activeTab = ref('pending')
const searchQuery = ref('')
const router = useRouter()

const activeBtnClass = 'bg-blue-600 text-white'
const inactiveBtnClass = 'bg-gray-200 text-gray-700'

const displayedProfiles = computed(() => {
  return activeTab.value === 'pending' ? pendingProfiles.value : rejectedProfiles.value
})

const filteredProfiles = computed(() => {
  return displayedProfiles.value.filter((p) => {
    const q = searchQuery.value.toLowerCase()
    return (
      p.full_name?.toLowerCase().includes(q) ||
      p.title?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q)
    )
  })
})

const fetchProfiles = async () => {
  loading.value = true
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error || !session?.user) {
    router.push('/login')
    return
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single()

  if (!profile?.is_admin) {
    router.push('/directory')
    return
  }

  const { data: pending } = await supabase
    .from('profiles')
    .select('*')
    .eq('status', 'pending')
  pendingProfiles.value = (pending || []).sort((a, b) => a.full_name.localeCompare(b.full_name))

  const { data: rejected } = await supabase
    .from('profiles')
    .select('*')
    .eq('status', 'rejected')
  rejectedProfiles.value = (rejected || []).sort((a, b) => a.full_name.localeCompare(b.full_name))

  loading.value = false
}

const updateStatus = async (id, status) => {
  const { error } = await supabase
    .from('profiles')
    .update({ status })
    .eq('id', id)

  if (!error) {
    await fetchProfiles()
  }
}

onMounted(fetchProfiles)
</script>
