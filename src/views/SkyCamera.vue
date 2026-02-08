<template>
  <ion-page>
    <ion-content class="bg">
      <h2>Vision du Ciel</h2>
      <video autoplay playsinline></video>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
onMounted(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  document.querySelector('video')!.srcObject = stream
})
</script>

<style scoped>
.bg {
  --background: black;
  color: white;
}
</style>
