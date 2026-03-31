<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <div class="status">
        Statut : <strong>Fréquence arrêtée</strong>
      </div>

      <div
        v-for="p in programs"
        :key="p.id"
        class="card"
        @click="openProgram(p)"
      >
        <div class="left">
          <div class="title">{{ p.title }}</div>
          <div class="meta">
            {{ firstFreq(p) }} Hz
          </div>
          <div class="pill">{{ p.category }}</div>
        </div>

        <div class="right">
          <div class="miniWave"></div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { programs } from '@/data/programs'

type Program = {
  id: number
  title: string
  category: string
  steps?: Array<{
    freq: number
    duration: number
  }>
}

const router = useRouter()

function openProgram(p: Program) {
  router.push(`/session/${p.id}`)
}

function firstFreq(p: Program): number {
  return p.steps?.[0]?.freq ?? 0
}
</script>

<style scoped>
.status {
  margin-bottom: 20px;
  font-size: 16px;
}

.card {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 18px;
  margin-bottom: 14px;
  border-radius: 20px;
  background: linear-gradient(135deg, #0a2a5a, #123d85);
  color: white;
}

.left {
  flex: 1;
}

.title {
  font-size: 22px;
  font-weight: bold;
}

.meta {
  margin-top: 6px;
  opacity: 0.85;
  font-size: 18px;
}

.pill {
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.75;
}

.right {
  display: flex;
  align-items: center;
}

.miniWave {
  width: 80px;
  height: 60px;
  border-radius: 12px;
  background: radial-gradient(circle, #4fc3f7, transparent);
}
</style>
