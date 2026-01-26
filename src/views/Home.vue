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
      <ion-button expand="block" color="primary" @click="startTest">
        ▶ Lancer fréquence test (440 Hz)
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

      <!-- INFO PROGRAMME EN COURS -->
      <div v-if="currentFreq !== null" class="stress-card">
        <p>🎵 Fréquence actuelle : {{ currentFreq }} Hz</p>
        <p>⏳ Temps restant : {{ Math.ceil(timeLeft / 60) }} min</p>

        <ion-button expand="block" color="light" @click="stopSound">
          ⏹ Arrêter le programme
        </ion-button>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import grimoire from '@/data/grimoire.json'

/* ---------- AUDIO ---------- */
let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let runTimer: number | null = null
let runIndex = 0
let runSteps: any[] = []

/* ---------- STATE ---------- */
const status = ref('Fréquence arrêtée')
const currentFreq = ref<number | null>(null)
const timeLeft = ref(0)

/* ---------- AUDIO CORE ---------- */
function playFrequency(freq: number) {
  stopSound()
  audioCtx = new AudioContext()
  oscillator = audioCtx.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.value = freq
  oscillator.connect(audioCtx.destination)
  oscillator.start()
}

function stopSound() {
  if (oscillator) {
    oscillator.stop()
    oscillator.disconnect()
    oscillator = null
  }
  if (audioCtx) {
    audioCtx.close()
    audioCtx = null
  }
  if (runTimer) {
    clearTimeout(runTimer)
    runTimer = null
  }
  currentFreq.value = null
  status.value = 'Fréquence arrêtée'
}

/* ---------- TEST ---------- */
function startTest() {
  playFrequency(440)
  status.value = 'Test 440 Hz'
}

/* ---------- PROGRAMMES ---------- */
function totalDuration(steps: any[]) {
  return Math.round(steps.reduce((s, x) => s + x.duration, 0) / 60)
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
  status.value = `${step.freq} Hz`

  let remaining = step.duration

  const tick = setInterval(() => {
    remaining--
    timeLeft.value--
    if (remaining <= 0) clearInterval(tick)
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
  background: linear-gradient(180deg, #0a2a43, #6ec6ff);
}
</style>
