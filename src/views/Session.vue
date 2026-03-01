<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg" fullscreen>
      <div class="center">
        <h2>{{ freq }} Hz</h2>
        <p>{{ min }} minutes</p>

        <div class="wave" :class="{ active: playing }"></div>

        <ion-button expand="block" @click="start">
          Démarrer
        </ion-button>

        <ion-button expand="block" color="danger" @click="stop">
          Arrêter
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { playFrequency, stopFrequency } from '@/services/audio'

const route = useRoute()

const title = route.query.title as string
const freq = Number(route.query.freq)
const min = Number(route.query.min)

const playing = ref(false)

function start() {
  playFrequency(freq)
  playing.value = true
}

function stop() {
  stopFrequency()
  playing.value = false
}
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #061d3a, #0a2a4d);
}

.center {
  text-align: center;
  margin-top: 40px;
  color: white;
}

.wave {
  height: 60px;
  margin: 30px 0;
  border-bottom: 3px solid white;
}

.wave.active {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scaleX(1); }
  50% { transform: scaleX(1.1); }
  100% { transform: scaleX(1); }
}
</style>
