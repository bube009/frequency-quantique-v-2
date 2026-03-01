<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>{{ prog?.title || 'Session' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen :scroll-y="true" class="bg">
      <div class="wrap">
        <div class="bigCard">
          <div class="title">{{ prog?.title }}</div>
          <div class="meta">{{ prog?.freq }} Hz • {{ prog?.min }} min</div>

          <div class="waveRow">
            <Waveform :playing="playing" />
          </div>

          <div class="bioRow">
            ❤️ Pouls : <strong>{{ bpm }}</strong> bpm
            <span class="sep">|</span>
            ⚡ État : <strong>{{ state }}</strong>
          </div>

          <div class="btnRow">
            <ion-button expand="block" class="btn" @click="start" :disabled="playing">
              Démarrer
            </ion-button>
            <ion-button expand="block" fill="outline" class="btn2" @click="stop" :disabled="!playing">
              Arrêter
            </ion-button>
          </div>

          <div class="hint">
            Le son démarre seulement après un clic (règle iOS).
          </div>
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
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import Waveform from '@/components/Waveform.vue'
import { programs } from '@/data/programs'
import { playFrequency, stopFrequency } from '@/services/audio'

const route = useRoute()
const id = computed(() => String(route.query.id || ''))
const prog = computed(() => programs.find(p => p.id === id.value))

const playing = ref(false)

// Placeholder “bio” (structure prête)
const bpm = ref(0)
const state = ref('—')

async function start() {
  if (!prog.value) return
  await playFrequency(prog.value.freq, 0.12)
  playing.value = true
  // simulation simple (tu remplaceras par un vrai capteur plus tard)
  bpm.value = 72
  state.value = 'Stable'
}

function stop() {
  stopFrequency()
  playing.value = false
}

onBeforeUnmount(() => stop())
</script>

<style scoped>
.bg {
  --background: radial-gradient(1200px 700px at 20% 10%, #123a7a 0%, #071a33 55%, #050f1f 100%);
}
.wrap { padding: 16px; }

.bigCard{
  padding: 20px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(10,40,85,0.96), rgba(30,110,195,0.35));
  box-shadow: 0 18px 50px rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.08);
  color: white;
}
.title { font-size: 30px; font-weight: 900; }
.meta { margin-top: 10px; opacity: .9; font-size: 16px; }
.waveRow { margin-top: 18px; }
.bioRow { margin-top: 14px; opacity: .95; }
.sep { margin: 0 10px; opacity: .65; }

.btnRow { margin-top: 18px; display: grid; gap: 10px; }
.btn { --border-radius: 14px; }
.btn2 { --border-radius: 14px; }

.hint { margin-top: 12px; opacity: .7; font-size: 13px; }
</style>
