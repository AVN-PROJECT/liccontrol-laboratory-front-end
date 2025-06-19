<template>
    <component
        :is="tag"
        class="VButton"
        @click="$emit('click')"
    >
      <slot></slot>
    </component>
</template>

<script setup>
  defineProps({
      tag: {
          type: String,
          default: 'button',
          validator: value => ['button', 'a'].includes(value),
      },

    })
</script>

<style scoped></style>
