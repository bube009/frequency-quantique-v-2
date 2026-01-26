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

      <!-- TEST SIMPLE -->
      <ion-button expand="block" color="primary" @click="playFrequency(440)">
        ▶️ Lancer fréquence test (440 Hz)
      </ion-button>

      <ion-button expand="block" color="medium" @click="stopSound">
        ⏹ Stop
      </ion-button>

      <hr />

      <!-- LISTE DES PROGRAMMES -->
      <ion-list>
        <ion-item
          v-for="(prog, key) in grimoire"
          :key="key"
          button
          @click="runProgram(key)"
        >
          <ion-label>
            <strong>{{ prog.label }}</strong><br />
            ⏱ {{ totalDuration(prog.steps) }} min
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- INFOS PROGRAMME EN COURS -->
      <div v-if="currentFreq !== null" class="stress-card">
        <h3>🎧 Programme en cours</h3>
        <p>Fréquence : {{ currentFreq }} Hz</p>
        <p>Temps restant : {{ Math.ceil(timeLeft / 60) }} min</p>

        <ion-button expand="block" color="light" @click="stopSound">
          ⏹ Arrêter le programme
        </ion-button>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import grimoire from '../data/grimoire.json'

/* ===== ÉTAT ===== */
const status = ref('Fréquence arrêtée')
const currentFreq = ref<number | null>(null)
const timeLeft = ref(0)

let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let gainNode: GainNode | null = null

let runSteps: any[] = []
let runIndex = 0
let runTimer: number | null = null

/* ===== AUDIO ===== */
function playFrequency(freq: number) {
  stopSound()

  audioCtx = new AudioContext()
  oscillator = audioCtx.createOscillator()
  gainNode = audioCtx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.value = freq
  gainNode.gain.value = 0.2

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.start()
  status.value = `${freq} Hz`
}

function stopSound() {
  if (oscillator) oscillator.stop()
  if (audioCtx) audioCtx.close()

  oscillator = null
  audioCtx = null
  gainNode = null

  if (runTimer) window.clearTimeout(runTimer)

  currentFreq.value = null
  timeLeft.value = 0
  status.value = 'Fréquence arrêtée'
}

/* ===== PROGRAMMES ===== */
function totalDuration(steps: any[]) {
  return Math.round(
    steps.reduce((s, x) => s + x.duration, 0) / 60
  )
}

function runProgram(key: string) {
  stopSound()
  runIndex = 0
  runSteps = grimoire[key].steps
  timeLeft.value = runSteps.reduce((s, x) => s + x.duration, 0)
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

  let seconds = step.duration

  const tick = setInterval(() => {
    seconds--
    timeLeft.value--
    if (seconds <= 0) clearInterval(tick)
  }, 1000)

  runTimer = window.setTimeout(() => {
    runIndex++
    playStep()
  }, step.duration * 1000)
}
</script>

<style scoped>
.stress-card {
  margin-top: 20px;
  padding: 16px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(180deg, #0b2c4d, #7ecbff);
}
</style>
