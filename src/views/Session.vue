<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>Session</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <h1>Programme {{ id }}</h1>
      <p>Page session active.</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from '@ionic/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
