import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/composables/apiClient';

export const useUserStore = defineStore('user', () => {
  const loginEmail = ref('');
  const loginName = ref('');

  const setLoginEmail = (value) => {
    loginEmail.value = value;
  };

  const setLoginName = (value) => {
    loginName.value = value;
  };

  const preLoginUserStatus = async () => {
    try {
      console.log('Привет!');
      const response = await apiClient.post('/user/auth/token');

      if (response.status === 200) {
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
    preLoginUserStatus,
  };
});
