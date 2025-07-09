<template>
  <div class="agreement__page-main">
    <div class="agreement-page__table">
      <div class="table__header">
        <div class="table__cell header-cell-id">№</div>
        <div class="table__cell header-cell-agreement-number">№ Договора</div>
        <div class="table__cell header-cell-type-of-work">Вид работ</div>
        <div class="table__cell header-cell-address">Адрес выполнения работ</div>
        <div class="table__cell header-cell-agreement-date">Дата начала договора</div>
        <div class="table__cell header-cell-agreement-date-finish">Дата окончания договора</div>
        <div class="table__cell header-cell-persons">Сотрудники по договору</div>
        <div class="table__cell header-cell-equipments">Оборудование по договору</div>
        <div class="table__cell header-cell-actions"></div>
      </div>

      <div class="table__body">
        <template
          v-for="(item, index) in agreements"
          :key="item.uuid ?? index"
        >
          <div class="table__row">
            <div class="table__cell body-cell-id">
              <p class="cell__field--text">{{ index + 1 }}</p>
            </div>

            <div class="table__cell body-cell-agreement-number">
              <p
                v-if="editingId !== (item.uuid ?? index)"
                class="cell__field--text"
              >
                {{ item.agreement_number }}
              </p>

              <VInput
                v-else
                v-model="item.agreement_number"
                :value="item.agreement_number"
                color="white"
                class="cell__field--input"
              />
            </div>
            <div class="table__cell body-cell-types-of-work">
              <p class="cell__field--content">{{ [] }}</p>
            </div>
            <div class="table__cell body-cell-addresses">
              <p class="cell__field--content">{{ [] }}</p>
            </div>
            <div class="table__cell body-cell-agreement-date">
              <p
                v-if="editingId !== (item.uuid ?? index)"
                class="cell__field--text"
              >
                {{ item.agreement_start_date }}
              </p>
              <VInput
                v-else
                v-model="item.agreement_start_date"
                type="date"
                :value="item.agreement_start_date"
                color="white"
                class="cell__field--input"
              />
            </div>
            <div class="table__cell body-cell-agreement-date-finish">
              <p
                v-if="editingId !== (item.uuid ?? index)"
                class="cell__field--text"
              >
                {{ item.agreement_final_date }}
              </p>
              <VInput
                v-else
                v-model="item.agreement_final_date"
                type="date"
                :value="item.agreement_final_date"
                color="white"
                class="cell__field--input"
              />
            </div>

            <div class="table__cell body-cell-persons">
              <p class="cell__field--content">{{ [] }}</p>
            </div>

            <div class="table__cell body-cell-equipments">
              <p class="cell__field--content">{{ [] }}</p>
            </div>

            <div class="table__cell body-cell-actions">
              <VButton class="table__button--action">Завершить</VButton>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="agreement-page__side-menu">
      <div class="side-menu__mode">
        <div class="mode__buttons">
          <VButton
            class="button__active"
            @click="status = 'active'"
          >
            <img
              src="@/assets/icons/sections/buttons/agreement-active.svg"
              alt="agreement-active.svg"
            />
          </VButton>

          <hr class="button__line" />

          <VButton
            class="button__finished"
            @click="status = 'finished'"
          >
            <img
              src="@/assets/icons/sections/buttons/agreement-finished.svg"
              alt="agreement-finished.svg"
            />
          </VButton>
        </div>
      </div>

      <div class="side-menu__status">
        <h4 class="status__list--header">До окончания договора:</h4>
        <ul class="status__list">
          <li class="list__item">
            <img
              class="list__item--icon"
              src="@/assets/icons/sections/legends/circle-green.svg"
              alt="circle-green.svg"
            />
            более 3-х месяцев
          </li>
          <li class="list__item">
            <img
              class="list__item--icon"
              src="@/assets/icons/sections/legends/circle-orange.svg"
              alt="circle-orange.svg"
            />
            менее 3-х месяцев
          </li>
          <li class="list__item">
            <img
              class="list__item--icon"
              src="@/assets/icons/sections/legends/circle-red.svg"
              alt="circle-red.svg"
            />
            менее 1-ого месяца
          </li>
        </ul>
      </div>

      <div class="side-menu__addition">
        <VButton
          class="button__add"
          @click="agreementAddition = !agreementAddition"
        >
          Добавить договор
          <img src="@/assets/icons/sections/buttons/agreement-addition.svg" />
        </VButton>
      </div>

      <template v-if="agreementAddition">
        <div class="side-menu__modal">
          <AgreementAdditionForm
            :equipments="equipments"
            :persons="persons"
            @agreement-addition="addAgreement"
            @close-modal="agreementAddition = false"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { ref, onMounted } from 'vue';

  // components.
  import VButton from '@/components/ui/VButton.vue';
  import VInput from '@/components/ui/VInput.vue';
  import AgreementAdditionForm from '@/components/forms/AgreementAdditionForm.vue';

  // helpers.
  import apiClient from '@/composables/api/apiClient.js';
  import formatDate from '@/helpers/format/format.js';

  // constants.
  const editingId = ref(null);
  const agreements = ref([]);
  const status = ref('active');
  const agreementAddition = ref(false);
  const equipments = ref([]);
  const persons = ref([]);

  const getOptionsData = async () => {
    const [equipmentPersonal, equipmentMetrology, personsData] = await Promise.all([
      getEquipmentsPersonal(),
      getEquipmentsMetrology(),
      getPersons(),
    ]);

    persons.value = personsData;
    equipments.value = [...equipmentPersonal, ...equipmentMetrology];
  };

  const getAgreements = async () => {
    const response = await apiClient.get(`/user/agreement/agreements?status=${status.value}`);

    if (response.status === 200 && Array.isArray(response.data)) {
      agreements.value = response.data.map((item) => ({
        uuid: item.uuid,
        agreement_number: item.agreement_number,
        agreement_start_date: formatDate(item.agreement_start_date),
        agreement_final_date: formatDate(item.agreement_final_date),
        addresses: item.addresses,
        persons: item.persons,
        equipments: item.equipments,
        types_of_work: item.types_of_work,
      }));
    }
  };

  const addAgreement = async (newAgreement) => {
    try {
      await apiClient.post('/user/agreement/save_agreement', newAgreement);

      await getAgreements();
    } catch (error) {
      console.error(error);
    }
  };

  const getEquipmentsPersonal = async () => {
    const response = await apiClient.get('/user/equipment/personal/equipments');

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data.map((item) => ({
        uuid: item.uuid,
        name: item.name,
        number_serial: item.number_serial,
      }));
    }
  };

  const getEquipmentsMetrology = async () => {
    const response = await apiClient.get('/user/equipment/metrology/equipments');

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data.map((item) => ({
        uuid: item.uuid,
        name: item.name,
        number_serial: item.number_serial,
      }));
    }
  };

  const getPersons = async () => {
    try {
      const response = await apiClient.get('/user/person/persons');

      return response.data.map((person) => ({
        uuid: person.uuid,
        fio: person.fio,
      }));
    } catch (err) {
      console.error('Ошибка загрузки сотрудников:', err);
    }
  };

  onMounted(async () => {
    await getAgreements();
    await getOptionsData();
  });
