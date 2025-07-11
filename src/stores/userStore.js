import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/composables/api/apiClient.js';
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
          cookieOptions.domain = 'laboratory.liccontrol.ru';
          cookieOptions.secure = true;
        }

        Cookies.setItem('accessToken', response.data.accessToken, cookieOptions);

        return response.data.accessToken;
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
