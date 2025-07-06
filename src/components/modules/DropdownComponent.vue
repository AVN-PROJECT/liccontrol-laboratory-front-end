<template>
  <div
    v-click-outside="handlerMouseDown"
    class="dropdown-menu"
  >
    <div
      class="buton-open"
      @click="isOpen = !isOpen"
    >
      <slot name="button-trigger" />
    </div>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="dropdown-menu-content"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
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

  function handlerMouseDown() {
    isOpen.value = false;
  }
</script>

<style scoped lang="scss">
  .dropdown-menu {
    width: 100%;
  }
</style>
