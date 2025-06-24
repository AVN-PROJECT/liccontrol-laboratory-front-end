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
          <div class="header__menu-profile-link">
            <a href="/profile">
              <img
                src="@/assets/icons/sections/profile.svg"
                alt="profile.svg"
              />
            </a>
          </div>

          <h2>Профиль</h2>
        </div>

        <div class="header__menu-view">
          <div class="header__menu-open">
            <VButton
              class="header__menu-button"
              @click="menuOpen = !menuOpen"
            >
              <img
                src="@/assets/icons/sections/menu.svg"
                alt="menu.svg"
              />

              <p>Открыть меню</p>
            </VButton>
          </div>

          <div
            v-if="menuOpen"
            class="header__menu-menu"
          >
            <p>Тут будет меню...</p>
          </div>
        </div>
      </div>

      <div class="header__menu-section">
        <img
          class="header__menu-notifications"
          src="@/assets/icons/sections/notifications.svg"
          alt="notification.svg"
        />
        <h1 class="header__menu-section-name">Профиль</h1>
      </div>
    </div>
  </header>
</template>

<script setup>
  // vue.
  import { ref } from 'vue';

  // components.
  import VButton from '@/components/ui/VButton.vue';

  // constants.
  const menuOpen = ref(false);
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
        justify-content: center;
        flex-direction: column;
      }

      .header__menu-button {
        display: flex;
        border: 0;
        background: inherit;
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
