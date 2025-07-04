<template>
  <div class="equipment__page-main">
    <div class="equipment-page__table table">
      <div class="table__header">
        <div class="table__cell header-cell-id">№</div>
        <div class="table__cell header-cell-name">Наименование оборудования</div>
        <div class="table__cell header-cell-type">Тип СИ</div>
        <div class="table__cell header-cell-date">Дата начала поверки</div>
        <div class="table__cell header-cell-valid">Дата окончания поверки</div>
        <div class="table__cell header-cell-number">Номер свидетельства</div>
        <div class="table__cell header-cell-suitability">Пригодность</div>
        <div class="table__cell header-cell-actions"></div>
      </div>

      <div class="table__body">
        <template
          v-for="(item, index) in equipments"
          :key="item.uuid ?? index"
        >
          <AccordionComponent>
            <template #accordion-header>
              <div
                class="table__row"
                :class="{ 'editing-row': editingId === (item.uuid ?? index), [item.status]: true }"
              >
                <div class="table__cell body-cell-id">
                  <div class="body-cell-id-wrapper">
                    <p>{{ index + 1 }}</p>
                  </div>
                  <VButton class="table__button-delete">
                    <img
                      v-if="editingId === (item.uuid ?? index)"
                      src="@/assets/icons/sections/buttons/basket-delete.svg"
                      class="icon-action"
                      alt="delete.svg"
                      @click="deleteItem(item.uuid)"
                    />
                  </VButton>
                </div>

                <div class="table__cell bode-cell-name">
                  <a
                    v-if="!editingId"
                    :href="item.link"
                  >
                    <p>{{ item.name }}</p>
                  </a>
                  <VInput
                    v-else
                    v-model="item.name"
                    type="text"
                    :value="item.name"
                    color="white"
                    class="input-field"
                  />
                </div>
                <div class="table__cell body-cell-type">
                  <p v-if="!editingId">{{ item.type }}</p>
                  <VInput
                    v-else
                    v-model="item.type"
                    type="text"
                    :value="item.type"
                    color="white"
                    class="input-field"
                  />
                </div>
                <div class="table__cell body-cell-verification-date">
                  <p v-if="!editingId">{{ item.verification_date }}</p>
                  <VInput
                    v-else
                    v-model="item.verification_date"
                    type="text"
                    :value="item.verification_date"
                    color="white"
                    class="input-field"
                  />
                </div>
                <div class="table__cell body-cell-verification-valid">
                  <p v-if="!editingId">{{ item.verification_valid }}</p>
                  <VInput
                    v-else
                    v-model="item.verification_valid"
                    type="text"
                    :value="item.verification_valid"
                    color="white"
                    class="input-field"
                  />
                </div>
                <div class="table__cell body-cell-verification-number">
                  <p v-if="!editingId">{{ item.verification_number }}</p>
                  <VInput
                    v-else
                    v-model="item.verification_number"
                    type="text"
                    :value="item.verification_number"
                    color="white"
                    class="input-field"
                  />
                </div>

                <div class="table__cell body-cell-suitability">
                  <img :src="item.suitability ? tickIcon : crossIcon" />
                </div>

                <div class="table__cell body-cell-actions">
                  <div class="action-buttons">
                    <div
                      v-if="editingId === (item.uuid ?? index)"
                      class="table__button-edit"
                    >
                      <VButton class="table__button-cancel">
                        <img
                          src="@/assets/icons/sections/buttons/cross-cancel.svg"
                          class="icon-action"
                          alt="cancel.svg"
                          @click="cancelEdit"
                        />
                      </VButton>
                      <VButton class="table__button-save">
                        <img
                          class="icon-action"
                          src="@/assets/icons/sections/buttons/tick-save.svg"
                          alt="save.svg"
                          @click="saveEdit(item)"
                        />
                      </VButton>
                    </div>
                    <VButton
                      class="table__button--details"
                      @click="toggleDetails(item.uuid ?? index)"
                    >
                      {{ openedRows.includes(item.uuid ?? index) ? 'Скрыть' : 'Подробнее...' }}
                    </VButton>
                  </div>
                </div>
              </div>
            </template>

            <template #accordion-body>
              <div
                v-if="openedRows.includes(item.uuid ?? index)"
                class="table__row--details"
              >
                <div class="row__details-content">
                  <p>Серийный номер: {{ item.number_serial }}</p>
                </div>
              </div>
            </template>
          </AccordionComponent>
        </template>
      </div>
    </div>

    <div class="equipment__page-menu">
      <div class="menu__download">
        <div>
          <img />
        </div>
        <img />
      </div>
      <div class="menu__status">
        <p>До истечения свидетельства</p>
        <ul>
          <li>более 3-х месяцев</li>
          <li>менее 3-х месяцев</li>
          <li>менее 1-ого месяца</li>
        </ul>
      </div>
      <div class="menu__addition">
        <h2>Добавить оборудование</h2>
        <div>
          <VButton>Вручную</VButton>
          <VButton>Из Аршины</VButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { onMounted, ref } from 'vue';

  // composables
  import apiClient from '@/composables/api/apiClient.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';
  import tickIcon from '@/assets/icons/sections/buttons/tick-save.svg';
  import crossIcon from '@/assets/icons/sections/buttons/cross-cancel.svg';
  import AccordionComponent from '@/components/modules/AccordionComponent.vue';

  const editingId = ref(null);
  const originalItem = ref(null);

  const equipments = ref([]);

  const openedRows = ref([]);

  const toggleDetails = (id) => {
    const index = openedRows.value.indexOf(id);

    if (index === -1) {
      openedRows.value.push(id);
    } else {
      openedRows.value.splice(index, 1);
    }
  };

  // const toggleEdit = (item) => {
  //   originalItem.value = { ...item };
  //   editingId.value = item.id;
  // };

  const getEquipments = async () => {
    const response = await apiClient.get('/user/equipment/metrology/equipments');

    const formatDate = (str) => {
      if (!str) {
        return '';
      }
      if (str.includes('.')) {
        const [d, m, y] = str.split('.');
        return `${y}-${m}-${d}`;
      }
      return str;
    };

    if (response.status === 200 && Array.isArray(response.data)) {
      equipments.value = response.data.map((item) => ({
        uuid: item.uuid,
        name: item.name,
        number_serial: item.number_serial,
        verification_number: item.verification_number,
        type: item.type,
        link: item.link,
        suitability: item.suitability,
        verification_valid: formatDate(item.verification_valid),
        verification_date: formatDate(item.verification_date),

        status: item.valid_date,
      }));
    }
  };

  const cancelEdit = () => {
    const index = equipments.value.findIndex(
      (equipment) => equipment.uuid === originalItem.value.id
    );
    if (index !== -1) {
      equipments.value[index] = { ...originalItem.value };
    }
    editingId.value = null;
    originalItem.value = null;
  };

  const saveEdit = async (item) => {
    try {
      const payload = {
        uuid: item.id,
        name: item.name,
        number_serial: item.number_serial,
        verification_number: item.verification_number,
        verification_date: item.verification_date,

        valid_date: item.validate,
      };

      await apiClient.patch('/user/equipment/edit_equipment', payload);

      editingId.value = null;
      originalItem.value = null;

      await getEquipments();
    } catch (error) {
      console.error('Ошибка при сохранении изменений:', error);
    }
  };

  const deleteItem = async (item) => {
    try {
      await apiClient.delete('/user/equipment/delete_equipment', {
        params: {
          equipment_id: item.id,
        },
      });

      await getEquipments();
    } catch (error) {
      console.error('Ошибка удаления оборудования:', error);
    }
  };

  onMounted(async () => {
    await getEquipments();
  });
