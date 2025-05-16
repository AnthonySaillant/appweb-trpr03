import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

async function getBugById(bugId: any) {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/bugs/${bugId}`
    )
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
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
    const response = await axiosAuth.post(`http://127.0.0.1:3000/bugs`, bug)
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function getAllBugs() {
  try {
    const response = await axiosAuth.get('http://127.0.0.1:3000/bugs')
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const bugService = {
  getBugById,
  addBug,
  getAllBugs
}
