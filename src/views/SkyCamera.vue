<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>Vision du Ciel</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg">
      <div class="card">
        <h2>🌌 Caméra Quantique</h2>

        <video ref="video" autoplay playsinline></video>
        <canvas ref="canvas"></canvas>

        <ion-button expand="block" @click="startCamera">
          📷 Activer caméra
        </ion-button>

        <ion-button expand="block" @click="capture">
          🔁 Miroir + Contraste
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/vue'

const video = ref<HTMLVideoElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  })
  if (video.value) video.value.srcObject = stream
}

function capture() {
  if (!video.value || !canvas.value) return

  const ctx = canvas.value.getContext('2d')!
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight

  ctx.translate(canvas.value.width, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(video.value, 0, 0)

  const img = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height)
  for (let i = 0; i < img.data.length; i += 4) {
    img.data[i] *= 1.4
    img.data[i + 1] *= 1.4
    img.data[i + 2] *= 1.4
  }
  ctx.putImageData(img, 0, 0)
}
</script>

<style scoped>
.bg {
  --background: linear-gradient(180deg, #050d1a, #0a1f3a);
  padding: 16px;
}

.card {
  background: #0b2c4d;
  border-radius: 20px;
  padding: 16px;
  color: white;
}

video,
canvas {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 12px;
}
</style>