</script>

<style scoped lang="scss">
  .equipment__page-main {
    display: flex;
    width: 100%;
    padding: 20px 40px;
    gap: 10px;
    font-family: $font-family-base;
  }

  .equipment-page__table {
    width: 75%;
  }

  .table__header {
    position: sticky;
    top: 0;
    z-index: 2;
    display: grid;
    width: 100%;
    padding: 12px 8px;
    background-color: white;
    grid-template-columns: 5% 25% 10% 10% 15% 15% 10% 10%;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);

    .table__cell {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .table__body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .table__row {
    display: grid;
    padding: 12px 8px;
    border-radius: 10px;
    grid-template-columns: 5% 25% 10% 10% 15% 15% 10% 10%;

    .table__cell {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 4px;
      text-align: center;
      font-size: 16px;

      p {
        margin: 0;
      }
    }

    .body-cell-id {
      gap: 8px;

      .body-cell-id-wrapper {
        display: flex;
        align-items: center;
      }
    }

    .body-cell-suitability {
      justify-content: center;
    }

    .body-cell-actions {
      justify-content: flex-end;

      .action-buttons {
        display: flex;
        gap: 8px;
      }
    }
  }

  .table__row--details {
    margin-top: -10px;
    padding: 16px;
    border-radius: 0 0 10px 10px;
    background-color: rgba($color-light, 0.98);
    grid-column: 1 / -1;
  }

  .table__button-delete,
  .table__button-cancel,
  .table__button-save {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      transition: transform 0.2s ease;
    }
  }

  .icon-action {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .input-field {
    width: 100%;
    margin: -4px 0;
  }

  .editing-row {
    background-color: rgba($color-light, 0.98);
  }
</style>
