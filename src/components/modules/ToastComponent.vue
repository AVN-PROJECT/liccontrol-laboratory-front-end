<template>
  <div :class="['toast__content', classes]">
    <template v-if="props.color === 'red'">
      <img
        class="toast__content--icon"
        src="@/assets/icons/sections/legends/exclamation-mark-red.svg"
        alt="exclamation-mark-red.svg"
      />
    </template>
    <p class="toast__content--text">{{ props.message }}</p>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    message: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'green',
      validator: (value) => ['green', 'red'].includes(value),
    },
  });

  const classes = computed(() => {
    return {
      [`_${props.color}`]: props.color,
    };
  });
</script>

<style scoped lang="scss">
  .toast__content {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-radius: 0.5rem;
    text-align: left;
    font-family: $font-family-base;
    font-size: 1.1rem;
    transition: border 0.3s ease-in-out;
    gap: 0.8rem;
    backdrop-filter: blur(0.5rem);
    box-shadow: 0 0 4px 1px rgb(0 0 0 / 25%);

    .toast__content--text {
      margin: 0;
    }

    &._green {
      background-color: rgba($color-green-light, 10%);
    }

    &._red {
      background-color: rgba($color-red-light, 10%);
    }
  }
</style>
