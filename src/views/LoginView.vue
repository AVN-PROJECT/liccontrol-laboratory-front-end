<template>
  <LoginLayout>
    <component
      :is="componentForm"
      :key="formKey"
    />
  </LoginLayout>
</template>

<script setup>
  import { computed, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUiUxStore } from '@/stores/uiuxStore.js';

  import LoginLayout from '@/layouts/LoginLayout.vue';
  import LoginForm from '@/components/forms/LoginForm.vue';
  import LoginConfirmForm from '@/components/forms/LoginConfirmForm.vue';

  const { currentForm } = storeToRefs(useUiUxStore());

  const componentsMap = {
    LoginForm,
    LoginConfirmForm,
  };

  const componentForm = computed(() => {
    return componentsMap[currentForm.value] ?? LoginForm;
  });

  const formKey = ref(Date.now());

  watch(currentForm, () => {
    formKey.value = Date.now();
  });
</script>

<style scoped lang="scss">
  /* styles go here */
</style>
