<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen scroll-y="true" class="bg">
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
  { id: 'sommeil', title: 'Sommeil profond', freq: 174, min: 15 },
  { id: 'meditation', title: 'Méditation', freq: 432, min: 16 },
  { id: 'energie', title: 'Énergie vitale', freq: 528, min: 20 }
]

function go(p: any) {
  router.push({ path: '/session', query: p })
}
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #061a33, #0b3c6f);
}
.card {
  margin: 16px;
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, #0a2a4f, #0f5ea8);
  color: white;
}
</style>
