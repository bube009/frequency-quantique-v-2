<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1>Frequency Quantique v2</h1>

      <p><strong>Status :</strong> {{ status }}</p>

      <div
        v-for="(prog, key) in grimoire"
        :key="key"
        class="program-card"
      >
        <h2>{{ prog.label }}</h2>
        <p>⏱️ {{ prog.minutes }} min — 🎵 {{ prog.freq }} Hz</p>

        <ion-button
          expand="block"
          color="primary"
          @click="startProgram(prog)"
        >
          ▶ Démarrer
        </ion-button>

        <ion-button
          expand="block"
          color="medium"
          @click="stopProgram"
        >
          ⏹ Arrêter
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import grimoire from '../data/grimoire.json'

const status = ref('Fréquence arrêtée')
let timer: number | null = null

function startProgram(prog: any) {
  stopProgram()
  status.value = `${prog.freq} Hz — ${prog.minutes} min`
  timer = window.setTimeout(() => {
    stopProgram()
  }, prog.minutes * 60 * 1000)
}

function stopProgram() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  status.value = 'Fréquence arrêtée'
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
