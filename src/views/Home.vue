<template>
  <h1 style="color:red">HOME OK</h1>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <p class="status">
        Status : <strong>{{ status }}</strong>
      </p>

      <!-- CARTES PROGRAMMES -->
      <div
        v-for="p in programs"
        :key="p.id"
        class="card"
      >
        <h2>{{ p.title }}</h2>
        <p class="meta">
          🎵 {{ p.freq }} Hz — ⏱ {{ p.min }} min
        </p>

        <!-- COURBE DE FRÉQUENCE -->
        <div class="wave-container">
          <svg viewBox="0 0 300 60" preserveAspectRatio="none">
            <path
              class="wave-path"
              :style="{ animationDuration: waveSpeed + 's' }"
              d="M0 30 Q 25 10 50 30 T 100 30 T 150 30 T 200 30 T 250 30 T 300 30"
            />
          </svg>
        </div>

        <!-- BIO -->
        <p class="bio">
          ❤️ Pouls : {{ bio.bpm }} bpm | ⚡ État : {{ bio.state }}
        </p>

        <ion-button expand="block" color="primary" @click="start(p)">
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
import { ref, onUnmounted } from 'vue'

/* =========================
   PROGRAMMES (PACK FINAL)
========================= */
const programs = [
  { id: 'stress', title: 'Stress / Anxiété', freq: 396, min: 15 },
  { id: 'anxiety', title: 'Anxiété profonde', freq: 417, min: 21 },
  { id: 'sleep', title: 'Sommeil profond', freq: 174, min: 15 },
  { id: 'detox', title: 'Détoxification', freq: 528, min: 20 },
  { id: 'meditation', title: 'Méditation', freq: 432, min: 16 },
  { id: 'respiration', title: 'Respiration', freq: 174, min: 15 },
  { id: 'focus', title: 'Concentration', freq: 285, min: 10 },
  { id: 'memory', title: 'Mémoire', freq: 639, min: 20 },
  { id: 'joy', title: 'Joie / Humeur', freq: 528, min: 20 },
  { id: 'immunity', title: 'Immunité', freq: 741, min: 15 },
  { id: 'heart', title: 'Cœur', freq: 639, min: 15 },
  { id: 'lungs', title: 'Poumons', freq: 174, min: 15 },
  { id: 'chakra_root', title: 'Chakra Racine', freq: 396, min: 20 },
  { id: 'chakra_sacral', title: 'Chakra Sacral', freq: 417, min: 15 },
  { id: 'chakra_plexus', title: 'Chakra Plexus', freq: 528, min: 15 },
  { id: 'chakra_heart', title: 'Chakra Cœur', freq: 639, min: 15 },
  { id: 'chakra_throat', title: 'Chakra Gorge', freq: 741, min: 15 },
  { id: 'chakra_eye', title: 'Chakra 3e Œil', freq: 852, min: 15 },
  { id: 'chakra_crown', title: 'Chakra Couronne', freq: 963, min: 15 },
  { id: 'antifatigue', title: 'Anti-fatigue', freq: 528, min: 20 }
]

/* =========================
   ÉTAT
========================= */
const status = ref('Fréquence arrêtée')
const waveSpeed = ref(2)

/* =========================
   AUDIO iOS SAFE
========================= */
let audioCtx: AudioContext | null = null
let osc: OscillatorNode | null = null
let stopTimer: number | null = null

/* =========================
   BIO (SIMULÉ, SAFE)
========================= */
const bio = ref({ bpm: 0, state: '—' })
let bioInterval: number | null = null

function startBio() {
  bioInterval = window.setInterval(() => {
    const bpm = 60 + Math.floor(Math.random() * 40)
    bio.value.bpm = bpm
    bio.value.state =
      bpm > 90 ? 'agité' :
      bpm < 65 ? 'calme' : 'stable'
  }, 1000)
}

function stopBio() {
  if (bioInterval) clearInterval(bioInterval)
  bio.value = { bpm: 0, state: '—' }
}

/* =========================
   LOGIQUE
========================= */
function start(p: any) {
  stop()

  // AudioContext DOIT être créé ici (clic utilisateur)
  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  osc = audioCtx.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = p.freq
  osc.connect(audioCtx.destination)
  osc.start()

  // courbe liée à la fréquence
  waveSpeed.value = Math.max(0.8, 120 / p.freq)

  startBio()
  status.value = `${p.title} — ${p.freq} Hz`

  stopTimer = window.setTimeout(stop, p.min * 60 * 1000)
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
  if (stopTimer) clearTimeout(stopTimer)
  stopBio()
  status.value = 'Fréquence arrêtée'
}

onUnmounted(stop)
</script>

<style scoped>
/* FOND BLEU FONCÉ GLOBAL */
ion-content {
  --background: linear-gradient(
    180deg,
    #050b1a 0%,
    #071a3a 40%,
    #0b3a7a 100%
  );
}

.status {
  color: white;
  margin-bottom: 12px;
}

/* CARTES */
.card {
  margin: 18px 0;
  padding: 20px;
  border-radius: 22px;
  color: white;
  background: linear-gradient(160deg, #081c34, #0f4fa8);
}

.meta {
  opacity: 0.9;
}

.bio {
  font-size: 0.9em;
  opacity: 0.85;
}

/* COURBE */
.wave-container {
  width: 100%;
  height: 60px;
  margin: 12px 0;
}

.wave-container svg {
  width: 100%;
  height: 100%;
}

.wave-path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.9);
  stroke-width: 3;
  stroke-dasharray: 200;
  animation: waveMove linear infinite;
}

@keyframes waveMove {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -200; }
}
</style>
