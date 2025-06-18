import { defineStore } from 'pinia';

import { ref } from 'vue';

export const useUiUxStore = defineStore('uiux', () => {
  const currentForm = ref('LoginFormComponent');

  const setCurrentForm = name => {
    currentForm.value = name;
  };

  return {
    setCurrentForm,
    currentForm,
  };
});
