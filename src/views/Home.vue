<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <p><strong>Status :</strong> {{ status }}</p>

      <ion-button expand="block" @click="playTest">
        ▶️ Lancer fréquence test (440 Hz)
      </ion-button>

      <ion-button expand="block" color="medium" @click="stopSound">
        ⏹ Stop
      </ion-button>

      <hr />

      <div
        v-for="(prog, key) in grimoire"
        :key="key"
        class="program-card"
      >
        <h2>{{ prog.label }}</h2>
        <p>⏱ {{ totalDuration(prog.steps) }} min</p>

        <ion-button expand="block" @click="runProgram(key)">
          ▶️ Démarrer
        </ion-button>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import grimoire from '../data/grimoire.json'

const status = ref('Fréquence arrêtée')
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
let oscillator: OscillatorNode | null = null

let runSteps: any[] = []
let runIndex = 0
let runTimer: number | null = null

function playFrequency(freq: number) {
  stopSound()
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
  if (runTimer) {
    clearTimeout(runTimer)
    runTimer = null
  }
  status.value = 'Fréquence arrêtée'
}

function playTest() {
  playFrequency(440)
  status.value = '440 Hz'
}

function totalDuration(steps: any[]) {
  return steps.reduce((s, x) => s + x.duration, 0)
}

function runProgram(key: string) {
  stopSound()
  runSteps = grimoire[key].steps
  runIndex = 0
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
  status.value = `${step.freq} Hz`

  runTimer = window.setTimeout(() => {
    runIndex++
    playStep()
  }, step.duration * 60 * 1000)
}
</script>

<style scoped>
.program-card {
  margin-top: 16px;
  padding: 16px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(180deg, #0a2a43, #6ec6ff);
}
</style>
