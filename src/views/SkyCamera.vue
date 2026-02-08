<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Vision du ciel</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg">
      <video ref="video" autoplay playsinline></video>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const video = ref<HTMLVideoElement | null>(null)

onMounted(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  if (video.value) video.value.srcObject = stream
})
</script>

<style scoped>
.bg {
  background: black;
}
video {
  width: 100%;
  transform: scaleX(-1);
}
</style>
