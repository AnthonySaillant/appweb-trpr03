<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBugStore } from '../stores/bugStore'
import { BugType } from '../types'
import AddBug from '../components/AddBugForm.vue'
import BugItem from '../components/BugItem.vue'
import background from '../assets/ClashRoyaleBG.png'

const bugStore = useBugStore()
const bugIdInput = ref<number | null>(null)

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: '90%',
  minHeight: '100vh',
  display: 'flex',
  boxSizing: 'border-box',
  textAlign: 'center'
}

onMounted(async () => {
  await bugStore.fetchAllBugs()
})

async function fetchBug() {
  if (bugIdInput.value !== null) {
    await bugStore.fetchBugById(bugIdInput.value)
  }
}

async function handleNewBugSubmit(bug: {
  userId: number
  title: string
  description: string
  productionStep: string
  platform: string
  priority: string
  type: BugType
  image: string
}) {
  await bugStore.addBug(bug)
  await bugStore.fetchAllBugs()
}
</script>

<template>
  <div :style="backgroundStyle">
    <div class="container">
      <div v-if="bugStore.currentBug" class="mb-5">
        <h3>Détails du bug</h3>
        <BugItem :bug="bugStore.currentBug" />
      </div>
      <div v-else-if="bugIdInput !== null">
        <p>Aucun bug trouvé avec l'ID {{ bugIdInput }}</p>
      </div>

      <h2 class="mb-5 mt-5 text-white">Tous les bugs</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="bug in bugStore.allBugs" :key="bug.id">
          <div class="card h-100 p-3">
            <BugItem :bug="bug" />
          </div>
        </div>
      </div>

      <div class="mt-5 mb-5">
        <AddBug @submit-bug="handleNewBugSubmit" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
}
</style>
