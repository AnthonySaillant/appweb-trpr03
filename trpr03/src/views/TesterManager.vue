<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userService } from '../services/userService'
import type { Tester } from '../types'
import TesterItem from '../components/TesterItem.vue'
import background from '../assets/ClashRoyaleBG.png'
import TesterAddForm from '../components/TesterAddForm.vue'

const users = ref<Tester[]>([])
const allUsersLength = ref(0)
const isShowingModal = ref(false)
const isRequestAccepted = ref(false)
const selectedTesterId = ref<number | null>(null)

onMounted(async () => {
  try {
    const allUsers = await userService.getAllUsers()
    allUsersLength.value = allUsers.length
    users.value = allUsers.filter((user: any) => !user.isDev)
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
  }
})

const onTesterAdd = (tester: Tester) => {
  users.value.push(tester)
  allUsersLength.value++
}

const onTesterDelete = (id: number) => {
  const index = users.value.findIndex((user) => user.id === id)
  if (index !== -1) {
    users.value.splice(index, 1)
  }
  confirmDelete()
}

const openModal = (id: number) => {
  selectedTesterId.value = id
  isShowingModal.value = true
}

const closeModal = () => {
  isShowingModal.value = false
  selectedTesterId.value = null
  isRequestAccepted.value = false
}

const confirmDelete = async () => {
  if (selectedTesterId.value !== null) {
    try {
      await userService.deleteUser(selectedTesterId.value)
      const index = users.value.findIndex((user) => user.id === selectedTesterId.value) //chat GPT pour trouver l'index

      users.value.splice(index, 1)
      allUsersLength.value--
    } catch (error) {
      console.log("Erreur lors de la suppression de l'utilisateur")
    }
  }
  closeModal()
}

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
    <div class="users">
      <div class="container bg-dark p-5 rounded shadow-lg mt-5 mb-5">
        <h2 class="text-white text-center mb-4">Liste des utilisateurs</h2>

        <div v-if="users.length === 0" class="alert alert-light text-center">
          Aucun utilisateur trouvé.
        </div>

        <div v-else>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3">
            <div v-for="user in users" :key="user.id" class="col">
              <div class="card h-100">
                <div class="card-body">
                  <TesterItem
                    :tester="user"
                    :requestAccepted="isRequestAccepted && selectedTesterId === user.id"
                    @deleteRequest="openModal(user.id)"
                    @deleted="onTesterDelete(user.id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="addTester">
      <TesterAddForm :userCount="allUsersLength" @added="onTesterAdd" />
    </div>

    <div v-if="isShowingModal">
      <div
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        style="display: block; top: 80%; left: 50%; transform: translate(-50%, -50%)"
      >
        <!-- Chat GPT pour le translate qui centre le modal, essaie erreur pour le top-->
        <div class="modal-dialog" role="document">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title">Confirmer la suppression</h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                aria-label="Close"
                @click="closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
              <button type="button" class="btn btn-danger" @click="confirmDelete">Supprimer</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-backdrop fade show"></div>
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
.users {
  width: 50%;
  margin-left: 50px;
}
.addTester {
  width: 50%;
  margin-right: 50px;
  margin-left: 50px;
}
</style>
