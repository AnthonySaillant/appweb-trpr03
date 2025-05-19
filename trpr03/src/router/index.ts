import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useProfileStore } from '../stores/profileStore'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to) => {
  //rajout du async sinon ne marchait pas
  const authStore = useAuthStore()
  const profileStore = useProfileStore()

  authStore.loadPersistedToken()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'Login' }
  }

  if (to.name === 'Login' && authStore.isLoggedIn) {
    return { name: 'Home' }
  }

  if (authStore.isLoggedIn && !profileStore.email) {
    await profileStore.getProfile()
  }

  if (to.meta.requiresDev && !profileStore.isDev) {
    return { name: 'Home' }
  }

  if (to.meta.requiresNonDev && profileStore.isDev) {
    return { name: 'Home' }
  }

  return true
})

export default router
