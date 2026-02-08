import { createRouter, createWebHistory } from '@ionic/vue-router'

import Home from '@/views/Home.vue'
import Pulse from '@/views/Pulse.vue'
import SkyCamera from '@/views/SkyCamera.vue'
import HeartScan from '@/views/HeartScan.vue'
import Grimoire from '@/views/Grimoire.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/pulse',
    component: Pulse,
  },
  {
    path: '/sky',
    component: SkyCamera,
  },
  {
    path: '/heart',
    component: HeartScan,
  },
  {
    path: '/grimoire',
    component: Grimoire,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
