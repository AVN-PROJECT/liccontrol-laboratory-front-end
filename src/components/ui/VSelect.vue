<template>
  <div :class="['VSelect', classes]">
    <div
      class="preview__selected"
      @click="showOptions = !showOptions"
    >
      <div class="selected__option">
        <p class="selected__option--text">{{ props.placeholder }}</p>
      </div>

      <VButton class="preview__button">
        <img :src="showOptions ? triangleUpIcon : triangleDownIcon" />
      </VButton>
    </div>

    <template v-if="showOptions">
      <div class="options">
        <ul class="options__list">
          <template
            v-for="(option, index) in props.options.slice(1)"
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
    placeholder: {
      default: '',
      type: String,
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
    margin-bottom: 0.5rem;

    .preview__selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 0.7rem;
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
      margin: 0.4rem;
      text-align: center;
      font-size: 1rem;
      color: rgba($color-black, 60%);
    }

    .options {
      overflow-y: auto;
      height: 5rem;

      .options__list {
        display: flex;
        align-items: flex-start;
        justify-content: left;
        margin: 0;
        padding-left: 1rem;
        list-style: none;
        flex-direction: column;
      }

      &::-webkit-scrollbar {
        position: absolute;
        right: 0.5rem;
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        height: 1rem;
        border-radius: 3px;
        background-color: $color-blue-light;
      }
    }

    &._white {
      border-radius: 5px;
      background-color: $color-light;
      box-shadow: inset 0 0 4px 1px rgb(0 0 0 / 25%);
    }
  }
</style>
