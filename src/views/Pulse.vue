<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Pouls</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg" fullscreen>
      <div class="center">
        <h1>{{ bpm }} bpm</h1>
        <ion-button @click="simulate">Scanner</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const bpm = ref(0)

function simulate() {
  bpm.value = 60 + Math.floor(Math.random() * 40)
}
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #061d3a, #0a2a4d);
}
.center {
  text-align: center;
  margin-top: 50px;
  color: white;
}
</style>
