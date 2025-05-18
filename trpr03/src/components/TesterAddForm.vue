<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { userService } from '../services/userService'
import type { Tester } from '../types'

const props = defineProps<{ userCount: number }>()
const formError = ref<string | null>(null)

const emit = defineEmits<{
  (event: 'added', tester: Tester): void
}>()

const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)

//OMIT trouver avec chat GPT OMET LE ID QUI EST AUTO GENERER DANS LA BD!
const newTester = ref<Omit<Tester, 'id'>>({
  email: '',
  name: '',
  password: '',
  isDev: false,
  karma: 0
})

function translateErrorMessage(rawMessage: string): string {
  //utilisation de chat GPT pour la traduction d'erreur serveur
  switch (rawMessage) {
    case 'Email format is invalid':
      return "Le format d\'email est invalide"
    case 'Password is too short':
      return 'Le mot de passe est trop court'
    case 'Incorrect password':
      return 'Le mot de passe est incorrect'
    default:
      return 'Une erreur est survenu'
  }
}

const submitForm = async () => {
  try {
    formError.value = null
    const addedTester = await userService.addUser(newTester.value)
    emit('added', addedTester)
    newTester.value.email = ''
    newTester.value.password = ''
    newTester.value.name = ''

    //chat GPT pour la gestion derreur coter serveur (seulement le instanceOf)
  } catch (error) {
    let rawMessage = 'Une erreur inconnue est survenue'
    if (error instanceof Error) {
      rawMessage = error.message
    } else if (typeof error === 'string') {
      rawMessage = error
    }
    formError.value = translateErrorMessage(rawMessage)
  }
}
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center bg-dark text-white p-5 rounded shadow-lg"
  >
    <div class="form-container w-100" style="max-width: 500px">
      <h1 class="d-flex align-items-center gap-3">Ajout d'un testeur</h1>

      <Form @submit="submitForm">
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <Field
            v-model="newTester.email"
            name="email"
            type="email"
            :rules="isRequired"
            class="form-control"
          />
          <ErrorMessage class="text-danger" name="email" />
        </div>

        <div class="mb-3">
          <label class="form-label" for="password">Mot de passe</label>
          <Field
            v-model="newTester.password"
            name="password"
            type="password"
            :rules="isRequired"
            class="form-control"
          />
          <ErrorMessage class="text-danger" name="password" />
        </div>

        <div class="mb-3">
          <label class="form-label" for="name">Nom</label>
          <Field
            v-model="newTester.name"
            name="name"
            type="text"
            :rules="isRequired"
            class="form-control"
          />
          <ErrorMessage class="text-danger" name="name" />
        </div>
        <button class="btn btn-success" type="submit">Ajouter le testeur!</button>
        <div class="p-3 mb-2 bg-danger text-white mt-5" v-if="formError">
          {{ formError }}
        </div>
      </Form>
    </div>
  </div>
</template>
