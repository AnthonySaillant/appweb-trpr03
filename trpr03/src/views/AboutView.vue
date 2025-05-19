<script setup lang="ts">
import hogrider from '../assets/hogrider.png'
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
    <div class="text-container text-white">
      <div class="Salut">
        <h1>à propos...</h1>
      </div>
      <div class="description_travail_texte">
        Application développé par Lorik Parent et Anthony Saillant pour le cours de App Web
      </div>
    </div>
    <img :src="hogrider" alt="hogrider" class="hog_rider_image" />
  </div>
</template>

<style scoped>
.hog_rider_image {
  width: 35%;
  position: absolute;
  top: 29%;
  left: 5%;
}

.text-container {
  margin-left: 50%;
  margin-top: 20%;
  text-align: left;
}

.Salut {
  font-size: 60px;
  font-weight: bold;
}

.site_description_text {
  margin-top: 10px;
  font-size: 20px;
}
</style>
