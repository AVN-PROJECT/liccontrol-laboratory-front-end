<template>
  <div class="profile__page-main">
    <div class="profile__page-base-info">
      <div class="profile__page-base-card-company">
        <h1 class="profile__page-base-card-text">
          <span>{{ userData.name.value }}</span>
        </h1>
      </div>
    </div>
    <div class="profile__page-info">
      <div class="profile__page-card-company">
        <h2>Сведения об организации:</h2>

        <div
          v-for="(fieldData, id) in userData"
          :key="id"
          class="profile__page-card-row"
        >
          <span class="profile__page-card-row-label">{{ fieldData.label }}</span>
          <span
            v-if="!isEditing"
            class="profile__page-card-row-field"
          >
            {{ fieldData.value }}
          </span>
          <VInput
            v-else
            v-model.trim="fieldData.value"
            type="text"
            color="white"
            size="little"
          />
        </div>

        <div class="profile__page-info-buttons">
          <VButton
            class="button__edit"
            @click="isEditing ? updateProfile() : (isEditing = true)"
          >
            {{ isEditing ? 'Сохранить' : 'Редактировать сведения об организации' }}
          </VButton>

          <VButton class="button__change-password">Сменить пароль</VButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { ref, onMounted, onBeforeMount, onBeforeUnmount } from 'vue';

  // composables.
  import apiClient from '@/composables/api/apiClient.js';

  // components.
  import VButton from '@/components/ui/VButton.vue';
  import VInput from '@/components/ui/VInput.vue';

  const userData = ref({
    name: { label: 'Наименование организации', value: '' },
    inn: { label: 'ИНН', value: '' },
    ogrn: {
      label: 'ОГРН',
      value: '',
    },
    legalAddress: {
      label: 'Юридический адрес',
      value: '',
    },
    firstName: {
      label: 'Имя руководителя организации',
      value: '',
    },
    lastName: {
      label: 'Фамилия руководителя организации',
      value: '',
    },
    middleName: {
      label: 'Отчество руководителя организации',
      value: '',
    },
    numberPhone: {
      label: 'Номер телефона',
      value: '',
    },
    email: {
      label: 'Адрес электронной почты',
      value: '',
    },
  });

  const isEditing = ref(false);

  onMounted(async () => {
    await getProfile();
  });

  onBeforeMount(() => {
    window.addEventListener('keydown', handlerEnter);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handlerEnter);
  });

  const getProfile = async () => {
    const response = await apiClient.get('/user/profile/get_profile');

    const data = await response.data;

    userData.value.name.value = data.name || '';
    userData.value.numberPhone.value = data.phone || '';
    userData.value.inn.value = data.inn || '';
    userData.value.ogrn.value = data.ogrn || '';
    userData.value.legalAddress.value = data.legal_address || '';
    userData.value.email.value = data.email || '';
    [
      userData.value.firstName.value,
      userData.value.lastName.value,
      userData.value.middleName.value,
    ] = data.fio?.split(' ') || ['', '', ''];
  };

  const updateProfile = async () => {
    try {
      const originalFields = userData.value;

      const { name, ...updatableFields } = originalFields;

      await apiClient.patch('/user/profile/edit_profile', {
        ogrn: updatableFields.ogrn.value,
        name: name.value,
        email: updatableFields.email.value,
        fio: `${updatableFields.firstName.value} ${updatableFields.lastName.value} ${updatableFields.middleName.value}`,
        legal_address: updatableFields.legalAddress.value,
        number_phone: updatableFields.numberPhone.value,
      });

      isEditing.value = false;

      await getProfile();
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  const handlerEnter = async (event) => {
    if (event.key === 'Enter' && isEditing) {
      await updateProfile();

      isEditing.value = false;
    }
  };
</script>

<style scoped lang="scss">
  .profile__page-main {
    display: flex;
    padding: 2vh;
    font-family: $font-family-base;

    .profile__page-base-info {
      width: 35%;

      .profile__page-base-card-company {
        width: 43%;
        height: 12rem;
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
          color: $color-black;
        }
      }
    }

    .profile__page-info {
      width: 65%;
      margin-top: 50px;
      padding: 24px 16px;
      border-radius: 5px;
      background: rgb(255 255 255 / 50%);
      box-shadow: 0 0 5px rgb(0 0 0 / 25%);

      .profile__page-card-company {
        .profile__page-info-buttons {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem;

          .button__change-password,
          .button__edit {
            border: 0;
            background: none;
            font-size: 1.3rem;
            color: rgb(25 118 210 / 80%);
            cursor: pointer;
          }
        }

        .profile__page-card-row {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          border-bottom: 1px solid $color-blue-light;

          .profile__page-card-row-label {
            width: 40%;
            margin-right: 25px;
            font-family: $font-family-base;
            font-size: 1rem;
            font-weight: bold;
            color: rgba($color-black, 0.6);
          }

          .profile__page-card-row-field {
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: $font-family-base;
            font-size: 1rem;
          }
        }
      }
    }
  }
</style>
