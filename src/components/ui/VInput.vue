<template>
  <input
    v-bind="$attrs"
    ref="inputElement"
    :class="['VInput', classes]"
    :value="modelValue"
    :type="type"
    :maxlength="maxlength"
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
    mask: {
      default: null,
      type: Function,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'password', 'email', 'date', 'tel'].includes(value),
    },
    color: {
      type: String,
      default: 'grey-white',
      validator: (value) => ['grey', 'grey-white', 'white'].includes(value),
    },
    error: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['little', 'medium'].includes(value),
    },
  });

  const inputElement = ref(null);

  const emit = defineEmits(['update:modelValue', 'update', 'paste', 'keydown', 'input']);

  defineExpose({
    focus: () => inputElement.value.focus(),
  });

  const classes = computed(() => {
    return {
      [`_${prop.color}`]: prop.color,
      [`_${prop.size}`]: prop.size,
      ['_error']: prop.error,
    };
  });

  const handleInput = (event) => {
    if (prop.mask) {
      emit('update:modelValue', prop.mask(event.target.value));
    } else {
      emit('update:modelValue', event.target.value);
    }

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

    &._grey-white {
      border-radius: 10px;
      border: 0;
      background-color: $color-white-grey;
    }

    &._little {
      padding: 8px;
      font-size: 16px;
    }

    &._white {
      width: 100%;
      border-radius: 5px;
      border: none;
      background: $color-light;
      font-size: 16px;
      box-shadow: inset 0 0 4px 1px rgb(0 0 0 / 25%);
    }
  }
</style>
