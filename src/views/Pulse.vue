<template>
  <ion-page>
    <ion-content class="bg">
      <h2>Pouls</h2>
      <p>BPM détecté : {{ bpm }}</p>
      <p>Suggestion : {{ suggestion }}</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pulseService from '../services/pulse'

const bpm = ref(72)
const suggestion = ref(
  suggestFrequency(bpm.value).label
)
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #081a2f, #0e3a66);
  color: white;
  text-align: center;
}
</style>
