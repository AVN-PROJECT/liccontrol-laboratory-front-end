<template>
  <input
    v-bind="$attrs"
    ref="inputElement"
    :class="['VInput', classes]"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    @input="handleInput"
    @paste="handlePaste"
    @keydown="handleKeydown"
  />
</template>

<script setup>
  import { computed, ref } from 'vue';

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

  const inputElement = ref(null);

  const emit = defineEmits(['update:modelValue', 'update', 'paste', 'keydown', 'input']);

  defineExpose({
    focus: () => inputElement.value.focus(),
  });

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
    emit('input', event);
  };

  const handlePaste = (event) => {
    emit('paste', event);
  };

  const handleKeydown = (event) => {
    emit('keydown', event);
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
