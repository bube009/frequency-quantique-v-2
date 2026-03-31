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
      <div class="hero">
        <div class="program-title">{{ program.title }}</div>
        <div class="program-meta">{{ program.freq }} Hz • {{ program.category }}</div>
      </div>

      <div class="wave"></div>

      <div class="panel">
        <div class="label">Statut</div>
        <div class="value">{{ status }}</div>
      </div>

      <div class="panel">
        <div class="label">Temps restant</div>
        <div class="value">{{ timeLeft }} s</div>
      </div>

      <div class="actions">
        <ion-button expand="block" size="large" @click="startSession">
          Start
        </ion-button>

        <ion-button expand="block" size="large" fill="outline" color="medium" @click="stopSession">
          Stop
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton
} from '@ionic/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)

const allPrograms = [
  { id: 1, title: 'Relaxation', freq: 432, category: 'Bien-être', duration: 60 },
  { id: 2, title: 'Sommeil', freq: 528, category: 'Repos', duration: 90 },
  { id: 3, title: 'Énergie', freq: 741, category: 'Vitalité', duration: 45 }
]

const program =
  allPrograms.find((p) => p.id === id) ||
  { id: 0, title: 'Programme inconnu', freq: 0, category: 'N/A', duration: 0 }

const status = ref('Fréquence arrêtée')
const timeLeft = ref(program.duration)
let timer: number | null = null

function startSession() {
  stopSession()
  status.value = `Lecture ${program.freq} Hz`
  timeLeft.value = program.duration

  timer = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1
    } else {
      stopSession()
    }
  }, 1000)
}

function stopSession() {
  status.value = 'Fréquence arrêtée'
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

onBeforeUnmount(() => {
  stopSession()
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #0a2a5a, #123d85);
  color: white;
  padding: 22px;
  border-radius: 22px;
  margin-bottom: 18px;
}

.program-title {
  font-size: 28px;
  font-weight: 800;
}

.program-meta {
  margin-top: 8px;
  font-size: 16px;
  opacity: 0.85;
}

.wave {
  height: 120px;
  border-radius: 20px;
  margin-bottom: 18px;
  background:
    radial-gradient(circle at center, rgba(79, 195, 247, 0.95), rgba(79, 195, 247, 0.18) 35%, transparent 70%),
    linear-gradient(135deg, #0a2a5a, #123d85);
}

.panel {
  padding: 18px;
  border-radius: 18px;
  background: rgba(10, 42, 90, 0.08);
  margin-bottom: 14px;
}

.label {
  font-size: 13px;
  opacity: 0.65;
  margin-bottom: 6px;
}

.value {
  font-size: 22px;
  font-weight: 700;
}

.actions {
  margin-top: 24px;
  display: grid;
  gap: 12px;
}
</style>
