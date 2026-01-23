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
