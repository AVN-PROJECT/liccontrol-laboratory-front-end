<template>
  <div class="profile__page-main">
    <div class="profile__page-base-info">
      <div class="profile__page-base-card-company">
        <h1 class="profile__page-base-card-text">
          <span>{{ formData.shortName }}</span>
        </h1>
      </div>
    </div>
    <div class="profile__page-info">
      <div class="profile__page-card-company">
        <h2>Сведения об организации:</h2>

        <div class="profile__page-card-row">
          <span class="profile__page-card-row-label">Сокращённое наименование:</span>
          <span class="profile__page-card-row-field">{{ formData.shortName }}</span>
        </div>

        <div class="profile__page-card-row">
          <span class="profile__page-card-row-label">ИНН:</span>
          <span class="profile__page-card-row-field">{{ formData.inn }}</span>
        </div>

        <div class="profile__page-card-row">
          <span class="profile__page-card-row-label">Юридический адрес:</span>
          <span class="profile__page-card-row-field">{{ formData.address }}</span>
        </div>
        <div class="profile__page-card-row">
          <span class="profile__page-card-row-label">Имя руководителя организации:</span>
          <span class="profile__page-card-row-field">{{ formData.firstName }}</span>
        </div>
        <div class="profile__page-card-row">
          <span class="profile__page-card-row-label">Фамилия руководителя организации:</span>
          <span class="profile__page-card-row-field">{{ formData.lastName }}</span>
        </div>

        <div class="profile__page-card-row">
          <span class="profile__page-card-row-label">Отчество руководителя организации:</span>
          <span class="profile__page-card-row-field">{{ formData.middleName }}</span>
        </div>

        <div class="profile__page-card-row">
          <span class="profile__page-card-row-label">Номер телефона:</span>
          <span class="profile__page-card-row-field">{{ formData.phone }}</span>
        </div>

        <div class="profile__page-card-row">
          <span class="profile__page-card-row-label">Адрес электронной почты:</span>
          <span class="profile__page-card-row-field">{{ formData.email }}</span>
        </div>
        <VButton class="edit-btn">Редактировать сведения об организации</VButton>
        <VButton
          type="button"
          class="edit-btn test"
        >
          Сменить пароль
        </VButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  // composables.
  import apiClient from '@/composables/apiClient.js';

  // components.
  import VButton from '@/components/ui/VButton.vue';

  const formData = ref({
    shortName: '',
    inn: '',
    address: '',
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    profileImage: '',
  });

  onMounted(async () => {
    const response = await apiClient.get('/user/profile/get_profile');

    const data = await response.data;

    formData.value = {
      shortName: data.name,
      inn: data.inn,
      address: data.legal_address ?? data.address ?? '',
      lastName: data.fio_of_leader?.split(' ')[0] ?? '',
      firstName: data.fio_of_leader?.split(' ')[1] ?? '',
      middleName: data.fio_of_leader?.split(' ')[2] ?? '',
      phone: data.phone_number ?? data.phone ?? '',
      email: data.email,
    };
  });
</script>

<style scoped lang="scss">
  .profile__page-main {
    display: flex;
    padding: 2vh;
    font-family: $font-family-base;
    flex-direction: row;

    .profile__page-base-info {
      width: 40%;

      .profile__page-base-card-company {
        width: 43%;
        height: 250px;
        padding: 18px 34px 29px 34px;
        border-radius: 5px;
        background: rgb(255 255 255 / 50%);
        text-align: center;
        box-shadow: 0 0 5px rgb(0 0 0 / 25%);

        .profile__page-base-card-text {
          align-items: center;
          text-align: center;
          text-transform: uppercase;
          font-family: $font-family-base;
          font-size: 2vw;
          color: $color-black;
        }
      }
    }

    .profile__page-info {
      width: 60%;
      margin-top: 50px;
      padding: 24px 16px;
      border-radius: 5px;
      background: rgb(255 255 255 / 50%);
      box-shadow: 0 0 5px rgb(0 0 0 / 25%);

      .profile__page-card-company {
        width: 80%;

        .profile__page-card-row {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          border-bottom: 1px solid #1976d2;

          .profile__page-card-row-label {
            width: 40%;
            margin-right: 25px;
            font-family: $font-family-base;
            font-size: 15px;
            font-weight: bold;
            color: rgba($color-black, 0.6);
          }

          .profile__page-card-row-field {
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: $font-family-base;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
