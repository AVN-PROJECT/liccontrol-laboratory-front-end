<template>
  <div class="equipment__menu-addition-form">
    <div class="equipment__form-content-buttons-close">
      <VButton
        class="buttons__button-close"
        @click="emit('close-modal')"
      >
        <img
          class="buttons__close--icon"
          src="@/assets/icons/sections/buttons/cross-cancel.svg"
          alt="cross.svg"
        />
      </VButton>
    </div>

    <div class="equipment__form-content">
      <div class="equipment__form-content-buttons-columns">
        <div class="equipment__menu-addition-fields-column">
          <label for="equipment__page-form-field-name">
            <span class="form__label--text">Наименование оборудования</span>
            <VInput
              id="equipment__page-form-field-name"
              v-model="newEquipment.name"
              class="equipment__page-form-field"
              color="white"
              size="medium"
            />
          </label>

          <label for="equipment__page-form-field-verification-date">
            <span class="form__label--text">Дата начала поверки</span>
            <VInput
              id="equipment__page-form-field-verification-date"
              v-model="newEquipment.verification_date"
              class="equipment__page-form-field"
              color="white"
              size="medium"
              type="date"
            />
          </label>

          <label for="equipment__page-form-field-verification-valid">
            <span class="form__label--text">Дата окончания поверки</span>
            <VInput
              id="equipment__page-form-field-verification-valid"
              v-model="newEquipment.verification_valid"
              class="equipment__page-form-field"
              color="white"
              size="medium"
              type="date"
            />
          </label>

          <label for="equipment__page-form-field-verification-number">
            <span class="form__label--text">Номер свидетельства</span>
            <VInput
              id="equipment__page-form-field-verification-number"
              v-model="newEquipment.verification_number"
              class="equipment__page-form-field"
              color="white"
              size="medium"
            />
          </label>

          <label for="equipment__page-form-field-number-serial">
            <span class="form__label--text">Серийный номер</span>
            <VInput
              id="equipment__page-form-field-number-serial"
              v-model="newEquipment.number_serial"
              class="equipment__page-form-field"
              color="white"
              size="medium"
            />
          </label>
        </div>

        <div class="equipment__menu-addition-fields-column">
          <label for="equipment__page-form-field-verification-organization">
            <span class="form__label--text">Организация-поверитель</span>
            <VInput
              id="equipment__page-form-field-name"
              v-model="newEquipment.verification_organization"
              class="equipment__page-form-field"
              color="white"
              size="medium"
            />
          </label>

          <label for="equipment__page-form-field-type">
            <span class="form__label--text">Тип СИ</span>
            <VInput
              id="equipment__page-form-field-type"
              v-model="newEquipment.type"
              class="equipment__page-form-field"
              color="white"
              size="medium"
            />
          </label>

          <label for="equipment__page-form-field-organization-owner">
            <span class="form__label--text">Организация</span>
            <VInput
              id="equipment__page-form-field-organization-owner"
              v-model="newEquipment.organization_owner"
              class="equipment__page-form-field"
              color="white"
              size="medium"
            />
          </label>

          <label for="equipment__page-form-field-person">
            <span class="form__label--text">Ответственный сотрудник</span>
            <VInput
              id="equipment__page-form-field-person"
              v-model="newEquipment.person_id"
              class="equipment__page-form-field"
              color="white"
              size="medium"
            />
          </label>
        </div>
      </div>
    </div>

    <div class="equipment__menu-buttons">
      <VButton
        class="buttons__addition"
        @click="addEquipment"
      >
        <p class="equipment__page-menu-form-button-text">Добавить оборудование</p>
        <img
          class="equipment__page-menu-form-button-icon"
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
  const emit = defineEmits(['equipment-addition', 'close-modal']);

  const newEquipment = ref({
    name: '',
    number_serial: '',
    verification_number: '',
    verification_date: '',
    verification_valid: '',
    suitability: null,
    organization_owner: '',
    type: '',
    person_id: null,
    verification_organization: '',
  });

  const addEquipment = async () => {
    console.log(newEquipment.value.name);

    emit('equipment-addition', newEquipment.value);

    resetForm(newEquipment.value);
  };
</script>

<style scoped lang="scss">
  .equipment__menu-addition-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    gap: 1.5rem;

    .equipment__form-content {
      display: flex;
      gap: 1.5rem;
      width: 100%;

      .equipment__form-content-buttons-columns {
        display: flex;
        gap: 1rem;

        .equipment__menu-addition-fields-column {
          display: flex;
          flex: 1;
          gap: 1rem;
          flex-direction: column;
        }
      }
    }

    .equipment__form-content-buttons-close {
      display: flex;
      justify-content: flex-end;

      .buttons__button-close {
        border: none;
        background-color: inherit;
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
        font-size: 1.5rem;
        font-weight: bold;
        color: $color-blue-light;
        cursor: pointer;
        gap: 0.5rem;

        .equipment__page-menu-form-button-text {
          margin: 0;
        }

        .equipment__page-menu-form-button-icon {
          margin: 0.2rem;
        }
      }
    }
  }
</style>
