import { createApp } from 'vue';

import { createPinia } from 'pinia';

import routerApp from '@/router/router.js';

import App from './App.vue';

import '@/styles/base/global.scss';

const app = createApp(App);

const pinia = createPinia();

async function initialApp() {
  app.use(routerApp).use(pinia).mount('#app');

  console.log('VITE_ переменные. DEBUG:', {
    VITE_API_URL: process.env.VITE_API_URL,
    VITE_BASE_SERVER_URL: process.env.VITE_BASE_SERVER_URL,
  });
}

window.addEventListener('load', initialApp);
