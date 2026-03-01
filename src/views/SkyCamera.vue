<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>Caméra du Ciel</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="bg">
      <div class="wrap">
        <div class="card">
          <ion-button expand="block" @click="take">Prendre une photo</ion-button>

          <div v-if="img" class="controls">
            <ion-item lines="none">
              <ion-label>Miroir</ion-label>
              <ion-toggle v-model="mirror" />
            </ion-item>

            <ion-item lines="none">
              <ion-label>Inverser</ion-label>
              <ion-toggle v-model="invert" />
            </ion-item>

            <ion-item>
              <ion-label>Contraste</ion-label>
              <ion-range v-model="contrast" min="80" max="200" />
            </ion-item>
          </div>

          <div class="preview" v-if="img">
            <canvas ref="canvasRef"></canvas>
          </div>

          <div class="hint">
            Effets appliqués localement via canvas (miroir / inversion / contraste).
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
  IonItem, IonLabel, IonToggle, IonRange
} from '@ionic/vue'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { nextTick, ref, watch } from 'vue'

const img = ref<string>('')
const mirror = ref(true)
const invert = ref(false)
const contrast = ref(130)

const canvasRef = ref<HTMLCanvasElement | null>(null)

async function take() {
  const photo = await Camera.getPhoto({
    quality: 85,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera,
  })
  img.value = photo.dataUrl || ''
  await nextTick()
  render()
}

function render() {
  if (!img.value || !canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')!
  const im = new Image()
  im.onload = () => {
    canvas.width = im.width
    canvas.height = im.height

    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // contrast + invert via filter
    const c = contrast.value / 100
    const inv = invert.value ? 1 : 0
    ctx.filter = `contrast(${c}) invert(${inv})`

    if (mirror.value) {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(im, 0, 0)
    ctx.restore()
  }
  im.src = img.value
}

watch([img, mirror, invert, contrast], () => render())
</script>

<style scoped>
.bg { --background: radial-gradient(1200px 700px at 20% 10%, #123a7a 0%, #071a33 55%, #050f1f 100%); }
.wrap { padding: 16px; }
.card{
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(10,40,85,0.96), rgba(30,110,195,0.35));
  box-shadow: 0 18px 50px rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.08);
  color: white;
}
.preview {
  margin-top: 14px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.12);
}
canvas { width: 100%; height: auto; display: block; }
.controls { margin-top: 10px; }
.hint { margin-top: 12px; opacity: .7; font-size: 13px; }
</style>
