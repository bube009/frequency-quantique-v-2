<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <div class="status">
        Statut : <strong>{{ status }}</strong>
      </div>

      <div
        v-for="p in programs"
        :key="p.id"
        class="card"
        @click="openProgram(p)"
      >
        <div class="left">
          <div class="title">{{ p.title }}</div>
          <div class="meta">{{ p.freq }} Hz</div>
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

const router = useRouter()
const status = 'Fréquence arrêtée'

const programs = [
  { id: 1, title: 'Relaxation', freq: 432, category: 'Bien-être' },
  { id: 2, title: 'Sommeil', freq: 528, category: 'Repos' },
  { id: 3, title: 'Énergie', freq: 741, category: 'Vitalité' }
]

function openProgram(p: { id: number }) {
  router.push(`/session/${p.id}`)
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

.title {
  font-size: 22px;
  font-weight: bold;
}

.meta {
  margin-top: 6px;
  opacity: 0.8;
}

.pill {
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.7;
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
