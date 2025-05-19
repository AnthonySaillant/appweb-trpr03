import { parseAxiosError } from '../shared/parseAxiosError'
import type { Tester } from '../types'
import axiosAuth from '../shared/axiosAuth'

async function getUserById(userId: number) {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/users/${userId}`
    )

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function getAllUsers() {
  try {
    const response = await axiosAuth.get('http://127.0.0.1:3000/users')
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function updateUserPassword(userId: number, newPassword: string) {
  try {
    const response = await axiosAuth.patch(`http://127.0.0.1:3000/users/${userId}`, {
      password: newPassword
    })
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function modifyKarma(userId: number, newKarma: number) {
  try {
    const response = await axiosAuth.patch(`http://127.0.0.1:3000/users/${userId}`, {
      karma: newKarma
    })
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteUser(userId: number) {
  try {
    const response = await axiosAuth.delete(`http://127.0.0.1:3000/users/${userId}`)
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

//OMIT trouver avec chat GPT OMET LE ID QUI EST AUTO GENERER DANS LA BD!
async function addUser(tester: Omit<Tester, 'id'>) {
  try {
    const response = await axiosAuth.post(`http://127.0.0.1:3000/users`, tester)
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const userService = {
  getUserById,
  getAllUsers,
  updateUserPassword,
  deleteUser,
  addUser,
  modifyKarma
}
