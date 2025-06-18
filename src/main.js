// import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import routerApp from '@/router/router.js';

const app = createApp(App);

app.use(routerApp);

app.mount('#app');
