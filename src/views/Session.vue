<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg">
      <h2>{{ freq }} Hz</h2>

      <!-- COURBE ACTIVE -->
      <svg viewBox="0 0 300 60">
        <path
          d="M0 30 Q25 10 50 30 T100 30 T150 30 T200 30 T250 30 T300 30"
          class="wave"
        />
      </svg>

      <p>Temps restant : {{ time }} sec</p>

      <ion-button @click="start">▶ Démarrer</ion-button>
      <ion-button color="medium" @click="stop">⏹ Arrêter</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onUnmounted } from 'vue'
import { playFrequency, stopFrequency } from '../services/audio'

const route = useRoute()

const title = route.query.title as string
const freq = Number(route.query.freq)
const duration = Number(route.query.min) * 60

const time = ref(duration)
let timer: any = null

function start() {
  stop()
  playFrequency(freq)
  time.value = duration

  timer = setInterval(() => {
    time.value--
    if (time.value <= 0) stop()
  }, 1000)
}

function stop() {
  stopFrequency()
  if (timer) clearInterval(timer)
}

onUnmounted(stop)
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #050b1a, #0b3c6f);
  color: white;
  text-align: center;
}
.wave {
  fill: none;
  stroke: white;
  stroke-width: 3;
  animation: wave 1.2s linear infinite;
}
@keyframes wave {
  to { stroke-dashoffset: -400; }
}
</style>
