<template>
  <input
    :class="['VInput', classes]"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
  import { computed } from 'vue';

  const prop = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'password', 'email'].includes(value),
    },
    color: {
      type: String,
      default: 'grey',
      validator: (value) => ['grey'].includes(value),
    },
    error: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['medium'].includes(value),
    },
  });

  defineEmits(['input', 'update:modelValue']);

  const classes = computed(() => {
    console.log(prop.error);

    return {
      [`_${prop.color}`]: prop.color,
      [`_${prop.size}`]: prop.size,
      ['_error']: prop.error,
    };
  });
</script>

<style scoped lang="scss">
  .VInput {
    font-family: $font-family-base;

    &._grey {
      border-radius: 10px;
      border: 0;
      background-color: $color-white-grey;
    }

    &._medium {
      padding: 1.9% 3.3%;
    }

    &._error {
      border: 1px solid $color-red;
    }
  }
</style>
