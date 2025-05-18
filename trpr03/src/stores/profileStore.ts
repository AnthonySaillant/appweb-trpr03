import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useProfileStore = defineStore('profileStoreId', () => {
  const email = ref('')
  const name = ref('')
  const password = ref('') //enlever potentiellement
  const onError = ref(false)
  const isDev = ref(false)
  const karma = ref(0)

  function _initializeProfile(profile: {
    email: string
    name: string
    karma: number
    password: string
    isDev: boolean
  }) {
    email.value = profile.email
    name.value = profile.name
    password.value = profile.password
    isDev.value = profile.isDev
    onError.value = false
    karma.value = Number(profile.karma) || 0
  }

  async function getProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId
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

  async function addKarmaToUser(userId: number, karmaToAdd: number) {
    try {
      onError.value = false
      const userProfile = await userService.getUserById(userId)
      const currentKarma = Number(userProfile.karma) || 0

      const newKarma = currentKarma + karmaToAdd
      await userService.addKarmaToUser(userId, newKarma)

      const authStore = useAuthStore()
      karma.value = newKarma
    } catch (error) {
      onError.value = true
    }
  }

  return {
    email,
    name,
    password,
    karma,
    onError,
    getProfile,
    updatePassword,
    addKarmaToUser,
    isDev
  }
})
