<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg" fullscreen>
      <div
        v-for="p in programs"
        :key="p.id"
        class="card"
        @click="go(p)"
      >
        <h2>{{ p.title }}</h2>
        <p>{{ p.freq }} Hz • {{ p.min }} min</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const programs = [
  { id: 'stress', title: 'Stress / Anxiété', freq: 396, min: 15 },
  { id: 'sleep', title: 'Sommeil profond', freq: 174, min: 15 },
  { id: 'meditation', title: 'Méditation', freq: 432, min: 16 },
  { id: 'energy', title: 'Énergie vitale', freq: 528, min: 20 },
]

function go(p:any) {
  router.push({ path: '/session', query: p })
}
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #061d3a, #0a2a4d);
}
.card {
  margin: 16px;
  padding: 20px;
  border-radius: 18px;
  background: linear-gradient(135deg, #0a2a4d, #154c8a);
  color: white;
}
</style>
