<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen scroll-y="true">
      <div class="page">

        <p class="status">
          Status : <strong>{{ status }}</strong>
        </p>

        <!-- CARTES -->
        <div
          v-for="p in programs"
          :key="p.id"
          class="card"
        >
          <h2>{{ p.title }}</h2>

          <p class="meta">
            🎵 {{ p.freq }} Hz — ⏱ {{ p.min }} min
          </p>

          <!-- COURBE -->
          <div class="wave-container">
            <svg viewBox="0 0 300 60">
              <path
                d="M0 30 Q 25 10 50 30 T 100 30 T 150 30 T 200 30 T 250 30 T 300 30"
                class="wave-path"
                :class="{ playing: currentId === p.id }"
              />
            </svg>
          </div>

          <!-- INFOS BIO -->
          <p class="bio">
            ❤️ Pouls : {{ pulse }} bpm | ⚡ État : —
          </p>

          <!-- ACTIONS -->
          <div class="actions">
            <ion-button size="small" @click="play(p)">
              ▶ Démarrer
            </ion-button>
            <ion-button size="small" color="medium" @click="stop">
              ⏹ Arrêter
            </ion-button>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Fréquence arrêtée')
const pulse = ref(0)

const currentId = ref<string | null>(null)

const programs = ref([
  { id: 'stress', title: 'Stress / Anxiété', freq: 396, min: 15 },
  { id: 'anxiete', title: 'Anxiété profonde', freq: 417, min: 21 },
  { id: 'sommeil', title: 'Sommeil profond', freq: 174, min: 15 },
  { id: 'detox', title: 'Détoxification', freq: 528, min: 20 }
])

function play(p: any) {
  // 🔔 iOS unlock
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }

  // Stop ancien son
  function stop() {
  if (oscillator) {
    oscillator.stop()
    oscillator.disconnect()
    oscillator = null
  }
  currentId.value = null
  status.value = 'Fréquence arrêtée'
}

  oscillator = audioCtx.createOscillator()
  gainNode = audioCtx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.value = p.freq
  gainNode.gain.value = 0.15

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.start()

  currentId.value = p.id
  status.value = `Lecture ${p.freq} Hz`
}
</script>

<style scoped>
.page {
  padding: 16px;
}

/* CARTES */
.card {
  background: linear-gradient(135deg, #061a33, #0b3a6f);
  color: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
}

.meta {
  opacity: 0.9;
  margin-bottom: 8px;
}

/* COURBE */
.wave-container {
  margin: 12px 0;
}

.wave-path {
  fill: none;
  stroke: white;
  stroke-width: 3;
  stroke-dasharray: 200;
  stroke-dashoffset: 0;
}

/* 👉 ANIMATION SEULEMENT SI playing */
.wave-path.playing {
  animation: waveMove 2s linear infinite;
}

@keyframes waveMove {
  to {
    stroke-dashoffset: -400;
  }
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.status {
  margin-bottom: 16px;
  font-weight: bold;
}

.bio {
  font-size: 14px;
  opacity: 0.85;
}
</style>
