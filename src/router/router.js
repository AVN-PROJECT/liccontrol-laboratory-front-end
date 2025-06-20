import { createRouter, createWebHistory } from 'vue-router';

import Cookies from 'js-cookies/src/cookies.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: () => import('@/views/MainView.vue'),
      meta: { authentication: true },
      children: [
        {
          path: '/profile',
          meta: { authentication: true },
          component: () => import(''),
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
  const refresh_token = Cookies.getItem('refreshToken');
  const access_token = Cookies.getItem('accessToken');

  if (to.matched.some((record) => record.meta.authentication)) {
    if (!refresh_token && !access_token) {
      return next('/login');
    } else if (!access_token && refresh_token) {
      return next();
    } else {
      return next();
    }
  } else {
    return next();
  }
});

export default router;
