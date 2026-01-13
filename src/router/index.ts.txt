import { createRouter, createWebHistory } from '@ionic/vue-router';

import Home from '../views/Home.vue';
import Grimoire from '../views/Grimoire.vue';
import HeartScan from '../views/HeartScan.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/grimoire', component: Grimoire },
    { path: '/heart', component: HeartScan }
  ]
});