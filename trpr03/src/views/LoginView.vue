<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import background from '../assets/ClashRoyaleBG.png'
import crown from '../assets/crown.png'
import '../css/main.css'
import blue_king from '../assets/Blue_King_Laughing.webp'

// Définir les règles de validation
defineRule('isRequired', required)

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const authServiceError = computed(() => authStore.authServiceError)

onMounted(() => {
  authStore.clearError()
})

const login = async () => {
  // Validation manuelle avant la soumission
  const result = await validate({})
  if (!result.valid) {
    return // Arrête la fonction si la validation échoue
  }

  await authStore.login({
    email: email.value,
    password: password.value
  })

  if (!authStore.authServiceError) {
    router.push({ name: 'Profile' })
  }
}

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: '90%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center'
}

// Fonction pour vérifier si un champ est vide, utilisée dans les règles de vee-validate
const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)
</script>

<template>
  <div :style="backgroundStyle">
    <!--Vien du tp2  le container -->
    <div
      class="container d-flex justify-content-center align-items-center bg-dark text-white p-5 rounded shadow-lg"
    >
      <div class="form-container">
        <h1 class="d-flex align-items-center gap-3">
          Connexion
          <img :src="crown" alt="cr_crown" style="width: 7%" />
        </h1>

        <div class="container my-5">
          <Form @submit="login">
            <div class="mb-3">
              <label class="form-label" for="email-input">Courriel</label>
              <Field
                class="form-control"
                id="email-input"
                name="email-input"
                type="email"
                :rules="isRequired"
                v-model="email"
              />
              <ErrorMessage class="text-danger" name="email-input" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="password-input">Mot de passe</label>
              <Field
                class="form-control"
                id="password-input"
                name="password-input"
                type="password"
                :rules="isRequired"
                v-model="password"
              />
              <ErrorMessage class="text-danger" name="password-input" />
            </div>
            <div class="p-3 mb-2 bg-danger text-white" v-if="authServiceError">
              {{ authServiceError }}
            </div>
            <button class="btn btn-primary" type="submit">Se connecter</button>
          </Form>
        </div>
      </div>
    </div>
    <img :src="blue_king" alt="clashRoyaleKing" class="king-image" />
  </div>
</template>

<style scoped>
.king-image {
  width: 20%;
  position: absolute;
  right: 5%;
  top: 45%;
}
</style>
