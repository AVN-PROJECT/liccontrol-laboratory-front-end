<template>
  <div :class="['VSelect', classes]">
    <div class="preview__selected">
      <div class="selected__option">
        <p
          v-for="field in props.values"
          :key="field"
          class="selected__option--text"
        >
          {{ props.options[0][field] }}
        </p>
      </div>

      <VButton
        class="preview__button"
        @click="showOptions = !showOptions"
      >
        <img :src="showOptions ? triangleUpIcon : triangleDownIcon" />
      </VButton>
    </div>

    <template v-if="showOptions">
      <div class="options">
        <ul class="options__list">
          <template
            v-for="(option, index) in props.options"
            :key="index"
          >
            <li
              v-for="field in values"
              :key="field"
              class="list__item"
              @click="emit('select', option[props.uniqueKey])"
            >
              {{ option[field] }}
            </li>
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup>
  // vue.
  import { ref, computed } from 'vue';

  // components.
  import VButton from '@/components/ui/VButton.vue';
  import triangleUpIcon from '@/assets/icons/sections/legends/triangle-up.svg';
  import triangleDownIcon from '@/assets/icons/sections/legends/triangle-down.svg';

  // constants.
  const props = defineProps({
    options: {
      default: () => [],
      type: Array,
    },
    uniqueKey: {
      default: 'uuid',
      type: String,
    },
    values: {
      default: () => ['name'],
      type: Array,
    },
    color: {
      default: 'white',
      type: String,
      validator: (value) => ['white', 'black'].includes(value),
    },
  });

  const emit = defineEmits(['select']);

  const showOptions = ref(false);

  const classes = computed(() => {
    return {
      [`_${props.color}`]: props.color,
    };
  });
</script>

<style scoped lang="scss">
  .VSelect {
    .preview__selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem;
      gap: 0.4rem;
    }

    .preview__button {
      display: flex;
      align-items: center;
      height: 10%;
      border: none;
      background-color: inherit;
    }

    .selected__option--text {
      margin: 0.3rem;
    }

    .options {
      overflow-y: auto;
      height: 5rem;
      border-radius: 5px;
      background-color: $color-light;
      box-shadow: inset 0 0 4px 1px rgb(0 0 0 / 25%);

      .options__list {
        list-style: none;
      }
    }

    &._white {
      .preview__selected {
        border-radius: 5px;
        background-color: $color-light;
        box-shadow: inset 0 0 4px 1px rgb(0 0 0 / 25%);
      }
    }
  }
</style>
