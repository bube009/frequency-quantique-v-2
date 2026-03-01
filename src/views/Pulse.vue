<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>Pouls (Bio)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="bg">
      <div class="wrap">
        <div class="card">
          <div class="big">❤️ {{ bpm }} bpm</div>
          <div class="sub">Mode simulation (prêt pour capteur réel).</div>

          <ion-button expand="block" @click="start" :disabled="running">Démarrer mesure</ion-button>
          <ion-button expand="block" fill="outline" @click="stop" :disabled="!running">Arrêter</ion-button>

          <div class="line">
            ⚡ Détection : <strong>{{ status }}</strong>
          </div>

          <div class="suggest">
            Suggestion : <strong>{{ suggested }}</strong>
          </div>

          <ion-button expand="block" class="go" @click="goSession" :disabled="!suggestedId">
            Lancer la fréquence suggérée
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton
} from '@ionic/vue'
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { programs } from '@/data/programs'

const router = useRouter()

const bpm = ref(0)
const running = ref(false)
const status = ref('—')
const suggested = ref('—')
const suggestedId = ref<string>('')

let t: any = null

function pickSuggestion(b: number) {
  // logique simple (tu affineras)
  if (b < 55) return 'energie_vitale'
  if (b > 95) return 'calme'
  return 'stress_general'
}

function start() {
  running.value = true
  status.value = 'Mesure en cours'
  t = setInterval(() => {
    bpm.value = 60 + Math.floor(Math.random() * 35) // 60-94
    const id = pickSuggestion(bpm.value)
    suggestedId.value = id
    suggested.value = programs.find(p => p.id === id)?.title || '—'
    status.value = bpm.value > 92 ? 'Stress possible' : 'Stable'
  }, 900)
}

function stop() {
  running.value = false
  status.value = 'Arrêté'
  clearInterval(t)
  t = null
}

function goSession() {
  if (!suggestedId.value) return
  router.push({ path: '/session', query: { id: suggestedId.value } })
}

onBeforeUnmount(() => stop())
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
.big { font-size: 34px; font-weight: 900; margin-bottom: 6px; }
.sub { opacity: .8; margin-bottom: 14px; }
.line { margin-top: 14px; opacity: .95; }
.suggest { margin-top: 8px; opacity: .95; }
.go { margin-top: 10px; --border-radius: 14px; }
</style>
