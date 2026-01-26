<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <h2>Accueil OK</h2>

      <p>
        Status :
        <strong>{{ status }}</strong>
      </p>

      <ion-button expand="block" color="primary" @click="startTest">
        ▶️ Lancer fréquence test (440 Hz)
      </ion-button>

      <ion-button expand="block" color="medium" @click="stopAll">
        ⏹ Stop
      </ion-button>

      <hr />

      <!-- PROGRAMME ÉNERGIE -->
      <h3>⚡ Programme Énergie</h3>
      <p>
        Fréquences : 174 → 285 → 528 Hz<br />
        Durée totale : 15 minutes
      </p>

      <ion-button expand="block" color="success" @click="runProgram('energie')">
        ▶️ Démarrer Énergie
      </ion-button>

      <!-- PROGRAMME STRESS -->
      <div class="stress-card">
        <h3>💙 Programme Stress / Anxiété</h3>

        <p>
          Fréquences : 396 → 417 → 432 Hz<br />
          Durée totale : 12 minutes
        </p>

        <ion-button expand="block" color="light" @click="runProgram('stress')">
          ▶️ Démarrer Relaxation
        </ion-button>
      </div>

      <hr />

      <p v-if="currentFreq !== null">
        🔊 Fréquence en cours : <strong>{{ currentFreq }} Hz</strong>
      </p>

      <p v-if="timeLeft > 0">
        ⏱ Temps restant : {{ Math.floor(timeLeft / 60) }} min {{ timeLeft % 60 }} s
      </p>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* ====== AUDIO ====== */
let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let runTimer: number | null = null
let runIndex = 0
let runSteps: any[] = []

/* ====== STATE ====== */
const status = ref('Fréquence arrêtée')
const timeLeft = ref(0)
const currentFreq = ref<number | null>(null)

/* ====== GRIMOIRE MINIMAL (TEST) ====== */
const grimoire: Record<string, any> = {
  energie: {
    steps: [
      { freq: 174, durationMin: 5 },
      { freq: 285, durationMin: 5 },
      { freq: 528, durationMin: 5 }
    ]
  },
  stress: {
    steps: [
      { freq: 396, durationMin: 4 },
      { freq: 417, durationMin: 4 },
      { freq: 432, durationMin: 4 }
    ]
  }
}

/* ====== AUDIO CORE ====== */
function playFrequency(freq: number) {
  stopSound()
  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  oscillator = audioCtx.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime)
  oscillator.connect(audioCtx.destination)
  oscillator.start()
}

function stopSound() {
  if (runTimer) {
    clearTimeout(runTimer)
    runTimer = null
  }

  if (oscillator) {
    oscillator.stop()
    oscillator.disconnect()
    oscillator = null
  }

  if (audioCtx) {
    audioCtx.close()
    audioCtx = null
  }

  status.value = 'Fréquence arrêtée'
  currentFreq.value = null
  timeLeft.value = 0
}

/* ====== TEST ====== */
function startTest() {
  playFrequency(440)
  status.value = 'Test 440 Hz'
}

/* ====== PROGRAMME ====== */
function totalDuration(steps: any[]) {
  return steps.reduce((s, x) => s + x.durationMin, 0)
}

function runProgram(key: string) {
  stopSound()
  runIndex = 0
  runSteps = grimoire[key].steps
  timeLeft.value = totalDuration(runSteps) * 60
  playStep()
}

function playStep() {
  if (runIndex >= runSteps.length) {
    stopSound()
    status.value = 'Programme terminé'
    return
  }

  const step = runSteps[runIndex]
  playFrequency(step.freq)
  currentFreq.value = step.freq
  status.value = `${step.freq} Hz`

  let stepSeconds = step.durationMin * 60

  const tick = setInterval(() => {
    stepSeconds--
    timeLeft.value--
    if (stepSeconds <= 0) clearInterval(tick)
  }, 1000)

  runTimer = window.setTimeout(() => {
    runIndex++
    playStep()
  }, step.durationMin * 60 * 1000)
}

function stopAll() {
  stopSound()
}
</script>

<style scoped>
.stress-card {
  margin-top: 20px;
  padding: 16px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(
    180deg,
    #0b2c4d,
    #7ecbff
  );
}
</style>
