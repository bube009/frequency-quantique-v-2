<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <h2>Accueil OK</h2>

      <p>Status : <strong>{{ status }}</strong></p>

      <ion-button expand="block" color="primary" @click="startTest">
        ▶️ Test 440 Hz
      </ion-button>

      <ion-button expand="block" color="medium" @click="stopAll">
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
            {{ totalDuration(prog.steps) }} minutes
          </ion-label>
        </ion-item>
      </ion-list>

      <div v-if="currentFreq !== null" class="stress-card">
        🔊 {{ currentFreq }} Hz<br />
        ⏱ {{ Math.floor(timeLeft / 60) }} min {{ timeLeft % 60 }} s
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import grimoire from '@/data/grimoire.json'

/* ===== AUDIO ===== */
let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let timer: number | null = null
let runIndex = 0
let runSteps: any[] = []

/* ===== STATE ===== */
const status = ref('Fréquence arrêtée')
const timeLeft = ref(0)
const currentFreq = ref<number | null>(null)

/* ===== CORE ===== */
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
  if (timer) {
    clearTimeout(timer)
    timer = null
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
  currentFreq.value = null
  timeLeft.value = 0
  status.value = 'Fréquence arrêtée'
}

/* ===== PROGRAMMES ===== */
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

  let seconds = step.durationMin * 60

  const tick = setInterval(() => {
    seconds--
    timeLeft.value--
    if (seconds <= 0) clearInterval(tick)
  }, 1000)

  timer = window.setTimeout(() => {
    runIndex++
    playStep()
  }, step.durationMin * 60 * 1000)
}

/* ===== TEST ===== */
function startTest() {
  playFrequency(440)
  status.value = 'Test 440 Hz'
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
  background: linear-gradient(180deg, #0b2c4d, #7ecbff);
}
</style>
