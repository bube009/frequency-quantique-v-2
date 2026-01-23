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
</script>
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
