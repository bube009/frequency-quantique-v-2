<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>Analyse du Pouls</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg">
      <div class="card">
        <h2>🫀 Pouls (estimation)</h2>

        <p v-if="!measuring">
          Place ton doigt sur la caméra arrière et la lumière.
        </p>

        <p v-if="measuring">
          Analyse en cours…
        </p>

        <h1 v-if="bpm">❤️ {{ bpm }} BPM</h1>

        <p v-if="suggestion">
          🔔 Fréquence suggérée :
          <strong>{{ suggestion }} Hz</strong>
        </p>

        <ion-button expand="block" @click="start">
          ▶ Démarrer
        </ion-button>

        <ion-button expand="block" color="medium" @click="stop">
          ⏹ Arrêter
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/vue'

const bpm = ref<number | null>(null)
const measuring = ref(false)
const suggestion = ref<number | null>(null)

function start() {
  measuring.value = true
  bpm.value = null
  suggestion.value = null

  // SIMULATION réaliste (placeholder)
  setTimeout(() => {
    bpm.value = Math.floor(60 + Math.random() * 40)
    measuring.value = false

    if (bpm.value > 90) suggestion.value = 396
    else if (bpm.value < 60) suggestion.value = 528
    else suggestion.value = 432
  }, 4000)
}

function stop() {
  measuring.value = false
}
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #071b2f, #0b3a5c);
  padding: 20px;
}

.card {
  background: linear-gradient(180deg, #0b2c4d, #0f4f78);
  border-radius: 20px;
  padding: 20px;
  color: white;
  text-align: center;
}
</style>
