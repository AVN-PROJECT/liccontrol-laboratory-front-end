<template>
  <component
    :is="tag"
    class="VButton"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script setup>
  defineProps({
    tag: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'a'].includes(value),
    },
  });

  defineEmits(['click']);
</script>

<style scoped lang="scss">
  .VButton {
    font-family: $font-family-base;
  }
</style>
