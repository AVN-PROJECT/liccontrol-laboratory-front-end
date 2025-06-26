import { createRouter, createWebHistory } from 'vue-router';

import Cookies from 'js-cookies/src/cookies.js';

import { useUserStore } from '@/stores/userStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/user/profile',
      children: [
        {
          path: 'user',
          component: () => import('@/layouts/MainLayout.vue'),
          meta: { authentication: true },
          children: [
            {
              path: 'profile',
              component: () => import('@/views/ProfileView.vue'),
            },
            {
              path: 'person',
              component: () => import('@/views/PersonView.vue'),
            },
            {
              path: 'equipment/metrology/equipments',
              component: () => import('@/views/EquipmentMetrologyView.vue'),
            },
            {
              path: 'equipment/personal/equipments',
              component: () => import('@/views/EquipmentPersonalView.vue'),
            },
          ],
        },

        {
          path: 'auth',
          children: [
            {
              path: 'login',
              component: () => import('@/views/LoginView.vue'),
            },
          ],
        },
      ],
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
      if (await userStore.getAccessToken()) {
        return next();
      }

      return next('/auth/login');
    }
  } else {
    return next();
  }
});

export default router;
