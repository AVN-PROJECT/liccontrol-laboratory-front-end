<template>
  <div class="header__menu-dropdown-content">
    <ul class="header__menu-content-list-sections">
      <li class="header__menu-content-list-line">
        <router-link
          :to="{ name: 'person' }"
          class="header__menu-content-list-link"
        >
          <img
            src="@/assets/icons/sections/links/people-person.svg"
            alt="person.svg"
            class="header__menu-content-list-link-icon"
          />
          Персонал
        </router-link>
      </li>
      <li class="header__menu-content-list-line">
        <router-link
          :to="{ name: 'equipment-metrology' }"
          class="header__menu-content-list-link"
        >
          <img
            src="@/assets/icons/sections/links/tools-equipment.svg"
            alt="equipment.svg"
            class="header__menu-content-list-link-icon"
          />
          Оборудование
        </router-link>
      </li>
      <li class="header__menu-content-list-line">
        <router-link
          :to="{ name: 'agreement' }"
          class="header__menu-content-list-link"
        >
          <img
            src="@/assets/icons/sections/links/sheet-agreement.svg"
            alt="agreement.svg"
            class="header__menu-content-list-link-icon"
          />
          Договора
        </router-link>
      </li>
      <li class="header__menu-content-list-line">
        <router-link
          :to="{ name: 'equipment-personal' }"
          class="header__menu-content-list-link"
        >
          <img
            src="@/assets/icons/sections/links/key-equipment-personal.svg"
            alt="equipment.svg"
            class="header__menu-content-list-link-icon"
          />
          Прочее оборудование
        </router-link>
      </li>
      <li class="header__menu-content-list-line">
        <router-link
          :to="{ name: 'instruction' }"
          class="header__menu-content-list-link"
        >
          <img
            src="@/assets/icons/sections/links/info-instruction.svg"
            alt="instruction.svg"
            class="header__menu-content-list-link-icon"
          />
          Инструкция
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
  /* JS go here */
</script>

<style scoped lang="scss">
  .header__menu-dropdown-content {
    position: absolute;
    z-index: 1000;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, $color-light-smoke 100%);
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    backdrop-filter: blur(5px);

    .header__menu-content-list-sections {
      padding: 0.3rem;
      list-style: none;

      .header__menu-content-list-line {
        padding: 0.25rem;

        .header__menu-content-list-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: $color-black;
        }

        .header__menu-content-list-link:hover {
          color: $color-black;
          transition: background 0.2s;
          cursor: pointer;
        }

        .header__menu-content-list-link-icon {
          margin: 0.5rem;
        }
      }
    }
  }
</style>
