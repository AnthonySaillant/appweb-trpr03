<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useBugStore } from '../stores/bugStore'
import type { Bug } from '../types'
import blue_king from '../assets/Blue_King_Laughing.webp'

const props = defineProps<{
  bug: Bug
  canVerify?: boolean
}>()

const bugImage = computed(() =>
  props.bug.image && props.bug.image.trim() !== '' ? props.bug.image : blue_king
)

const bugStore = useBugStore()

async function verifyBug() {
  await bugStore.verifyBug(props.bug)
}
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

    <button
      v-if="canVerify"
      class="btn"
      :class="bug.isVerified ? 'btn-warning' : 'btn-success'"
      @click="verifyBug"
    >
      {{ bug.isVerified ? 'Dévérifier le bug' : 'Vérifier le bug' }}
    </button>
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
.btn-warning {
  background-color: #f0ad4e;
  color: white;
}
.btn-success {
  background-color: #5cb85c;
  color: white;
}
</style>
