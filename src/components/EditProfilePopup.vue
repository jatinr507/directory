<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="close"
    ></div>

    <!-- Popup -->
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="relative bg-[#F8F9FC] w-full max-w-lg rounded-lg shadow-xl">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <div class="flex items-center gap-2 text-[#2E4172] text-xl font-semibold">
            <span class="material-icons">person</span>
            Edit Profile
          </div>
          <button 
            @click="close"
            class="text-gray-500 hover:text-gray-700"
          >
            <span class="material-icons">expand_more</span>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Contact Information -->
          <div>
            <h3 class="text-[#2E4172] text-lg font-semibold mb-4">Contact Information</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 mb-1">
                  First Name<span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">
                  Last Name<span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">
                  Work Email<span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">Work Phone Number</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  placeholder="Enter"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  v-model="form.linkedin"
                  type="url"
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  placeholder="Enter"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">Company Website URL</label>
                <input
                  v-model="form.website"
                  type="url"
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                  placeholder="Enter"
                />
              </div>
            </div>
          </div>

          <!-- About Information -->
          <div>
            <h3 class="text-[#2E4172] text-lg font-semibold mb-4">About Information</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 mb-1">
                  Job Title<span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">
                  Company<span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.company"
                  type="text"
                  required
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">
                  Organization<span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.organization"
                  required
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                >
                  <option value="">Select Organization</option>
                  <option value="Community College">Community College</option>
                  <option value="University">University</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-700 mb-1">Company Address Line 1</label>
                <input
                  v-model="form.addressLine1"
                  type="text"
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">Company Address Line 2</label>
                <input
                  v-model="form.addressLine2"
                  type="text"
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">City</label>
                <input
                  v-model="form.city"
                  type="text"
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1">State</label>
                <select
                  v-model="form.state"
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                >
                  <option value="">Select State</option>
                  <option value="IL">Illinois</option>
                  <option value="MI">Michigan</option>
                  <option value="WI">Wisconsin</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-700 mb-1">Zip Code</label>
                <input
                  v-model="form.zipCode"
                  type="text"
                  class="w-full p-2 bg-white border-b border-gray-300 focus:outline-none focus:border-[#2E4172]"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end pt-4">
            <button
              type="submit"
              class="px-6 py-2 bg-[#2E4172] text-white rounded hover:bg-[#1E2B4A] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedin: '',
  website: '',
  title: '',
  company: '',
  organization: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: ''
})

const close = () => {
  emit('close')
}

const handleSubmit = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: `${form.value.firstName} ${form.value.lastName}`,
      email: form.value.email,
      phone: form.value.phone,
      linkedin: form.value.linkedin,
      website: form.value.website,
      title: form.value.title,
      company: form.value.company,
      organization: form.value.organization,
      address_line1: form.value.addressLine1,
      address_line2: form.value.addressLine2,
      city: form.value.city,
      state: form.value.state,
      zip_code: form.value.zipCode
    })
    .eq('id', user.id)

  if (!error) {
    emit('save')
    close()
  }
}

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      const names = profile.full_name.split(' ')
      form.value = {
        firstName: names[0],
        lastName: names.slice(1).join(' '),
        email: profile.email,
        phone: profile.phone || '',
        linkedin: profile.linkedin || '',
        website: profile.website || '',
        title: profile.title || '',
        company: profile.company || '',
        organization: profile.organization || '',
        addressLine1: profile.address_line1 || '',
        addressLine2: profile.address_line2 || '',
        city: profile.city || '',
        state: profile.state || '',
        zipCode: profile.zip_code || ''
      }
    }
  }
})
</script>