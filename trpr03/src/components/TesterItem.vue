<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Tester } from '../types'

const props = defineProps<{
  tester: Tester
}>()

const emit = defineEmits<{
  (event: 'deleteRequest'): void
}>()

const deleteRequest = () => {
  emit('deleteRequest')
}
</script>

<template>
  <div class="text-center">
    <h4>{{ tester.name }}</h4>
    <p><strong>Email:</strong> {{ tester.email }}</p>
    <p><strong>ID:</strong> {{ tester.id }}</p>
  </div>
  <div class="d-flex justify-content-center mt-4">
    <button class="btn btn-danger" type="button" @click="deleteRequest">
      <i>supprimer le testeur</i>
    </button>
  </div>
</template>

<style scoped></style>
