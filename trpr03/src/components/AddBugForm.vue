<script setup lang="ts">
import { ref } from 'vue'
import { BugType } from '../types'
import { Form, Field, ErrorMessage } from 'vee-validate'

const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)

const emit = defineEmits<{
  (
    event: 'submit-bug',
    bug: {
      userId: number
      title: string
      description: string
      productionStep: string
      platform: string
      priority: string
      type: BugType
      image: string
    }
  ): void
}>()

const newBug = ref({
  userId: 1,
  title: '',
  description: '',
  productionStep: '',
  platform: '',
  priority: 'Bas',
  type: BugType.Crash,
  image: ''
})

function handleDrop(event: DragEvent) {
  event.preventDefault()
  const file = event.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      newBug.value.image = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function submit() {
  emit('submit-bug', { ...newBug.value })
  // Reset form
  newBug.value = {
    userId: 1,
    title: '',
    description: '',
    productionStep: '',
    platform: '',
    priority: 'Bas',
    type: BugType.Crash,
    image: ''
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <Form
      @submit="submit"
      class="bg-light p-4 rounded"
      style="max-width: 500px; width: 100%; display: flex; flex-direction: column; gap: 0.5rem"
    >
      <h2 class="text-center">Ajouter un nouveau bug</h2>

      <label for="title">Titre</label>
      <Field
        id="title"
        name="title"
        v-model="newBug.title"
        :rules="isRequired"
        class="form-control"
        as="input"
        placeholder="Titre"
      />
      <ErrorMessage name="title" class="text-danger" />

      <label for="description">Description</label>
      <Field
        id="description"
        name="description"
        v-model="newBug.description"
        :rules="isRequired"
        class="form-control"
        as="input"
        placeholder="Description"
      />
      <ErrorMessage name="description" class="text-danger" />

      <label for="productionStep">Étape de production</label>
      <Field
        id="productionStep"
        name="productionStep"
        v-model="newBug.productionStep"
        :rules="isRequired"
        class="form-control"
        as="input"
        placeholder="Étape de production"
      />
      <ErrorMessage name="productionStep" class="text-danger" />

      <label for="platform">Plateforme</label>
      <Field
        id="platform"
        name="platform"
        v-model="newBug.platform"
        :rules="isRequired"
        class="form-control"
        as="input"
        placeholder="Plateforme"
      />
      <ErrorMessage name="platform" class="text-danger" />

      <label for="priority" class="mt-3 mb-1">Priorité</label>
      <select id="priority" v-model="newBug.priority" class="form-select" required>
        <option value="Bas">Bas</option>
        <option value="Medium">Medium</option>
        <option value="Haute">Haute</option>
      </select>

      <label for="type" class="mt-3 mb-1">Type</label>
      <select id="type" v-model="newBug.type" class="form-select" required>
        <option v-for="type in Object.values(BugType)" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <label class="mt-3 mb-1">Capture d’écran</label>
      <div
        @drop="handleDrop"
        @dragover="handleDragOver"
        class="border border-2 border-secondary rounded p-3 text-center"
        style="cursor: pointer"
      >
        <p>Glissez-déposez une image ici</p>
      </div>

      <div v-if="newBug.image" class="mt-2 text-center">
        <p>Image ajoutée :</p>
        <img :src="newBug.image" class="img-fluid rounded" style="max-height: 200px" />
      </div>

      <button type="submit" class="btn btn-primary mt-3">Ajouter le bug</button>
    </Form>
  </div>
</template>

<style scoped>
.text-danger {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
