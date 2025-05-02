<script setup lang="ts">
import waving_prince from '../assets/waving_prince.png'
import background from '../assets/ClashRoyaleBG.png'

const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: '90%',
  minHeight: '100vh',
  display: 'flex'
}
</script>

<template>
  <div :style="backgroundStyle">
    <img :src="waving_prince" alt="clashRoyalePrince" class="prince_image" />
    <div class="text-container text-white">
      <div class="welcome_text">Bienvenue!</div>
      <div class="site_description_text">
        Un site ou est ce que les testeurs peuvent partager leurs trouvailles de bug à travers leur
        expérience de jeu.
      </div>
    </div>
  </div>
</template>

<style scoped>
.prince_image {
  width: 30%;
  position: absolute;
  top: 29%;
  left: 5%;
}

.text-container {
  margin-left: 50%;
  margin-top: 20%;
  text-align: left;
}

.welcome_text {
  font-size: 60px;
  font-weight: bold;
}

.site_description_text {
  margin-top: 10px;
  font-size: 20px;
}
</style>
