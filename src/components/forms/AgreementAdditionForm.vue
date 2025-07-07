<template>
  <div class="agreement__form--addition">
    <div class="form__buttons--close">
      <VButton
        class="form__button--close"
        @click="emit('close-modal')"
      >
        <img
          src="@/assets/icons/sections/buttons/cross-cancel.svg"
          alt="cross-close.svg"
          class="form__button--icon"
        />
      </VButton>
    </div>

    <div class="form__columns">
      <div class="form__column">
        <label>
          <VInput />
        </label>
      </div>
      <div class="form__column">
        <label>
          <VInput />
        </label>
      </div>
    </div>

    <div class="form__buttons">
      <VButton
        class="form__button--addition"
        @click="addAgreement"
      >
        Добавить договор
        <img
          src="@/assets/icons/sections/buttons/plus-addition.svg"
          alt="plus-addition.svg"
          class="button__addition--icon"
        />
      </VButton>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { ref } from 'vue';
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';
  import resetForm from '@/helpers/forms/resetForm.js';

  // constants

  // const props = defineProps({
  //   persons: {
  //     default: () => [],
  //     type: Array,
  //   },
  // });

  const emit = defineEmits(['agreement-addition', 'close-modal']);

  const newAgreement = ref({
    agreement_number: '',
    agreement_start_date: '',
    agreement_final_date: '',
    addresses: [],
    persons: [],
    equipments: [],
    types_of_work: [],
  });

  const addAgreement = () => {
    emit('agreement-addition', newAgreement.value);

    resetForm(newAgreement.value);
  };
</script>

<style scoped lang="scss">
  .agreement__form--addition {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    backdrop-filter: blur(5px);
    gap: 1.5rem;
  }
</style>
