import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Pulse from '../views/Pulse.vue'
import SkyCamera from '../views/SkyCamera.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pulse', component: Pulse },
  { path: '/camera', component: SkyCamera }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
