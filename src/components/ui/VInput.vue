<template>
  <component
    :is="'input'"
    class="VInput"
    :v-model="model"
    :type="type"
    :placeholder="placeholder"
    v-bind="$attrs"
  ></component>
</template>

<script setup>
  defineProps({
    model: {
      type: String,
      default: 'input',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'number', 'email'].includes(value),
    },
  });
</script>

<style scoped lang="scss">
  .VInput {
    border-radius: 10px;
    border: 0;
    font-family: $font-family-base;
  }
</style>
