<template>
  <div class="equipment__menu-addition-form">
    <div class="equipment__menu-addition-fields-column">
      <label for="equipment__page-form-field-name">
        <span class="equipment__page-form-label">Наименование оборудования</span>
        <VInput
          id="equipment__page-form-field-name"
          v-model="newEquipment.name"
          class="equipment__page-form-field"
          placeholder="Фам"
          color="white"
          size="little"
        />
      </label>

      <label for="equipment__page-form-field-verification-date">
        <span class="equipment__page-form-label">Дата начала поверки</span>
        <VInput
          id="equipment__page-form-field-phone-number"
          v-model="newEquipment.verification_date"
          class="equipment__page-form-field"
          color="white"
          size="little"
          type="date"
        />
      </label>

      <label for="equipment__page-form-field-verification-valid">
        <span class="equipment__page-form-label">Дата окончания поверки</span>
        <VInput
          id="equipment__page-form-field-verification-valid"
          v-model="newEquipment.verification_valid"
          class="equipment__page-form-field"
          color="white"
          size="little"
        />
      </label>

      <label for="equipment__page-form-field-verification-number">
        <span class="equipment__page-form-label">Номер свидетельства</span>
        <VInput
          id="equipment__page-form-field-verification-number"
          v-model="newEquipment.verification_number"
          class="equipment__page-form-field"
          color="white"
          size="little"
          type="date"
        />
      </label>

      <label for="equipment__page-form-field-number-serial">
        <span class="equipment__page-form-label">Серийный номер</span>
        <VInput
          id="equipment__page-form-field-number-serial"
          v-model="newEquipment.number_serial"
          class="equipment__page-form-field"
          color="white"
          size="little"
          type="date"
        />
      </label>
    </div>

    <div class="equipment__menu-addition-fields-column">
      <label for="equipment__page-form-field-verification-organization">
        <span class="equipment__page-form-label">Организация-поверитель</span>
        <VInput
          id="equipment__page-form-field-name"
          v-model="newEquipment.verification_organization"
          class="equipment__page-form-field"
          placeholder="Фам"
          color="white"
          size="little"
        />
      </label>

      <label for="equipment__page-form-field-type">
        <span class="equipment__page-form-label">Тип СИ</span>
        <VInput
          id="equipment__page-form-field-type"
          v-model="newEquipment.type"
          class="equipment__page-form-field"
          color="white"
          size="little"
          type="date"
        />
      </label>

      <label for="equipment__page-form-field-organization-owner">
        <span class="equipment__page-form-label">Организация</span>
        <VInput
          id="equipment__page-form-field-organization-owner"
          v-model="newEquipment.organization_owner"
          class="equipment__page-form-field"
          color="white"
          size="little"
        />
      </label>

      <label for="equipment__page-form-field-person">
        <span class="equipment__page-form-label">Ответственный сотрудник</span>
        <VInput
          id="equipment__page-form-field-person"
          v-model="newEquipment.person_id"
          class="equipment__page-form-field"
          color="white"
          size="little"
          type="date"
        />
      </label>
    </div>

    <div class="equipment__menu-addition-buttons">
      <VButton
        class="equipment__page-menu-form-button-addition"
        @click="addEquipment"
      >
        <p>Добавить оборудование</p>
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
  // components.
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';

  // helpers.
  import resetForm from '@/helpers/forms/resetForm.js';

  // constants.
  const emit = defineEmits(['equipment-addition']);

  const newEquipment = {
    name: '',
    number_serial: '',
    verification_number: '',
    verification_date: '',
    verification_valid: '',
    suitability: '',
    organization_owner: '',
    type: '',
    person_id: '',
    verification_organization: '',
  };

  const addEquipment = async () => {
    emit('equipment-addition', newEquipment.value);

    resetForm(newEquipment.value);
  };
</script>

<style scoped lang="scss">
  .equipment__menu-addition-form {
    display: flex;
    width: 100%;
    padding: 1.3rem;
    border-radius: 0.5rem;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);

    .equipment__menu-addition-buttons {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      .equipment__page-menu-form-button-addition {
        display: flex;
        align-content: center;
        border: 0;
        background: inherit;
        text-decoration: underline;
        font-size: 1.3rem;
        font-weight: bold;
        color: $color-blue-light;
        cursor: pointer;

        .equipment__page-menu-form-button-icon {
          margin: 0.5rem;
        }
      }
    }
  }
</style>
