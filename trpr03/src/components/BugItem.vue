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
const isChangingPriority = ref(false)
const bugImage = computed(() =>
  props.bug.image && props.bug.image.trim() !== '' ? props.bug.image : blue_king
)

const bugStore = useBugStore()
const profileStore = useProfileStore()
const isFeedbackFinished = ref(false)

const isLoading = ref(false)

async function verifyBug() {
  await bugStore.verifyBug(props.bug)
}

async function addKarmaToUser() {
  isLoading.value = true
  try {
    const testerId = props.bug.userId
    await profileStore.modifyKarma(testerId, karmaForGoodBugFound.value)
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

async function addKarmaToDevs() {
  isFeedbackFinished.value = true
  isLoading.value = true
  try {
    await profileStore.modifyDevsKarma(karmaForGoodBugFound.value)
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

const closeFeedback = () => {
  isFeedbackFinished.value = true
  removeKarmaToDevs()
}

const updatePriority = () => {
  isChangingPriority.value = true
}

async function removeKarmaToDevs() {
  isLoading.value = true
  try {
    await profileStore.modifyDevsKarma(-karmaForGoodBugFound.value)
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

async function saveNewPriority() {
  isChangingPriority.value = false
  await bugStore.saveNewPriority(props.bug)
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

    <div v-if="!canVerify && !isChangingPriority">
      <button class="btn btn-success mt-2" @click="updatePriority">Changer la priorité</button>
    </div>

    <div v-if="isChangingPriority" class="d-flex flex-column align-items-center gap-2 mt-3">
      <label for="new-priority">Choisir une nouvelle priorité :</label>
      <select id="new-priority" v-model="props.bug.priority" class="form-select w-auto mb-5">
        <option value="Basse">Basse</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Haute">Haute</option>
      </select>
      <button class="btn btn-primary mt-5" @click="saveNewPriority">Sauvegarder</button>
    </div>
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

    <div v-if="bug.isVerified && !isFeedbackFinished && !canVerify" class="mt-3">
      <p>Êtes-vous satisfait du temps que cela a pris avant que le bug soit corrigé?</p>

      <button class="btn btn-primary mt-2 mb-3" @click="addKarmaToDevs" :disabled="isLoading">
        Oui (+100 karma au dev)
      </button>
      <button class="btn btn-danger" @click="closeFeedback">Non (-100 karma au dev)</button>
    </div>

    <div v-else-if="bug.isVerified && isFeedbackFinished" class="mt-3">
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
