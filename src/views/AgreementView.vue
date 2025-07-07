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
  </div>
</template>

<script setup>
  // vue.
  import { ref, onMounted } from 'vue';

  // components.
  import VButton from '@/components/ui/VButton.vue';
  import VInput from '@/components/ui/VInput.vue';
  import apiClient from '@/composables/api/apiClient.js';
  import formatDate from '@/helpers/format/format.js';

  // constants.
  const editingId = ref(null);
  const agreements = ref([]);
  const status = ref('active');

  const getAgreements = async () => {
    const response = await apiClient.get(`/user/agreement/agreements?${status.value}`);

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

  onMounted(async () => {
    await getAgreements();
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
      background-color: white;
      grid-template-columns: 5% 10% 10% 12% 10% 10% 15% 10%;
      box-shadow: 0 2px 4px rgb(0 0 0 / 10%);

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
        grid-template-columns: 5% 10% 10% 12% 10% 10% 15% 10%;

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
      }

      &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease;
      }

      .cell__field--input {
        width: 100%;
        margin-bottom: 1.5rem;
      }
    }
  }
</style>
