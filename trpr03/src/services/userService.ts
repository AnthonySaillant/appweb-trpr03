import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

async function getUserById(userId) {
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

async function updateUserPassword(userId, newPassword) {
  try {
    const response = await axiosAuth.patch(`http://127.0.0.1:3000/users/${userId}`, {
      password: newPassword
    })
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const userService = {
  getUserById,
  updateUserPassword
}
