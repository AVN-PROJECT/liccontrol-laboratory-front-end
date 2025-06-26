import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/composables/apiClient';
import Cookies from 'js-cookies/src/cookies.js';

export const useUserStore = defineStore('user', () => {
  const loginEmail = ref('');
  const loginName = ref('');

  const setLoginEmail = (value) => {
    loginEmail.value = value;
  };

  const setLoginName = (value) => {
    loginName.value = value;
  };

  const getAccessToken = async () => {
    try {
      const response = await apiClient.post('/user/auth/token');

      if (response.status === 200) {
        const cookieOptions = {
          path: '/',
        };

        if (location.hostname !== 'localhost') {
          cookieOptions.domain = 'liccontrol.ru';
          cookieOptions.secure = true;
        }

        Cookies.setItem('accessToken', response.data.accessToken, cookieOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loginEmail,
    loginName,
    setLoginEmail,
    setLoginName,
    getAccessToken,
  };
});
