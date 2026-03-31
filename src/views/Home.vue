<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Frequency Quantique v2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <div class="wrap">
        <h1>Application prête</h1>
        <p>Si tu vois cet écran, la page blanche est réglée.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/vue'
</script>

<style scoped>
.wrap {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 800;
}

p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  opacity: 0.85;
}
</style>
