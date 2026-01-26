<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-button
  expand="block"
  color="danger"
  @click="stopAll"
>
  ⏹️ STOP GLOBAL
</ion-button>
    
    <p v-if="currentFreq">
  ⏱ {{ Math.floor(timeLeft / 60) }}:{{ String(timeLeft % 60).padStart(2,'0') }}
  — {{ currentFreq }} Hz
</p>
    
    <ion-button expand="block" @click="runProgram('stress_anxiete')">
  ▶️ Stress / Anxiété
</ion-button>

<ion-button expand="block" @click="runProgram('energie')">
  ▶️ Énergie
</ion-button>

    <ion-content class="ion-padding">
      <h2>Accueil OK</h2>

      <p>Status : <strong>{{ status }}</strong></p>

      <ion-button expand="block" color="primary" @click="startFrequency">
        ▶️ Lancer fréquence test (440 Hz)
      </ion-button>

      <ion-button expand="block" color="medium" @click="stopFrequency">
        ⏹ Stop
      </ion-button>
      <hr />

<h3>⚡ Programme Énergie</h3>

<p>
  Fréquences : 174 Hz → 285 Hz → 528 Hz<br />
  Durée totale : 15 minutes
</p>

<ion-button expand="block" color="success" @click="startEnergyProgram">
  ▶️ Démarrer Énergie
</ion-button>
        <hr />

  <div class="stress-card">
    <h3>💙 Programme Stress / Anxiété</h3>

    <p>
      Fréquences : 396 Hz → 417 Hz → 432 Hz<br />
      Durée totale : 12 minutes
    </p>

    <ion-button expand="block" color="light" @click="startStressProgram">
      ▶️ Démarrer Relaxation
    </ion-button>
  </div>
      <h3>📋 Programmes</h3>

<ion-list>
  <ion-item
    v-for="(prog, key) in grimoire"
    :key="key"
    button
    @click="runProgram(key)"
  >
    <ion-label>
      <strong>{{ prog.label }}</strong><br />
      {{ totalDuration(prog.steps) }} min
    </ion-label>
  </ion-item>
</ion-list>

      <hr />

<h3>⏱️ Mini Timer Pack</h3>

<ion-button expand="block" color="medium" @click="startWithTimer(5)">
  ▶️ 5 minutes
</ion-button>

<ion-button expand="block" color="medium" @click="startWithTimer(10)">
  ▶️ 10 minutes
</ion-button>

<ion-button expand="block" color="medium" @click="startWithTimer(15)">
  ▶️ 15 minutes
</ion-button>

<ion-button expand="block" color="medium" @click="startWithTimer(20)">
  ▶️ 20 minutes
</ion-button>
</ion-content>
    
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Fréquence arrêtée')

let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null

const startFrequency = () => {
  if (audioCtx) return

  audioCtx = new AudioContext()
  oscillator = audioCtx.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.value = 440

  oscillator.connect(audioCtx.destination)
  oscillator.start()

  status.value = 'Fréquence en cours : 440 Hz'
}

const stopFrequency = () => {
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

  if (stressTimer) {
    clearTimeout(stressTimer)
    stressTimer = null
  }

  status.value = '⏹️ Programme arrêté'
}
</script>
let globalTimer: number | null = null

function startWithTimer(minutes: number) {
  status.value = `⏳ Session ${minutes} min en cours`

  if (globalTimer) {
    clearTimeout(globalTimer)
  }

  globalTimer = window.setTimeout(() => {
    stopAll()
  }, minutes * 60 * 1000)
}
import programs from '@/data/programs.json';

let audioCtx = null;
let oscillator = null;
let timer = null;
let index = 0;

function playFrequency(freq) {
  stopSound();
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); 
  oscillator.connect(audioCtx.destination);
  oscillator.start();
}

function startProgram(program) {
  index = 0;
  const sliceDuration = (program.duration / program.frequencies.length) * 1000;

  playFrequency(program.frequencies[index]);

  timer = setInterval(() => {
    index++;
    if (index >= program.frequencies.length) {
      stopSound();
    } else {
      playFrequency(program.frequencies[index]);
    }
  }, sliceDuration);
}

function stopSound() {
  if (oscillator) oscillator.stop();
  if (audioCtx) audioCtx.close();
  oscillator = null;
  audioCtx = null;
  clearInterval(timer);
}
let programTimer: number | null = null

function startEnergyProgram() {
  stopFrequency()

  const sequence = [
    { freq: 174, duration: 5 * 60 * 1000 }, // 5 min
    { freq: 285, duration: 5 * 60 * 1000 }, // 5 min
    { freq: 528, duration: 5 * 60 * 1000 }  // 5 min
  ]

  let index = 0

  function playNext() {
    if (index >= sequence.length) {
      stopFrequency()
      status.value = 'Programme Énergie terminé'
      return
    }

    startFrequency(sequence[index].freq)
    status.value = `Énergie – ${sequence[index].freq} Hz`

    programTimer = window.setTimeout(() => {
      index++
      playNext()
    }, sequence[index].duration)
  }

  playNext()
}
function startStressProgram() {
  stopSound()
  status.value = 'Programme Stress / Anxiété en cours'

  const sequence = [396, 417, 432]
  let i = 0

  function playNext() {
    if (i >= sequence.length) {
      stopSound()
      status.value = 'Programme terminé'
      return
    }

    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    oscillator = audioCtx.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(sequence[i], audioCtx.currentTime)
    oscillator.connect(audioCtx.destination)
    oscillator.start()

    i++
    timer = setTimeout(() => {
      stopSound()
      playNext()
    }, 4 * 60 * 1000) // 4 minutes par fréquence
  }

  playNext()
}
// === PROGRAMME STRESS / ANXIÉTÉ (GRIMOIRE) ===
const stressProgram = [
  { freq: 396, duration: 16 * 60 }, // 16 min
  { freq: 417, duration: 14 * 60 }, // 14 min
  { freq: 432, duration: 12 * 60 }  // 12 min
]

let stressIndex = 0
let stressTimer: number | null = null

function startStressProgram() {
  stopSound()
  stressIndex = 0
  playStressStep()
}

function playStressStep() {
  if (stressIndex >= stressProgram.length) {
    stopSound()
    status.value = 'Programme Stress terminé'
    return
  }

  const step = stressProgram[stressIndex]
  playFrequency(step.freq)
  status.value = `Stress : ${step.freq} Hz`

  stressTimer = window.setTimeout(() => {
    stressIndex++
    playStressStep()
  }, step.duration * 1000)
}
import grimoire from '@/data/grimoire.json'

let runTimer: number | null = null
let runIndex = 0
let runSteps: { freq: number; durationMin: number }[] = []

function runProgram(key: string) {
  stopSound()
  runIndex = 0
  runSteps = grimoire[key].steps
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
  status.value = `${step.freq} Hz — ${step.durationMin} min`

  runTimer = window.setTimeout(() => {
    runIndex++
    playStep()
  }, step.durationMin * 60 * 1000)
}
import { ref } from 'vue'
import grimoire from '@/data/grimoire.json'

const timeLeft = ref(0)
const currentFreq = ref<number | null>(null)</

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
    currentFreq.value = null
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
<style scoped>
.stress-card {
  margin-top: 20px;
  padding: 16px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(180deg, #0b2c4d, #7ecbff);
}
</style>
