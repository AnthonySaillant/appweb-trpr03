import { defineStore } from 'pinia'
import { ref } from 'vue'
import { bugService } from '../services/bugService'
import { BugType, type Bug } from '../types'
import { useAuthStore } from './authStore'

export const useBugStore = defineStore('bugStoreId', () => {
  const allBugs = ref<Bug[]>([])
  const currentBug = ref<Bug | null>(null)
  const categories = ref<string[]>([...Object.values(BugType)])

  async function fetchAllBugs() {
    try {
      allBugs.value = await bugService.getAllBugs()
    } catch (error) {
      console.error('Erreur lors du chargement des bugs:', error)
    }
  }
  //chat GPT pour le trim
  function addCategory(category: string) {
    const trimmed = category.trim()
    if (!categories.value.includes(trimmed)) {
      categories.value.push(trimmed)
    }
  }

  async function fetchBugById(id: number) {
    try {
      currentBug.value = await bugService.getBugById(id)
    } catch (error) {
      console.error('Erreur lors de la récupération du bug:', error)
      currentBug.value = null
    }
  }

  async function addBug(bug: {
    userId: number
    title: string
    description: string
    productionStep: string
    platform: string
    priority: string
  }) {
    try {
      const authStore = useAuthStore()
      const userId = Number(authStore.getUserId)

      const bugWithUserId = {
        ...bug,
        userId
      }

      const newBug = await bugService.addBug(bugWithUserId)
      allBugs.value.push(newBug)
    } catch (error) {
      console.error('Erreur lors de l’ajout du bug:', error)
    }
  }

  async function verifyBug(bug: Bug) {
    try {
      const newVerify = !bug.isVerified

      const updatedBug = await bugService.verifyBug(bug.id, newVerify)

      const index = allBugs.value.findIndex((b) => b.id === bug.id) //le find index par chat GPT
      if (index !== -1) {
        allBugs.value[index] = updatedBug
      }

      if (currentBug.value?.id === bug.id) {
        currentBug.value = updatedBug
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du bug:', error)
    }
  }

  async function saveNewPriority(bug: Bug) {
    try {
      const updatedBug = await bugService.saveNewPriority(bug)

      const index = allBugs.value.findIndex((b) => b.id === bug.id)
      if (index !== -1) {
        allBugs.value[index] = updatedBug
      }

      if (currentBug.value?.id === bug.id) {
        currentBug.value = updatedBug
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la priorité:', error)
    }
  }

  async function deleteBug(id: number) {
    try {
      await bugService.deleteBug(id)

      allBugs.value = allBugs.value.filter((bug) => bug.id !== id) //chat GPT supprime le bug localement
      if (currentBug.value?.id === id) {
        currentBug.value = null
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du bug:', error)
    }
  }

  return {
    currentBug,
    allBugs,
    categories,
    fetchAllBugs,
    fetchBugById,
    addBug,
    verifyBug,
    deleteBug,
    addCategory,
    saveNewPriority
  }
})
