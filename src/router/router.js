import { createRouter, createWebHistory } from 'vue-router';

import Cookies from 'js-cookies/src/cookies.js';

import { useUserStore } from '@/stores/userStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: { authentication: true },
      children: [
        {
          path: '/profile',
          meta: { authentication: true },
          component: () => import('@/views/ProfileView.vue'),
        },
        {
          path: '/person',
          meta: { authentication: true },
          component: () => import('@/views/PersonView.vue'),
        },
        {
          path: '/equipment/metrology/equipments',
          meta: { authentication: true },
          component: () => import('@/views/EquipmentMetrologyView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  const access_token = Cookies.getItem('accessToken');

  if (to.matched.some((record) => record.meta.authentication)) {
    if (access_token) {
      return next();
    } else if (!access_token) {
      await userStore.preLoginUserStatus();

      return next();
    }
  } else {
    return next();
  }
});

export default router;
