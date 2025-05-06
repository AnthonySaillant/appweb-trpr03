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
    newPasswordValidation.value = ''
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

const isRequired = (value) => (!value ? 'Ce champ est requis.' : true)
</script>

<template>
  <div>
    <h1>Profile</h1>
    <div>Nom: {{ name }}</div>
    <div>Courriel: {{ email }}</div>

    <h2 class="mt-4">Changer le mot de passe</h2>

    <!-- Container for layout -->
    <div class="d-flex">
      <div class="w-50">
        <Form @submit="updatePassword">
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
            <ErrorMessage class="text-danger" name="password-input" />
          </div>
          <div class="mb-3">
            <label for="password-validation-input" class="form-label"
              >Confirmer le mot de passe</label
            >
            <Field
              class="form-control"
              id="password-validation-input"
              name="password-validation-input"
              type="password"
              v-model="newPasswordValidation"
              :rules="isRequired"
            />
            <ErrorMessage class="text-danger" name="password-validation-input" />
          </div>
          <button type="submit" class="btn btn-primary">Mettre à jour</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
