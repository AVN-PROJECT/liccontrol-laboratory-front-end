<template>
  <div class="person__page-menu-addition-form">
    <div class="person__page-menu-form-fields">
      <label for="person__page-form-field-name">
        <span class="person__page-form-label">Укажите ФИО сотрудника</span>
        <VInput
          id="person__page-form-field-name"
          class="person__page-form-field"
          placeholder="Имя Фамилия Отчество"
          color="white"
          size="little"
        />
      </label>

      <label for="person__page-form-field-phone-number">
        <span class="person__page-form-label">Номер телефона</span>
        <VInput
          id="person__page-form-field-phone-number"
          class="person__page-form-field"
          color="white"
          size="little"
          type="tel"
        />
      </label>

      <label for="person__page-form-field-certificate-number">
        <span class="person__page-form-label">Номер аттестата</span>
        <VInput
          id="person__page-form-field-certificate-number"
          class="person__page-form-field"
          color="white"
          size="little"
        />
      </label>

      <label for="person__page-form-field-certificate-date">
        <span class="person__page-form-label">Дата аттестата</span>
        <VInput
          id="person__page-form-field-certificate-date"
          class="person__page-form-field"
          color="white"
          size="little"
          type="date"
        />
      </label>

      <label for="person__page-form-field-certificate-valid-date">
        <span class="person__page-form-label">Срока аттестации до</span>
        <VInput
          id="person__page-form-field-certificate-valid-date"
          class="person__page-form-field"
          color="white"
          size="little"
          type="date"
        />
      </label>
    </div>

    <div class="person__page-menu-form-button">
      <VButton class="person__page-menu-form-button-addition">
        <p>Добавить сотрудника</p>
        <img
          class="person__page-menu-form-button-icon"
          src="@/assets/icons/sections/buttons/plus-addition.svg"
          alt="plus.svg"
        />
      </VButton>
    </div>
  </div>
</template>

<script setup>
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';
</script>

<style scoped lang="scss">
  .person__page-menu-addition-form {
    display: flex;
    width: 85%;
    padding: 1.3rem;
    border-radius: 0.5rem;
    background-color: $color-light;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    flex-direction: column;

    .person__page-menu-form-fields {
      width: 85%;

      .person__page-form-field {
        margin: 0.2rem;
      }

      .person__page-form-label {
        font-size: 1.1rem;
      }
    }

    .person__page-menu-form-button {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      .person__page-menu-form-button-addition {
        display: flex;
        align-content: center;
        border: 0;
        background: inherit;
        text-decoration: underline;
        font-size: 1.3rem;
        font-weight: bold;
        color: $color-blue-light;
        cursor: pointer;

        .person__page-menu-form-button-icon {
          margin: 0.5rem;
        }
      }
    }
  }
</style>
