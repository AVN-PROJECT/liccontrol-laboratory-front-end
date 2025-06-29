<template>
  <div class="person__page-menu-addition-form">
    <VInput
      class="person__page-form-field"
      placeholder="Имя Фамилия Отчество"
    />
    <VInput class="person__page-form-field" />
    <VInput class="person__page-form-field" />
    <VInput class="person__page-form-field" />
    <VInput class="person__page-form-field" />
  </div>
</template>

<script setup>
  import VInput from '@/components/ui/VInput.vue';
</script>

<style scoped lang="scss">
  /* styles go here */
</style>
