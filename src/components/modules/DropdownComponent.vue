<template>
  <div
    class="header__menu-buton-open"
    @click="isOpen = !isOpen"
  >
    <slot name="button-trigger" />
  </div>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="dropdown-menu"
    >
      <slot name="content" />
    </div>
  </transition>
</template>

<script setup>
  import { ref, onBeforeMount, onBeforeUnmount } from 'vue';

  const isOpen = ref(false);

  onBeforeMount(() => {
    window.addEventListener('keydown', handlerEscape);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handlerEscape);
  });

  const handlerEscape = (event) => {
    if (event.key === 'Escape' && isOpen) {
      isOpen.value = false;
    }
  };
</script>

<style scoped lang="scss">
  /* styles go here */
</style>
