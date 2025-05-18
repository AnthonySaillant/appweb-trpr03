<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBugStore } from '../stores/bugStore'
import BugItem from '../components/BugItem.vue'
import background from '../assets/ClashRoyaleBG.png'

const bugStore = useBugStore()

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: '90%',
  minHeight: '100vh',
  display: 'flex',
  boxSizing: 'border-box',
  textAlign: 'center'
}

onMounted(async () => {
  await bugStore.fetchAllBugs()
})
</script>

<template>
  <div :style="backgroundStyle">
    <div class="container">
      <h2 class="mb-5 mt-5 text-white">Tous les bugs (Développeur)</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="bug in bugStore.allBugs" :key="bug.id">
          <div class="card h-100 p-3">
            <BugItem :bug="bug" :can-verify="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
}
</style>
