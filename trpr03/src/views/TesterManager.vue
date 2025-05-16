<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userService } from '../services/userService'
import type { Tester } from '../types'
import TesterItem from '../components/TesterItem.vue'
import background from '../assets/ClashRoyaleBG.png'

const users = ref<Tester[]>([])

onMounted(async () => {
  try {
    const allUsers = await userService.getAllUsers()
    users.value = allUsers.filter((user: any) => !user.isDev)
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
  }
})

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: '90%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center'
}
</script>

<template>
  <div :style="backgroundStyle">
    <div class="container bg-dark p-4 rounded shadow-lg">
      <h2 class="text-white text-center mb-4">Liste des utilisateurs</h2>

      <div v-if="users.length === 0" class="alert alert-light text-center">
        Aucun utilisateur trouvé.
      </div>

      <div v-else>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div v-for="user in users" :key="user.id" class="col">
            <div class="card h-100">
              <div class="card-body">
                <TesterItem :tester="user" />
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-success" type="button" @click="">
            <i class="bi bi-plus-circle"></i> Ajouter un testeur!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.03);
}
</style>
