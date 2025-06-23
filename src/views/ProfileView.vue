<template>
  <div class="profile__page-main">
    <div class="profile__page-base-info">
      <div class="profile__page-base-card-company">
        <h1 class="profile__page-base-card-text">
          <span>{{ formData.shortName }}</span>
        </h1>
      </div>
    </div>
    <div class="profile__page-detailed-information"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  // composables.
  import apiClient from '@/composables/apiClient.js';

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
    .profile__page-base-info {
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
  }
</style>
