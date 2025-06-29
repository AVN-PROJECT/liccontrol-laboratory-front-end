import { createApp } from 'vue';

import { createPinia } from 'pinia';

import routerApp from '@/router/router.js';

import App from './App.vue';

import '@/styles/base/global.scss';

import onClickOutside from '@/composables/directives/onClickOutside.js';

const app = createApp(App);

const pinia = createPinia();

async function initialApp() {
  app.use(routerApp).use(pinia).mount('#app');

  app.directive('click-outside', onClickOutside);
}

window.addEventListener('load', initialApp);
