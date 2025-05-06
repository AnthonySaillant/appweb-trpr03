import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/authService'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  sub: string
  exp: number
}

export const useAuthStore = defineStore('authStoreId', () => {
  const token = ref('')
  const authServiceError = ref('')

  const isLoggedIn = computed(() => !!token.value)

  const getUserId = computed(() => {
    if (!token.value) return ''
    const payload: DecodedToken = jwtDecode(token.value)
    return payload.sub
  })

  const isTokenExpired = computed(() => {
    if (!token.value) return true
    const payload: DecodedToken = jwtDecode(token.value)
    const now = new Date().getTime() / 1000
    return payload.exp < now
  })

  function clearError() {
    authServiceError.value = ''
  }

  function logout() {
    token.value = ''
    localStorage.removeItem('token')
  }

  function loadPersistedToken() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) token.value = storedToken
  }

  async function login(credential: { email: string; password: string }) {
    try {
      clearError()
      const newToken = await authService.getToken(credential)
      if (newToken) {
        token.value = newToken
        localStorage.setItem('token', token.value)
      }
    } catch (error: any) {
      const rawMessage = error.message || 'Unknown error'
      authServiceError.value = translateErrorMessage(rawMessage)
    }
  }

  function refreshToken() {
    logout() // Simplified action for token refresh: logs out the user
  }

  return {
    token,
    authServiceError,
    isLoggedIn,
    getUserId,
    isTokenExpired,
    clearError,
    logout,
    loadPersistedToken,
    login,
    refreshToken
  }
})
function translateErrorMessage(rawMessage: string): string {
  //utilisation de chat GPT pour la traduction d'erreur serveur
  switch (rawMessage) {
    case 'Email format is invalid':
      return "Le format d\'email est invalide"
    case 'Password is too short':
      return 'Le mot de passe est trop court'
    case 'Incorrect password':
      return 'Le mot de passe est incorrect'
    default:
      return 'Une erreur est survenu'
  }
}
