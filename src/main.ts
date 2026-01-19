tsimport ; createApp ; 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';
import '@ionic/vue/css/core.css';
import './theme/variables.css';

createApp(App)
  .use(IonicVue)
  .use(router)
  .mount('#app');
