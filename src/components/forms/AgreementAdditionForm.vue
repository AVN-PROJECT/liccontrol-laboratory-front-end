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
          <label
            for="form__field--input"
            class="field__label"
          >
            <span class="field__label--text">Адрес выполнения работ</span>
            <VInput
              class="form__field--input"
              color="white"
              size="medium"
            />
          </label>

          <VButton class="field__button">
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
        <div class="form__field">
          <label>
            <VInput />
          </label>
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
  // import triangleUpIcon from '@/assets/icons/sections/legends/triangle-up.svg';
  // import triangleDownIcon from '@/assets/icons/sections/legends/triangle-down.svg';

  // constants

  // const props = defineProps({
  //   persons: {
  //     default: () => [],
  //     type: Array,
  //   },
  // });

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
</script>

<style scoped lang="scss">
  .agreement__form--addition {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    backdrop-filter: blur(5px);
    gap: 1.5rem;

    .form__buttons--close {
      display: flex;
      justify-content: flex-end;

      .form__button--close {
        margin: 0.5rem;
        border: none;
        background-color: inherit;
        cursor: pointer;
      }
    }

    .form__columns {
      display: flex;
      width: 90%;

      .form__column {
        .form__field {
          display: flex;
          align-items: end;
          justify-content: flex-start;
          padding: 0.3rem;
          gap: 0.5rem;

          .field__label {
            display: flex;
            width: 100%;
            flex-direction: column;
          }

          .form__field--items {
            overflow-y: auto;
            max-height: 80px;

            &::-webkit-scrollbar {
              width: 6px;
            }

            &::-webkit-scrollbar-track {
              background: inherit;
            }

            &::-webkit-scrollbar-thumb {
              height: 2rem;
              border-radius: 3px;
              background-color: $color-blue-light;
            }
          }

          .field__button {
            margin-bottom: 0.1rem;
            border: none;
            background-color: inherit;
          }
        }
      }
    }
  }
</style>
