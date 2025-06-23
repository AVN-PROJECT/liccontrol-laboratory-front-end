<template>
  <div class="profile__page-main">
    <div class="profile__page-base-info">
      <div class="profile__page-base-card-company">
        <h1 class="profile__page-base-card-text">
          <span>{{ userData[0].value }}</span>
        </h1>
      </div>
    </div>
    <div class="profile__page-info">
      <div class="profile__page-card-company">
        <h2>Сведения об организации:</h2>

        <div
          v-for="(fieldData, index) in userData"
          :key="index"
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

        <VButton
          class="profile__page-info-edit"
          @click="isEditing ? handleSubmit() : (isEditing = true)"
        >
          {{ isEditing ? 'Сохранить' : 'Редактировать сведения об организации' }}
        </VButton>
        <VButton
          type="button"
          class=""
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
  import VInput from '@/components/ui/VInput.vue';

  const userData = ref([
    { label: 'Наименование организации', value: '' },
    { label: 'ИНН', value: '' },
    { label: 'ОГРН', value: '' },
    {
      label: 'Юридический адрес',
      value: '',
    },
    { label: 'Имя руководителя организации', value: '' },
    { label: 'Фамилия руководителя организации', value: '' },
    { label: 'Отчество руководителя организации', value: '' },
    { label: 'Номер телефона', value: '' },
    { label: 'Адрес электронной почты', value: '' },
  ]);
  const isEditing = ref(false);

  onMounted(async () => {
    const response = await apiClient.get('/user/profile/get_profile');

    const data = await response.data;

    userData.value = [
      { label: 'Наименование организации', value: data.name || '' },
      { label: 'ИНН', value: data.inn || '' },
      { label: 'ОГРН', value: data.ogrn || '' },
      { label: 'Юридический адрес', value: data.legal_address || data.address || '' },
      { label: 'Фамилия руководителя организации', value: data.fio_of_leader?.split(' ')[0] || '' },
      { label: 'Имя руководителя организации', value: data.fio_of_leader?.split(' ')[1] || '' },
      {
        label: 'Отчество руководителя организации',
        value: data.fio_of_leader?.split(' ')[2] || '',
      },
      { label: 'Номер телефона', value: data.phone_number || data.phone || '' },
      { label: 'Адрес электронной почты', value: data.email || '' },
    ];
  });

  const handleSubmit = async () => {
    try {
      console.log('Привет!!');

      const originalFields = {
        name: userData.value.find((item) => item.label === 'Наименование организации')?.value || '',
        ogrn: userData.value.find((item) => item.label === 'ОГРН')?.value || '',
        legal_address:
          userData.value.find((item) => item.label === 'Юридический адрес')?.value || '',
        leader_last_name:
          userData.value.find((item) => item.label === 'Фамилия руководителя организации')?.value ||
          '',
        leader_first_name:
          userData.value.find((item) => item.label === 'Имя руководителя организации')?.value || '',
        leader_middle_name:
          userData.value.find((item) => item.label === 'Отчество руководителя организации')
            ?.value || '',
        phone: userData.value.find((item) => item.label === 'Номер телефона')?.value || '',
        email: userData.value.find((item) => item.label === 'Адрес электронной почты')?.value || '',
      };

      const { name, ...updatableFields } = originalFields;

      await apiClient.patch('/user/profile/edit_profile', {
        ogrn: updatableFields.ogrn,
        name: name,
        email: updatableFields.email,
        fio: `${updatableFields.leader_first_name} ${updatableFields.leader_last_name} ${updatableFields.leader_middle_name}`,
        legal_address: updatableFields.address,
        number_phone: updatableFields.phone,
      });

      isEditing.value = false;
    } catch (error) {
      console.error('Ошибка при сохранении:', error);

      // const message = error?.response?.data?.detail || 'Не удалось сохранить изменения';
    }
  };
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

        .profile__page-info-edit {
          border: 0;
          background: none;
          font-size: 24px;
          color: rgb(25 118 210 / 80%);
          cursor: pointer;
        }

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