</script>

<style lang="scss">
  .agreement__page-main {
    position: relative;
    display: flex;
    width: 100%;
    padding: 20px 40px;
    font-family: $font-family-base;
    gap: 10px;

    .agreement-page__table {
      width: 80%;
    }

    .table__header {
      position: sticky;
      top: 0;
      z-index: 2;
      display: grid;
      width: 100%;
      padding: 12px 8px;
      background-color: inherit;
      grid-template-columns: 5% 10% 10% 12% 10% 10% 15% 10% 10%;

      .table__cell {
        align-content: center;
        text-align: center;
        text-transform: uppercase;
        font-size: 15px;
        font-weight: bold;
      }
    }

    .table__body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;

      .table__row {
        display: grid;
        padding: 12px 8px;
        border-radius: 10px;
        transition: all 0.3s ease;
        grid-template-columns: 5% 10% 10% 12% 10% 10% 15% 10% 10%;

        .table__cell {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 4px;
          text-align: center;
          font-size: 14px;

          p {
            margin: 0;
          }
        }

        .table__button--action {
          width: 75%;
          margin: 0;
          padding: 0.5rem;
          border-radius: 6px;
          border: none;
          background-color: rgba($color-green, 60%);
          color: $color-light;
          cursor: pointer;

          &:hover {
            transform: scale(1.1);
            transition: transform 0.2s ease;
          }
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgb(0 0 0 / 15%);
        }
      }

      .cell__field--input {
        width: 100%;
        margin-bottom: 1.5rem;
      }
    }

    .agreement-page__side-menu {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      flex-direction: column;
      gap: 1rem;

      .mode__buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex-direction: column;
        gap: 1.5rem;

        .button__line {
          width: 65%;
          height: 3px;
          margin: 0;
          padding: 0;
          border-radius: 5px;
          border: none;
          background-color: $color-green-light;
        }

        .button__active,
        .button__finished {
          border: none;
          background-color: inherit;
          cursor: pointer;
        }
      }

      .side-menu__status {
        display: flex;
        align-items: flex-start;
        justify-content: left;
        margin-top: 1rem;
        flex-direction: column;

        .status__list {
          display: flex;
          margin: 0;
          padding: 0;
          list-style: none;
          flex-direction: column;

          .list__item {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 0.5rem;
            font-size: 1.1rem;
          }
        }
      }

      .side-menu__addition {
        margin-top: 1rem;

        .button__add {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          border-radius: 15px;
          border: none;
          background-color: rgb(143 200 155 / 30%);
          cursor: pointer;
          gap: 0.5rem;
        }
      }

      .side-menu__modal {
        position: absolute;
        right: 20rem;
        bottom: 0;
        z-index: 10;
        display: flex;
        width: 40%;
        max-height: 250vh;
      }
    }
  }
</style>
