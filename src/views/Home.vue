<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p><strong>Status :</strong> {{ status }}</p>

      <div
        v-for="p in programs"
        :key="p.id"
        class="card"
      >
        <div class="left">
          <h2>{{ p.title }}</h2>
          <p>{{ p.freq }} Hz — {{ p.min }} min</p>
          <p class="bio">Bio : {{ bioValue }}</p>

          <ion-button @click="start(p)" color="primary">
            Démarrer
          </ion-button>
          <ion-button @click="stop" color="medium">
            Arrêter
          </ion-button>
        </div>

        <div class="wave"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import programs from '../data/programs.json'

let audioCtx: AudioContext | null = null
let osc: OscillatorNode | null = null
let timer: number | null = null

const status = ref('Fréquence arrêtée')
const bioValue = ref('—')

/* 🔬 CAPTEUR BIO (SIMULÉ, PRÊT BLE / CAMÉRA) */
let bioInterval: number | null = null
function startBio() {
  bioInterval = window.setInterval(() => {
    bioValue.value = Math.round(60 + Math.random() * 40) + ' bpm'
  }, 1000)
}
function stopBio() {
  if (bioInterval) clearInterval(bioInterval)
  bioValue.value = '—'
}

/* 🔊 AUDIO */
function start(p: any) {
  stop()

  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  osc = audioCtx.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = p.freq
  osc.connect(audioCtx.destination)
  osc.start()

  startBio()
  status.value = `${p.title} — ${p.freq} Hz`

  timer = window.setTimeout(stop, p.min * 60 * 1000)
}

function stop() {
  if (osc) {
    osc.stop()
    osc.disconnect()
    osc = null
  }
  if (audioCtx) {
    audioCtx.close()
    audioCtx = null
  }
  if (timer) clearTimeout(timer)
  stopBio()
  status.value = 'Fréquence arrêtée'
}

onUnmounted(stop)
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  padding: 20px;
  border-radius: 20px;
  color: white;
  background: linear-gradient(160deg, #081c34, #0f4fa8);
}

.wave {
  width: 80px;
  height: 60px;
  background: linear-gradient(90deg, #7ecbff, #ffffff);
  border-radius: 12px;
  opacity: 0.3;
}

.bio {
  font-size: 0.9em;
  opacity: 0.85;
}
</style>
