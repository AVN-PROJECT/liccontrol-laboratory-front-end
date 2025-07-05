<template>
  <p class="equipment__page-menu-form-description">
    Добавить нового сотрудника вручную можно в форме ниже:
  </p>

  <div class="equipment__menu-addition-form">
    <div class="form__column">
      <label for="form__label">
        <span class="form__label--text">Наименование оборудования</span>
        <VInput
          id="form__label"
          v-model="newEquipment.name"
          class="form__label--input"
          color="white"
          size="medium"
        />
      </label>

      <label for="form__label">
        <span class="form__label--text">Серийный номер</span>
        <VInput
          id="form__label"
          v-model="newEquipment.number_serial"
          class="form__label--input"
          color="white"
          size="medium"
        />
      </label>

      <label for="form__label">
        <span class="form__label--text">Ответственный сотрудник</span>
        <VInput
          id="form__label"
          v-model="newEquipment.person_id"
          class="form__label--input"
          color="white"
          size="medium"
        />
      </label>

      <label for="form__label">
        <span class="form__label--text">Номер свидетельства (при наличии)</span>
        <VInput
          id="form__label"
          v-model="newEquipment.verification_number"
          class="form__label--input"
          color="white"
          size="medium"
        />
      </label>
    </div>

    <div class="equipment__menu-buttons">
      <VButton
        class="buttons__addition"
        @click="addEquipment"
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

  // helpers.
  import resetForm from '@/helpers/forms/resetForm.js';

  // constants.
  const emit = defineEmits(['equipment-addition']);

  const newEquipment = ref({
    name: '',
    number_serial: '',
    person_id: null,
    verification_number: '',
  });

  const addEquipment = async () => {
    emit('equipment-addition', newEquipment.value);

    resetForm(newEquipment.value);
  };
</script>

<style scoped lang="scss">
  .equipment__page-menu-form-description {
    text-align: center;
  }

  .equipment__menu-addition-form {
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: $color-light;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    gap: 1.5rem;

    .form__column {
      display: flex;
      width: 85%;
      flex-direction: column;

      .form__label--input {
        margin-bottom: 1rem;
      }
    }

    .equipment__menu-buttons {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-top: auto;

      .buttons__addition {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-radius: 0.5rem;
        border: none;
        background-color: inherit;
        text-decoration: underline;
        font-size: 1.3rem;
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
