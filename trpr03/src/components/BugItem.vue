<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Bug } from '../types'
import blue_king from '../assets/Blue_King_Laughing.webp'

const props = defineProps<{
  bug: Bug
}>()

// Déterminer quelle image afficher (celle du bug ou une image par défaut)  utilisation de chat GPT pour l'image
const bugImage = computed(() =>
  props.bug.image && props.bug.image.trim() !== '' ? props.bug.image : blue_king
)
</script>

<template>
  <div class="text-center">
    <img :src="bugImage" alt="Bug Screenshot" class="bug-image" />

    <h4 class="mt-3">{{ bug.title }}</h4>
    <p><strong>Description:</strong> {{ bug.description }}</p>
    <p><strong>Platform:</strong> {{ bug.platform }}</p>
    <p><strong>Étape de production:</strong> {{ bug.productionStep }}</p>
    <p><strong>Priorité:</strong> {{ bug.priority }}</p>
    <p><strong>Type:</strong> {{ bug.type }}</p>
    <p><strong>User ID:</strong> {{ bug.userId }}</p>
    <p><strong>Vérifié:</strong> {{ bug.isVerified ? 'Oui' : 'Non' }}</p>
  </div>
</template>

<style scoped>
.bug-image {
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
