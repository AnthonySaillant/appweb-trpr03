<script setup lang="ts">
import background from '../assets/ClashRoyaleBG.png'
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
    <div class="content-container">
      <h1 class="title text-white">404 - Cette page n'existe pas...</h1>
    </div>
  </div>
</template>

<style scoped>
.content-container {
  margin: 0 auto;
  text-align: center;
}
</style>
