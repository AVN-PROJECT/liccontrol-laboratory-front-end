<template>
  <input
    :class="['VInput', classes]"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    v-bind="$attrs"
    @input="handleInput"
    @paste="$emit('paste', $event)"
    @keydown="$emit('keydown', $event)"
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
      default: 'white',
      validator: (value) => ['grey', 'white'].includes(value),
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

  const emit = defineEmits(['update:modelValue', 'update', 'paste', 'keydown']);

  const classes = computed(() => {
    console.log(prop.error);

    return {
      [`_${prop.color}`]: prop.color,
      [`_${prop.size}`]: prop.size,
      ['_error']: prop.error,
    };
  });

  const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
    emit('update');
  };
</script>

<style scoped lang="scss">
  .VInput {
    font-family: $font-family-base;
    transition: border 0.3s ease-in-out;

    &._grey {
      border-radius: 10px;
      border: 1px solid $color-white-grey;
      background-color: $color-white-grey;
    }

    &._medium {
      padding: 1.9% 3.3%;
    }

    &._error {
      border: 1px solid $color-red;
    }

    &._white {
      border-radius: 10px;
      border: 0;
      background-color: #d9d9d9;
    }
  }
</style>
