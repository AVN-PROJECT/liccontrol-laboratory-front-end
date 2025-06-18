import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/base/main" as *;',
          api: 'modern-compiler',
        },
      },
    },
    define: {
      'process.env.BASE_URL': JSON.stringify(env.BASE_URL),

      ...Object.keys(env).reduce((acc, key) => {
        if (key.startsWith('VITE_')) {
          acc[`process.env.${key}`] = JSON.stringify(env[key]);
        }
        return acc;
      }, {}),
    },
  };
});
