import { defineStore } from 'pinia'
import { ref } from 'vue'
import { bugService } from '../services/bugService'
import type { Bug } from '../types'
import { useAuthStore } from './authStore'
import { userService } from '../services/userService'

export const useBugStore = defineStore('bugStoreId', () => {
  const allBugs = ref<Bug[]>([])
  const currentBug = ref<Bug | null>(null)

  async function fetchAllBugs() {
    try {
      allBugs.value = await bugService.getAllBugs()
    } catch (error) {
      console.error('Failed to fetch bugs:', error)
    }
  }

  async function fetchBugById(id: number) {
    try {
      currentBug.value = await bugService.getBugById(id)
    } catch (error) {
      console.error('Failed to fetch bug by id:', error)
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
      console.error('Failed to add bug:', error)
    }
  }

  return {
    currentBug,
    allBugs,
    fetchAllBugs,
    fetchBugById,
    addBug
  }
})
