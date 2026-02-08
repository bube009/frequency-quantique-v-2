<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Pouls</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg">
      <h2>{{ bpm }} BPM</h2>
      <p>État : {{ state }}</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const bpm = ref(72)
const state = ref('Normal')

onMounted(() => {
  setInterval(() => {
    bpm.value = 60 + Math.floor(Math.random() * 30)
    state.value = bpm.value > 85 ? 'Stress' : 'Calme'
  }, 3000)
})
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #081a2f, #0e3a66);
  color: white;
  text-align: center;
}
</style>
