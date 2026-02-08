import { createRouter, createWebHistory } from '@ionic/vue-router'

import Home from '../views/Home.vue'
import Grimoire from '../views/Grimoire.vue'
import HeartScan from '../views/HeartScan.vue'
import Pulse from '../views/Pulse.vue'
import SkyCamera from '../views/SkyCamera.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/grimoire', component: Grimoire },
  { path: '/heart', component: HeartScan },
  { path: '/pulse', component: Pulse },
  { path: '/sky', component: SkyCamera }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
