<template>
  <div class="agreement__page-main">
    <div class="equipment-page__table">
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
              <p>{{ index + 1 }}</p>
            </div>

            <div class="table__cell body-cell-agreement-number">
              <p v-if="editingId !== (item.uuid ?? index)">{{ item.agreement_number }}</p>

              <VInput
                v-else
                v-model="item.agreement_number"
                :value="item.agreement_number"
                color="white"
                class="input-field"
              />
            </div>
            <div class="table__cell body-cell-types-of-work">
              <p>{{ [] }}</p>
            </div>
            <div class="table__cell body-cell-addresses">
              <p>{{ [] }}</p>
            </div>
            <div class="table__cell body-cell-agreement-date">
              <p v-if="editingId !== (item.uuid ?? index)">{{ item.agreement_start_date }}</p>
              <VInput
                v-else
                v-model="item.agreement_start_date"
                type="date"
                :value="item.agreement_start_date"
                color="white"
                class="input-field"
              />
            </div>
            <div class="table__cell body-cell-agreement-date-finish">
              <p v-if="editingId !== (item.uuid ?? index)">{{ item.agreement_final_date }}</p>
              <VInput
                v-else
                v-model="item.agreement_final_date"
                type="date"
                :value="item.agreement_final_date"
                color="white"
                class="input-field"
              />
            </div>

            <div class="table__cell body-cell-persons">
              <p>{{ [] }}</p>
            </div>

            <div class="table__cell body-cell-equipments">
              <p>{{ [] }}</p>
            </div>

            <div class="table__cell body-cell-actions">
              <VButton class="table__button--details">Завершить</VButton>
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
  /* styles go here */
</style>
