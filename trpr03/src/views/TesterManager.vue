<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userService } from '../services/userService'
import type { Tester } from '../types'
import TesterItem from '../components/TesterItem.vue'

const users = ref<Tester[]>([])

onMounted(async () => {
  try {
    const allUsers = await userService.getAllUsers()
    users.value = allUsers.filter((user: any) => !user.isDev)
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
  }
})
</script>

<template>
  <div>
    <h2>Liste des utilisateurs</h2>
    <ul>
      <TesterItem v-for="user in users" :key="user.id" :tester="user" />
    </ul>
  </div>
</template>
