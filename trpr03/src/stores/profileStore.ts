import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useProfileStore = defineStore('profileStoreId', () => {
  const email = ref('')
  const name = ref('')
  const password = ref('') //enlever potentiellement
  const onError = ref(false)

  function _initializeProfile(profile: { email: string; name: string; password: string }) {
    email.value = profile.email
    name.value = profile.name
    password.value = profile.password
    onError.value = false
  }

  async function getProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId // Assuming getUserId is a computed or a ref inside authStore
      const profile = await userService.getUserById(userId)
      _initializeProfile(profile)
    } catch (error) {
      onError.value = true
    }
  }

  async function updatePassword(newPassword: string) {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId
      await userService.updateUserPassword(userId, newPassword)
      password.value = newPassword
    } catch (error) {
      onError.value = true
    }
  }

  return {
    email,
    name,
    password,
    onError,
    getProfile,
    updatePassword
  }
})
