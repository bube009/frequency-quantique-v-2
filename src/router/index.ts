import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Session from '@/views/Session.vue'
import Pulse from '@/views/Pulse.vue'
import SkyCamera from '@/views/SkyCamera.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/session', component: Session },
  { path: '/pulse', component: Pulse },
  { path: '/sky', component: SkyCamera }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
