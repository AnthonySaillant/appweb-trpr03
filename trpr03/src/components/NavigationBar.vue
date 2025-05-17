<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useProfileStore } from '../stores/profileStore'
import { useRouter } from 'vue-router'
import { is } from '@vee-validate/rules'

const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const isDev = computed(() => profileStore.isDev)

function logout() {
  authStore.logout()
  router.push({
    name: 'Login'
  })
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-nav mr-auto">
        <!-- Le ":class={...}" veut dire si la route est égal à 'Home' alors "active" de bootstrap sera ajoutée à l'attribut "class". Ce qui aura comme effet de mettre en évidence l'option du menu. -->
        <RouterLink
          class="nav-link text-warning"
          :class="{ active: $route.name == 'Home' }"
          :to="{ name: 'Home' }"
        >
          Accueil
        </RouterLink>
        <RouterLink
          class="nav-link text-warning"
          :class="{ active: $route.name == 'About' }"
          :to="{ name: 'About' }"
        >
          À propos
        </RouterLink>

        <!-- La page Profile n'est accessible que si l'utilisateur est connecté (v-if). Voir la propriété calculée isLoggedIn() qui retourne la valeur de la propriété isLoggedIn du store. -->
        <RouterLink
          class="nav-link text-warning"
          :class="{ active: $route.name == 'Profile' }"
          v-if="isLoggedIn"
          :to="{ name: 'Profile' }"
        >
          Profile
        </RouterLink>

        <RouterLink
          class="nav-link text-warning"
          :class="{ active: $route.name == 'TesterManager' }"
          v-if="isLoggedIn && isDev"
          :to="{ name: 'TesterManager' }"
        >
          Gestion des testeurs
        </RouterLink>

        <RouterLink
          class="nav-link text-warning"
          :class="{ active: $route.name == 'DevBugList' }"
          v-if="isLoggedIn && isDev"
          :to="{ name: 'DevBugList' }"
        >
          Gestion des bugs
        </RouterLink>

        <RouterLink
          v-else
          class="nav-link text-warning"
          :class="{ active: $route.name == 'TesterBugList' }"
          v-if="isLoggedIn && !isDev"
          :to="{ name: 'TesterBugList' }"
        >
          bugs
        </RouterLink>
      </div>
      <div class="d-flex">
        <div class="navbar-nav ml-auto">
          <a class="nav-link text-warning" @click="logout" v-if="isLoggedIn" href="#">
            Se déconnecter
          </a>
          <RouterLink
            v-else
            class="nav-link text-warning"
            :class="{ active: $route.name == 'Login' }"
            :to="{ name: 'Login' }"
          >
            Connexion
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
<style>
.nav-link.active {
  color: white !important;
}
.nav-link:hover {
  color: #ffffff !important;
}
</style>
