<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useBugStore } from '../stores/bugStore'
import { useAuthStore } from '../stores/authStore'
import { BugType } from '../types'
import AddBug from '../components/AddBugForm.vue'
import BugItem from '../components/BugItem.vue'
import background from '../assets/ClashRoyaleBG.png'

const bugStore = useBugStore()
const authStore = useAuthStore()

const isDeleteModalVisible = ref(false)
const bugIdToDelete = ref<number | null>(null)

function openDeleteModal(id: number) {
  bugIdToDelete.value = id
  isDeleteModalVisible.value = true
}

function closeDeleteModal() {
  bugIdToDelete.value = null
  isDeleteModalVisible.value = false
}

async function confirmDeleteBug() {
  if (bugIdToDelete.value !== null) {
    try {
      await bugStore.deleteBug(bugIdToDelete.value)
      await bugStore.fetchAllBugs()
    } catch (error) {
      console.error('Erreur lors de la suppression du bug', error)
    }
    closeDeleteModal()
  }
}

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

const userBugs = computed(() => {
  const userId = Number(authStore.getUserId)
  return bugStore.allBugs.filter((bug) => bug.userId === userId)
})

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
      <h2 class="mb-5 mt-5 text-white">Mes bugs</h2>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="bug in userBugs" :key="bug.id">
          <div class="card h-100 p-3">
            <BugItem :bug="bug" @deleteRequest="openDeleteModal" />
          </div>
        </div>
      </div>

      <div class="mt-5 mb-5">
        <AddBug @submit-bug="handleNewBugSubmit" />
      </div>
    </div>

    <div v-if="isDeleteModalVisible">
      <div
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        style="display: block; top: 80%; left: 50%; transform: translate(-50%, -50%)"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title">Confirmer la suppression</h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                aria-label="Close"
                @click="closeDeleteModal"
              ></button>
            </div>
            <div class="modal-body">
              <p>Es-tu certain de vouloir supprimer ce bug ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeDeleteModal">
                Annuler
              </button>
              <button type="button" class="btn btn-danger" @click="confirmDeleteBug">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
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
