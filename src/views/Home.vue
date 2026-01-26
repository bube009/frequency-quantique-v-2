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
        ▶ Test 440 Hz
      </ion-button>

      <ion-button expand="block" color="medium" @click="stopAll">
        ⏹ Stop
      </ion-button>

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
          🔊 Fréquence : {{ currentFreq }} Hz<br />
          ⏳ Temps restant : {{ timeLeft }} s
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import grimoire from '@/data/grimoire.json'

const status = ref('Fréquence arrêtée')
const currentFreq = ref<number | null>(null)
const timeLeft = ref(0)

let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let runTimer: number | null = null
let runIndex = 0
let runSteps: any[] = []

function playFrequency(freq: number) {
  stopAll()
  audioCtx = new AudioContext()
  oscillator = audioCtx.createOscillator()
  oscillator.frequency.value = freq
  oscillator.connect(audioCtx.destination)
  oscillator.start()
}

function stopAll() {
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

function playTest() {
  playFrequency(440)
  status.value = 'Test 440 Hz'
}

function totalDuration(steps: any[]) {
  return Math.round(steps.reduce((s, x) => s + x.duration, 0) / 60)
}

function runProgram(key: string) {
  stopAll()
  runIndex = 0
  runSteps = grimoire[key].steps
  timeLeft.value = runSteps.reduce((s, x) => s + x.duration, 0)
  playStep()
}

function playStep() {
  if (runIndex >= runSteps.length) {
    stopAll()
    status.value = 'Programme terminé'
    return
  }

  const step = runSteps[runIndex]
  playFrequency(step.freq)
  currentFreq.value = step.freq
  status.value = `${step.freq} Hz`

  runTimer = window.setTimeout(() => {
    runIndex++
    playStep()
  }, step.duration * 1000)

  const tick = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) clearInterval(tick)
  }, 1000)
}
</script>
