<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import { useBugStore } from '../stores/bugStore'
import { useProfileStore } from '../stores/profileStore'
import type { Bug } from '../types'
import blue_king from '../assets/Blue_King_Laughing.webp'

const props = defineProps<{
  bug: Bug
  canVerify?: boolean
}>()

const karmaForGoodBugFound = ref(100)
const bugImage = computed(() =>
  props.bug.image && props.bug.image.trim() !== '' ? props.bug.image : blue_king
)

const bugStore = useBugStore()
const profileStore = useProfileStore()

const isLoading = ref(false)

async function verifyBug() {
  await bugStore.verifyBug(props.bug)
}

async function addKarmaToUser() {
  isLoading.value = true
  try {
    const testerId = props.bug.userId
    await profileStore.addKarmaToUser(testerId, karmaForGoodBugFound.value)
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

const emit = defineEmits(['deleteRequest'])

function deleteRequest() {
  emit('deleteRequest', props.bug.id)
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

    <div v-if="canVerify" class="d-flex flex-column align-items-center gap-2">
      <button
        class="btn"
        :class="bug.isVerified ? 'btn-warning' : 'btn-success'"
        @click="verifyBug"
      >
        {{ bug.isVerified ? 'Dévérifier le bug' : 'Vérifier le bug' }}
      </button>

      <button class="btn btn-primary" @click="addKarmaToUser" :disabled="isLoading">
        {{ isLoading ? 'Chargement...' : 'Ajouter karma' }}
      </button>
    </div>

    <div v-else-if="bug.isVerified" class="mt-3">
      <button class="btn btn-danger" @click="deleteRequest">Supprimer le bug</button>
    </div>
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
