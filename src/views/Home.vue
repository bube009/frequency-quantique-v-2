<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- IMPORTANT : UN SEUL ion-content -->
    <ion-content fullscreen scroll-y="true" class="page-bg">
      <p class="status">
        Status : <strong>{{ status }}</strong>
      </p>

      <div
        v-for="p in programs"
        :key="p.id"
        class="card"
      >
        <h2>{{ p.title }}</h2>

        <p class="meta">
          🎵 {{ p.freq }} Hz — ⏱ {{ p.min }} min
        </p>

        <!-- COURBE : ANIMÉE SEULEMENT SI CE PROGRAMME JOUE -->
        <div class="wave-container">
          <svg viewBox="0 0 300 60" preserveAspectRatio="none">
            <path
              class="wave-path"
              :class="{ active: currentId === p.id }"
              d="M0 30 Q 25 10 50 30 T 100 30 T 150 30 T 200 30 T 250 30 T 300 30"
            />
          </svg>
        </div>

        <p class="bio">
          ❤️ Pouls : {{ pulse }} bpm | ⚡ État : —
        </p>

        <div class="buttons">
          <ion-button @click="play(p)" :disabled="currentId === p.id">
            ▶ Démarrer
          </ion-button>

          <ion-button color="medium" @click="stop">
            ⏹ Arrêter
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* ====== DONNÉES ====== */
const programs = ref([
  { id: 'stress', title: 'Stress / Anxiété', freq: 396, min: 15 },
  { id: 'anxiete', title: 'Anxiété profonde', freq: 417, min: 21 },
  { id: 'sommeil', title: 'Sommeil profond', freq: 174, min: 15 },
  { id: 'detox', title: 'Détoxification', freq: 528, min: 20 },
  { id: 'meditation', title: 'Méditation', freq: 432, min: 16 }
])

const status = ref('Fréquence arrêtée')
const currentId = ref<string | null>(null)
const pulse = ref(0)

/* ====== AUDIO iOS SAFE ====== */
let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let gainNode: GainNode | null = null

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
}

function play(p: any) {
  stop()
  initAudio()

  if (!audioCtx) return

  oscillator = audioCtx.createOscillator()
  gainNode = audioCtx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.value = p.freq
  gainNode.gain.value = 0.15

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.start()

  currentId.value = p.id
  status.value = `${p.freq} Hz en cours`

  // arrêt auto après durée
  setTimeout(() => {
    stop()
  }, p.min * 60 * 1000)
}

function stop() {
  if (oscillator) {
    oscillator.stop()
    oscillator.disconnect()
    oscillator = null
  }
  if (gainNode) {
    gainNode.disconnect()
    gainNode = null
  }
  currentId.value = null
  status.value = 'Fréquence arrêtée'
}
</script>

<style scoped>
/* ====== PAGE ====== */
.page-bg {
  --background: linear-gradient(180deg, #061a33, #0b3c6f);
  padding: 16px;
}

.status {
  color: #ffffff;
  margin-bottom: 12px;
}

/* ====== CARTES ====== */
.card {
  background: linear-gradient(135deg, #0a2a4f, #0f5ea8);
  border-radius: 18px;
  padding: 16px;
  margin-bottom: 18px;
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
}

.meta {
  opacity: 0.9;
}

.bio {
  margin-top: 8px;
  font-size: 0.9em;
  opacity: 0.85;
}

/* ====== COURBE ====== */
.wave-container {
  height: 50px;
  margin: 10px 0;
}

.wave-path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.4);
  stroke-width: 3;
}

.wave-path.active {
  stroke: #ffffff;
  animation: waveMove 1.2s linear infinite;
}

@keyframes waveMove {
  0% {
    stroke-dasharray: 0 200;
  }
  100% {
    stroke-dasharray: 200 0;
  }
}

/* ====== BOUTONS ====== */
.buttons {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
</style>
