import { createRouter, createWebHistory } from '@ionic/vue-router'
import Home from '@/views/Home.vue'
import Pulse from '@/views/Pulse.vue'
import SkyCamera from '@/views/SkyCamera.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/pulse', component: Pulse },
    { path: '/sky', component: SkyCamera }
  ]
})
