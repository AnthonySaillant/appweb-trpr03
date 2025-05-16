<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBugStore } from '../stores/bugStore'

const bugStore = useBugStore()
const bugIdInput = ref<number | null>(null)

onMounted(async () => {
  await bugStore.fetchAllBugs()
})

async function fetchBug() {
  if (bugIdInput.value !== null) {
    await bugStore.fetchBugById(bugIdInput.value)
  }
}

const newBug = ref({
  userId: 1,
  title: '',
  description: '',
  productionStep: '',
  platform: '',
  priority: 'Low'
})

async function submitBug() {
  console.log('Submitting bug:', newBug.value)
  await bugStore.addBug(newBug.value)
  await bugStore.fetchAllBugs()
  newBug.value = {
    userId: 1,
    title: '',
    description: '',
    productionStep: '',
    platform: '',
    priority: 'Low'
  }
}
</script>

<template>
  <div>
    <h2>All Bugs</h2>
    <div v-for="bug in bugStore.allBugs" :key="bug.id">
      <p>
        <strong>{{ bug.title }}</strong
        >: {{ bug.description }} id: {{ bug.id }}
      </p>
    </div>

    <hr />

    <h2>Search Bug By ID</h2>
    <input type="number" v-model.number="bugIdInput" placeholder="Enter bug ID" />
    <button @click="fetchBug">Fetch Bug</button>

    <div v-if="bugStore.currentBug" class="mt-4">
      <h3>Bug Details</h3>
      <p><strong>Title:</strong> {{ bugStore.currentBug.title }}</p>
      <p><strong>Description:</strong> {{ bugStore.currentBug.description }}</p>
      <p><strong>Platform:</strong> {{ bugStore.currentBug.platform }}</p>
      <p><strong>Priority:</strong> {{ bugStore.currentBug.priority }}</p>
      <p><strong>UserId:</strong> {{ bugStore.currentBug.userId }}</p>
      <p><strong>Is Verified:</strong> {{ bugStore.currentBug.isVerified ? 'Yes' : 'No' }}</p>
    </div>
    <div v-else-if="bugIdInput !== null">
      <p>No bug found with ID {{ bugIdInput }}</p>
    </div>
  </div>
  <h2>Add New Bug</h2>
  <form
    @submit.prevent="submitBug"
    style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px"
  >
    <input v-model="newBug.title" placeholder="Title" required />
    <input v-model="newBug.description" placeholder="Description" required />
    <input v-model="newBug.productionStep" placeholder="Production Step" required />
    <input v-model="newBug.platform" placeholder="Platform" required />
    <select v-model="newBug.priority">
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
    <button type="submit">Add Bug</button>
  </form>
</template>
