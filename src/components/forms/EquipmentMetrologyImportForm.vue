<template>
  <div class="equipment__form--import">
    <div class="form__buttons--close">
      <VButton
        class="button-close--icon"
        @click="emit('close-modal')"
      >
        <img
          class="buttons__close--icon"
          src="@/assets/icons/sections/buttons/cross-cancel.svg"
          alt="cross.svg"
        />
      </VButton>
    </div>
    <div class="form__fields">
      <label class="field__label--verification-number">
        <span class="label__verification-number--header">Номер свидетельства</span>
        <VInput
          v-model="newEquipmentImport.verification_number"
          class="label__verification-number--input"
          size="medium"
          type="text"
          color="white"
        />
      </label>
    </div>
    <div class="form__buttons">
      <VButton
        class="button__addition"
        @click="importEquipment"
      >
        <p class="buttons__addition--text">Добавить оборудование</p>
        <img
          class="buttons__addition--icon"
          src="@/assets/icons/sections/buttons/plus-addition.svg"
          alt="plus.svg"
        />
      </VButton>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { ref } from 'vue';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';
  import resetForm from '@/helpers/forms/resetForm.js';

  // constants.
  const emit = defineEmits(['equipment-import', 'close-modal']);

  const newEquipmentImport = ref({
    verification_number: '',
  });

  const importEquipment = async () => {
    emit('equipment-import', newEquipmentImport.value);

    resetForm(newEquipmentImport.value);
  };
</script>

<style scoped lang="scss">
  .equipment__form--import {
    display: flex;
    flex-direction: column;
    width: 55%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    gap: 1.5rem;

    .form__buttons--close {
      display: flex;
      justify-content: flex-end;

      .button-close--icon {
        border: none;
        background-color: inherit;
      }
    }

    .form__fields {
      .label__verification-number--input {
        margin-top: 0.5rem;
      }
    }

    .form__buttons {
      .button__addition {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-radius: 0.5rem;
        border: none;
        background-color: inherit;
        text-decoration: underline;
        font-size: 1.2rem;
        font-weight: bold;
        color: $color-blue-light;
        cursor: pointer;
        gap: 0.5rem;

        .buttons__addition--text {
          margin: 0;
        }

        .buttons__addition--icon {
          margin: 0.2rem;
        }
      }
    }
  }
</style>
