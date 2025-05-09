<script setup lang="ts">
import { defineProps } from 'vue'
import type { Tester } from '../types'

const props = defineProps<{ tester: Tester }>()
</script>

<template>
  <div class="card">
    <h4>{{ tester.name }}</h4>
    <p><strong>Email:</strong> {{ tester.email }}</p>
    <p><strong>ID:</strong> {{ tester.id }}</p>
    <p>
      <span :class="tester.isDev ? 'dev' : 'user'">
        {{ tester.isDev ? 'Développeur' : 'Utilisateur' }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.8rem;
  margin: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 30%;
  max-width: 200px;
  transition: transform 0.2s ease;
  text-align: center;
}

h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 0.85rem;
  margin: 0.25rem 0;
  color: #555;
}

.dev {
  color: #b30000;
  font-weight: bold;
}

.user {
  color: #007700;
  font-weight: bold;
}
</style>
