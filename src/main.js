import { createApp } from 'vue';

import { createPinia } from 'pinia';

import routerApp from '@/router/router.js';

import App from './App.vue';

import '@/styles/base/global.scss';

const app = createApp(App);

const pinia = createPinia();

async function initialApp() {
  app.use(routerApp).use(pinia).mount('#app');
}

window.addEventListener('load', initialApp);
