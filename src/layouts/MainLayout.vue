<template>
  <div class="main__layout-base">
    <HeaderComponent />

    <main class="main__layout-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
  import HeaderComponent from '@/components/modules/HeaderComponent.vue';
</script>

<style scoped>
  /* styles go here */
</style>
