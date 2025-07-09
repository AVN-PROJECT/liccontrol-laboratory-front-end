<template>
  <div class="agreement__form--addition">
    <div class="form__buttons--close">
      <VButton
        class="form__button--close"
        @click="emit('close-modal')"
      >
        <img
          src="@/assets/icons/sections/buttons/cross-cancel.svg"
          alt="cross-close.svg"
          class="form__button--icon"
        />
      </VButton>
    </div>

    <div class="form__columns">
      <div class="form__column">
        <div class="form__field">
          <label
            class="field__label"
            for="form__field--input"
          >
            <span class="field__label--text">№ Договора</span>
            <VInput
              class="form__field--input"
              color="white"
              size="medium"
            />
          </label>
        </div>

        <div class="form__field">
          <div class="form__field--content">
            <label
              for="form__field--input"
              class="field__label"
            >
              <span class="field__label--text">Вид работ</span>
              <VInput
                v-model="newItem"
                class="form__field--input"
                color="white"
                size="medium"
              />
            </label>

            <div class="form__field--items">
              <ul class="field__items--list">
                <template
                  v-for="(type, index) in newAgreement.types_of_work"
                  :key="index"
                >
                  <li class="items__list--item">{{ type }}</li>
                </template>
              </ul>
            </div>
          </div>

          <VButton
            class="field__button"
            @click="addNewItem(newItem, 'types_of_work')"
          >
            <img
              class="content__button--icon"
              src="@/assets/icons/sections/buttons/plus-addition.svg"
            />
          </VButton>
        </div>

        <div class="form__field">
          <div class="form__field--content">
            <label
              for="form__field--input"
              class="field__label"
            >
              <span class="field__label--text">Адрес выполнения работ</span>
              <VInput
                v-model="newItem"
                class="form__field--input"
                color="white"
                size="medium"
              />
            </label>

            <div class="form__field--items">
              <ul class="field__items--list">
                <template
                  v-for="(type, index) in newAgreement.addresses"
                  :key="index"
                >
                  <li class="items__list--item">{{ type }}</li>
                </template>
              </ul>
            </div>
          </div>

          <VButton
            class="field__button"
            @click="addNewItem(newItem, 'addresses')"
          >
            <img
              class="content__button--icon"
              src="@/assets/icons/sections/buttons/plus-addition.svg"
            />
          </VButton>
        </div>

        <div class="form__field">
          <label
            for="form__field--input"
            class="field__label"
          >
            <span class="field__label--text">Дата начала договора</span>
            <VInput
              class="form__field--input"
              color="white"
              size="medium"
              type="date"
            />
          </label>
        </div>

        <div class="form__field">
          <label
            for="form__field--input"
            class="field__label"
          >
            <span class="field__label--text">Дата окончания договора</span>
            <VInput
              class="form__field--input"
              color="white"
              size="medium"
              type="date"
            />
          </label>
        </div>
      </div>

      <div class="form__column">
        <div class="form__field--content">
          <label
            for="form__field--input"
            class="field__label"
          >
            <span class="field__label--text">Сотрудники привлекаемые к работам</span>
            <VSelect
              :placeholder="'Фамилия Имя Отчество'"
              :options="props.persons"
              class="form__field--input"
              :values="['fio']"
              @select="(key) => selectOption(key, props.persons, 'persons')"
            />
          </label>

          <div class="form__field--items">
            <ul class="field__items--list">
              <template
                v-for="(person, index) in newAgreement.persons"
                :key="index"
              >
                <li class="items__list--item">
                  {{ props.persons.find((item) => item.uuid === person).fio }}
                </li>
              </template>
            </ul>
          </div>
        </div>

        <div class="form__field form__field--content">
          <label
            for="form__field--input"
            class="field__label"
          >
            <span class="field__label--text">Используемое оборудование</span>
            <VSelect
              :placeholder="'Наименование оборудования'"
              :options="props.equipments"
              class="form__field--input"
              @select="(key) => selectOption(key, props.equipments, 'equipments')"
            />
          </label>

          <div class="form__field--items">
            <ul class="field__items--list">
              <template
                v-for="(equipment, index) in newAgreement.equipments"
                :key="index"
              >
                <li class="items__list--item">
                  {{ props.equipments.find((item) => item.uuid === equipment).name }}
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="form__buttons">
      <VButton
        class="form__button--addition"
        @click="addAgreement"
      >
        Добавить договор
        <img
          src="@/assets/icons/sections/buttons/circle-plus-addition.svg"
          alt="plus-addition.svg"
          class="button__addition--icon"
        />
      </VButton>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { ref } from 'vue';

  // helpers.
  import resetForm from '@/helpers/forms/resetForm.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';
  import VSelect from '@/components/ui/VSelect.vue';

  // constants
  const props = defineProps({
    persons: {
      default: () => [],
      type: Array,
    },
    equipments: {
      default: () => [],
      type: Array,
    },
  });

  const emit = defineEmits(['agreement-addition', 'close-modal']);

  const newAgreement = ref({
    agreement_number: '',
    agreement_start_date: '',
    agreement_final_date: '',
    addresses: [],
    persons: [],
    equipments: [],
    types_of_work: [],
  });

  const newItem = ref('');

  const addNewItem = (value, field) => {
    if (!value || !value.trim()) {
      return;
    }

    newAgreement.value[field].push(value);

    newItem.value = '';
  };

  const addAgreement = () => {
    emit('agreement-addition', newAgreement.value);

    resetForm(newAgreement.value);
  };

  const selectOption = (key, list, field) => {
    const item = list.find((item) => item['uuid'] === key);

    newAgreement.value[field].push(item.uuid);
  };
