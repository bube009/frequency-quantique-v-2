<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding blue-bg">

      <h2>Accueil OK</h2>

      <p><strong>Status :</strong> {{ status }}</p>

      <ion-button expand="block" @click="playTest">
        ▶️ Lancer fréquence test (440 Hz)
      </ion-button>

      <ion-button expand="block" color="danger" @click="stopSound">
        ⏹ Stop
      </ion-button>

      <hr />

      <h3>⚡ Programmes</h3>

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

      <ion-card v-if="currentFreq">
        <ion-card-content>
          🔊 Fréquence en cours : <strong>{{ currentFreq }} Hz</strong><br />
          ⏳ Temps restant : {{ Math.ceil(timeLeft / 60) }} min
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import grimoire from '@/data/grimoire.json'

/* AUDIO */
let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null

const status = ref('Fréquence arrêtée')
const currentFreq = ref<number | null>(null)
const timeLeft = ref(0)

let runSteps: any[] = []
let runIndex = 0
let runTimer: number | null = null

function playFrequency(freq: number) {
  stopSound()
  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
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

/* TEST */
function playTest() {
  playFrequency(440)
  status.value = 'Test 440 Hz'
}

/* PROGRAMMES */
function totalDuration(steps: any[]) {
  return steps.reduce((s, x) => s + x.duration, 0)
}

function runProgram(key: string) {
  stopSound()
  runSteps = grimoire[key].steps
  runIndex = 0
  timeLeft.value = totalDuration(runSteps) * 60
  status.value = grimoire[key].label
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

  runTimer = window.setTimeout(() => {
    runIndex++
    playStep()
  }, step.duration * 60 * 1000)

  const tick = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) clearInterval(tick)
  }, 1000)
}
</script>

<style scoped>
.blue-bg {
  background: linear-gradient(180deg, #0b2c4d, #6ec6ff);
  color: white;
}

ion-item {
  --background: rgba(255, 255, 255, 0.12);
  --color: white;
}

ion-card {
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.35);
  color: white;
}
</style>
