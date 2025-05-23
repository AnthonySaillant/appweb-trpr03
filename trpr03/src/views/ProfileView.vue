<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useProfileStore } from '../stores/profileStore'
import background from '../assets/ClashRoyaleBG.png'
import '../css/main.css'
import crown from '../assets/crown.png'

defineRule('isRequired', required)

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const karma = computed(() => profileStore.karma)
const newPassword = ref('')
const newPasswordValidation = ref('')
const isPasswordUpdated = ref(false)
const isShowingErrorMessage = ref(false)

const updatePassword = async () => {
  try {
    if (newPassword.value == newPasswordValidation.value) {
      await profileStore.updatePassword(newPassword.value)
      newPassword.value = ''
      newPasswordValidation.value = ''
      isPasswordUpdated.value = true
    }
  } catch (error) {
    isPasswordUpdated.value = false
    isShowingErrorMessage.value = true
  }
}

onMounted(async () => {
  await profileStore.getProfile()
})

const isRequired = (value) => (!value ? 'Ce champ est requis.' : true)

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: '90%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center'
}
</script>

<template>
  <div :style="backgroundStyle" class="d-flex justify-content-center">
    <div class="bg-dark text-white p-5 rounded shadow-lg w-100" style="max-width: 1000px">
      <h1 class="text-center mb-4">
        Profil
        <img :src="crown" alt="cr_crown" style="width: 7%" />
      </h1>

      <div class="row mb-4 mt-5 text-center">
        <div class="col-md-4"><strong>Nom :</strong> {{ name }}</div>
        <div class="col-md-4"><strong>Courriel :</strong> {{ email }}</div>
        <div class="col-md-4"><strong>Karma :</strong> {{ karma }}</div>
      </div>

      <h2 class="h4 mb-5 mt-5 text-center">Changer le mot de passe</h2>

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

        <div class="mb-4">
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

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Mettre à jour</button>
        </div>

        <div class="confirmation-text mt-3 mb-3 text-success" v-if="isPasswordUpdated">
          Mot de passe changé avec succès!
        </div>
        <div class="confirmation-text mt-3 mb-3 text-success" v-if="isShowingErrorMessage">
          Erreur lors du changement du mot de passe!
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