</script>

<style scoped lang="scss">
  .agreement__form--addition {
    display: flex;
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    font-size: 1rem;
    flex-direction: column;
    backdrop-filter: blur(5px);
    gap: 1.5rem;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);

    .form__buttons--close {
      display: flex;
      justify-content: flex-end;
      padding: 0;

      .form__button--close {
        margin: 0;
        padding: 0;
        border: none;
        background-color: inherit;
        cursor: pointer;
      }
    }

    .form__columns {
      display: flex;
      width: 100%;
      gap: 5rem;

      .form__column {
        width: 100%;
        gap: 1rem;

        .form__field {
          position: relative;
          display: flex;
          justify-content: flex-start;
          width: 100%;
          margin-bottom: 1rem;

          .field__label {
            position: relative;
            display: flex;
            width: 100%;
            flex-direction: column;
          }

          .field__button {
            position: absolute;
            top: 1.5rem;
            right: -2rem;
            border: none;
            background-color: inherit;
            cursor: pointer;
          }
        }

        .form__field--content {
          display: flex;
          width: 100%;
          flex-direction: column;
          margin-bottom: 0.5rem;
          gap: 0.5rem;
        }

        .form__field--items {
          overflow-y: auto;
          height: 5rem;
          padding: 0.3rem 0 0.2rem 0;
          border-radius: 5px;
          background-color: $color-light;
          box-shadow: inset 0 0 4px 1px rgb(0 0 0 / 25%);

          .field__items--list {
            list-style: none;
            font-size: 1rem;
          }

          &::-webkit-scrollbar {
            position: absolute;
            right: 0.5rem;
            width: 6px;
          }

          &::-webkit-scrollbar-thumb {
            height: 1rem;
            border-radius: 3px;
            background-color: $color-blue-light;
          }
        }
      }
    }

    .form__buttons {
      display: flex;
      justify-content: flex-end;

      .form__button--addition {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: inherit;
        text-decoration: underline;
        font-size: 1.2rem;
        font-weight: bold;
        color: $color-blue-light;
        cursor: pointer;
        gap: 0.5rem;
      }
    }
  }
</style>
