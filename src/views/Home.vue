<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="go('/pulse')">Pouls</ion-button>
          <ion-button @click="go('/sky')">Ciel</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen :scroll-y="true" class="bg">
      <div class="wrap">
        <div class="top">
          <div class="status">Statut : <strong>{{ status }}</strong></div>
        </div>

        <div
          v-for="p in programs"
          :key="p.id"
          class="card"
          @click="openProgram(p)"
        >
          <div class="left">
            <div class="title">{{ p.title }}</div>
            <div class="meta">{{ p.freq }} Hz • {{ p.min }} min</div>
            <div class="pill">{{ (p.category || 'Programme').toUpperCase() }}</div>
          </div>

          <div class="right">
            <div class="miniWave" />
          </div>
        </div>

        <div style="height: 28px"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButtons, IonButton
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { programs } from '@/data/programs'

const router = useRouter()
const status = 'Fréquence arrêtée'

function go(path: string) {
  router.push(path)
}

function openProgram(p: any) {
  router.push({ path: '/session', query: { id: p.id } })
}
</script>

<style scoped>
.bg {
  --background: radial-gradient(1200px 700px at 20% 10%, #123a7a 0%, #071a33 55%, #050f1f 100%);
}
.wrap { padding: 14px 14px 6px; }

.status {
  color: rgba(255,255,255,0.9);
  padding: 6px 6px 14px;
}

.card {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 18px;
  margin: 14px 6px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(10,40,85,0.95), rgba(30,110,195,0.35));
  box-shadow: 0 18px 50px rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.08);
}

.title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.2px;
  color: white;
}
.meta {
  margin-top: 8px;
  color: rgba(255,255,255,0.85);
  font-size: 16px;
}
.pill {
  display: inline-block;
  margin-top: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 1.1px;
  color: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.14);
}

.right {
  display: flex;
  align-items: center;
}
.miniWave {
  width: 96px;
  height: 72px;
  border-radius: 16px;
  background: radial-gradient(160px 90px at 30% 30%, rgba(255,255,255,0.14), rgba(255,255,255,0.03));
  border: 1px solid rgba(255,255,255,0.10);
}
</style>
