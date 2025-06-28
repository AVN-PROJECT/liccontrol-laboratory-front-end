<template>
  <header class="header__base">
    <div class="header__menu">
      <div class="header__menu-logo">
        <div class="header__logo-image">
          <img
            src="@/assets/icons/logo/logo.svg"
            alt="logo-main.svg"
          />
        </div>

        <div class="header__menu-title">
          <h1 class="header__menu-laboratory-title">Лаборатория</h1>
          <p class="header__menu-laboratory-disclaimer">© All rights reserved</p>
        </div>
      </div>

      <div class="header__menu-main">
        <div class="header__menu-profile">
          <router-link
            class="header__menu-profile-link"
            :to="{ name: 'profile' }"
          >
            <img
              src="@/assets/icons/sections/links/building-profile.svg"
              alt="profile.svg"
            />

            <h2>Профиль</h2>
          </router-link>
        </div>

        <div class="header__menu-view">
          <DropdownComponent>
            <template #button-trigger>
              <VButton class="header__menu-button">
                <img
                  src="@/assets/icons/sections/buttons/arrow-menu.svg"
                  alt="menu.svg"
                  class="header__menu-button-open-icon"
                />

                <p>Открыть меню</p>
              </VButton>
            </template>

            <template #content>
              <HeaderMenuComponent />
            </template>
          </DropdownComponent>
        </div>
      </div>
      <div class="header__menu-section">
        <img
          class="header__menu-notifications"
          src="@/assets/icons/sections/links/bell-notification.svg"
          alt="notification.svg"
        />
        <h1 class="header__menu-section-name">{{ route.meta.name }}</h1>
      </div>
    </div>
  </header>
</template>

<script setup>
  // vuex.
  import { useRoute } from 'vue-router';

  // components.
  import VButton from '@/components/ui/VButton.vue';
  import DropdownComponent from '@/components/modules/DropdownComponent.vue';
  import HeaderMenuComponent from '@/components/modules/HeaderMenuComponent.vue';

  // constants.
  const route = useRoute();
</script>

<style scoped lang="scss">
  .header__menu {
    display: flex;
    width: 100%;
    max-height: 200px;
    padding: 1vw;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    font-family: $font-family-base;

    .header__menu-main {
      display: flex;
      justify-content: flex-start;
      width: 55%;
      padding: 3.5vh;
      border-right: 6px solid #8fc89b;
      border-left: 6px solid #8fc89b;

      .header__menu-profile {
        display: flex;
        align-items: center;

        .header__menu-profile-link {
          display: flex;
          align-items: center;
          flex-direction: column;
          text-decoration: none;
          color: $color-black;
        }

        .header__menu-profile-link:hover {
          font-family: $font-family-base;
          font-weight: 500;
        }
      }
    }

    .header__menu-button {
      display: flex;
      border: 0;
      background: inherit;
      cursor: pointer;

      .header__menu-button-open-icon {
        margin: 1.2rem;
      }
    }

    .header__menu-section {
      width: 25%;
      flex-direction: column;
      padding: 1vw;
    }

    .header__menu-logo {
      width: 20%;

      .header__menu-laboratory-title {
        margin-top: 1px;
        margin-bottom: 0;
      }

      .header__menu-laboratory-disclaimer {
        color: rgb(33 33 33 / 70%);
      }
    }
  }
</style>
