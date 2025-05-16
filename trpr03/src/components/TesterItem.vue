<script setup lang="ts">
import { defineProps } from 'vue'
import type { Tester } from '../types'
import { userService } from '../services/userService'

const props = defineProps<{ tester: Tester }>()

const deleteTester = async (id: number) => {
  try {
    await userService.deleteUser(id)
    alert('Utilisateur supprimer avec succès')
  } catch (error) {
    alert("Échec lors de la suppresion de l'utilisateur")
  }
}
</script>

<template>
  <div class="text-center">
    <h4>{{ tester.name }}</h4>
    <p><strong>Email:</strong> {{ tester.email }}</p>
    <p><strong>ID:</strong> {{ tester.id }}</p>
  </div>
  <button class="btn btn-danger" type="button" @click="deleteTester(tester.id)">
    <i class="bi bi-trash">supprimer le testeur</i>
  </button>
</template>

<style scoped></style>
