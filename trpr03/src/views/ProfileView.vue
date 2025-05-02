<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useProfileStore } from '../stores/profileStore'

defineRule('isRequired', required)

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const newPassword = ref('')
const newPasswordValidation = ref('')
const onError = computed(() => profileStore.onError)

const updatePassword = async () => {
  try {
    await profileStore.updatePassword(newPassword.value)
    alert('Mot de passe mis à jour avec succès.')
    newPassword.value = ''
  } catch (error) {
    alert('Échec de la mise à jour du mot de passe.')
  }
}

onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})
</script>

<template>
  <div>
    <h1>Profile</h1>
    <div>Nom: {{ name }}</div>
    <div>Courriel: {{ email }}</div>

    <h2 class="mt-4">Changer le mot de passe</h2>
    <form @submit.prevent="updatePassword">
      <div class="mb-3">
        <label for="password-input" class="form-label">Nouveau mot de passe</label>
        <Field
          class="form-control"
          id="password-input"
          name="password-input"
          type="password"
          v-model="newPassword"
          :rules="isRequired"
        />
      </div>
      <div class="mb-3">
        <label for="password-validation" class="form-label">Confirmer le mot de passe</label>
        <input
          type="password"
          id="password-validation"
          v-model="newPasswordValidation"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
  </div>
</template>

<style scoped></style>
