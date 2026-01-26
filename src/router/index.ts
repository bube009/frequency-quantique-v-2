import { createRouter, createWebHistory } from '@ionic/vue-router';

import Home from '../views/Home.vue';
import Grimoire from '../views/Grimoire.vue';
import HeartScan from '../views/HeartScan.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
  path: '/',
  redirect: '/home',
},
{
  path: '/home',
  component: () => import('../views/Home.vue'),
},
{
  path: '/pulse',
  component: () => import('../views/Pulse.vue'),
},
{
  path: '/sky',
  component: () => import('../views/SkyCamera.vue'),
}
