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
    border-radius: 5px;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    backdrop-filter: blur(5px);

    .header__menu-content-list-sections {
      list-style: none;

      .header__menu-content-list-line {
        .header__menu-content-list-link {
          text-decoration: none;
          color: $color-black;
        }

        .header__menu-content-list-link:hover {
          color: $color-black;
          transition: background 0.2s;
          cursor: pointer;
        }
      }
    }
  }
</style>
