<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { BugType } from '../types'
import background from '../assets/ClashRoyaleBG.png'
import { useBugStore } from '../stores/bugStore'
const bugStore = useBugStore()

const submit = () => {
  const category = newCategory.value.trim()
  if (category) {
    bugStore.addCategory(category)
    newCategory.value = ''
  }
}

const categories = ref<string[]>(Object.values(BugType))

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: '90%',
  minHeight: '100vh',
  display: 'flex',
  boxSizing: 'border-box',
  textAlign: 'center'
}

const newCategory = ref('')

const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)
</script>

<template>
  <div :style="backgroundStyle">
    <div class="container d-flex flex-column justify-content-center align-items-center p-5 rounded">
      <div class="form-container w-100" style="max-width: 500px">
        <h1 class="d-flex align-items-center gap-3 mb-4 text-white">
          Catégories de bugs existantes
        </h1>
        <ul class="list-group mb-4">
          <li v-for="category in bugStore.categories" :key="category" class="list-group-item">
            {{ category }}
          </li>
        </ul>

        <h2 class="mb-3 mt-5 text-white">Ajouter une nouvelle catégorie</h2>
        <Form
          @submit="submit"
          class="bg-light p-4 rounded"
          style="max-width: 500px; width: 100%; display: flex; flex-direction: column; gap: 0.5rem"
        >
          <div class="mb-3">
            <Field
              id="category"
              name="category"
              v-model="newCategory"
              :rules="isRequired"
              class="form-control"
              as="input"
              placeholder="Titre"
            />
            <ErrorMessage name="category" class="text-danger" />
          </div>
          <button type="submit" class="btn btn-primary">Créer la catégorie</button>
        </Form>
      </div>
    </div>
  </div>
</template>
