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
              <div class="table__row">
                <div class="table__cell body-cell-id">
                  <p class="cell__id--text">{{ index + 1 }}</p>
                </div>

                <div class="table__cell body-cell-name">
                  <a
                    v-if="editingId !== (item.uuid ?? index)"
                    class="cell__name--link"
                    :href="item.link"
                  >
                    <p class="cell__name--text">{{ item.name }}</p>
                  </a>
                  <VInput
                    v-else
                    v-model="item.name"
                    type="text"
                    :value="item.name"
                    color="white"
                    class="cell__field--input"
                  />
                </div>
                <div class="table__cell body-cell-type">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.type }}</p>
                  <VInput
                    v-else
                    v-model="item.type"
                    type="text"
                    :value="item.type"
                    color="white"
                    class="cell__field--input"
                  />
                </div>
                <div class="table__cell body-cell-verification-date">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.verification_date }}</p>
                  <VInput
                    v-else
                    v-model="item.verification_date"
                    type="text"
                    :value="item.verification_date"
                    color="white"
                    class="cell__field--input"
                  />
                </div>
                <div class="table__cell body-cell-verification-valid">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.verification_valid }}</p>
                  <VInput
                    v-else
                    v-model="item.verification_valid"
                    type="text"
                    :value="item.verification_valid"
                    color="white"
                    class="cell__field--input"
                  />
                </div>
                <div class="table__cell body-cell-verification-number">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.verification_number }}</p>
                  <VInput
                    v-else
                    v-model="item.verification_number"
                    type="text"
                    :value="item.verification_number"
                    color="white"
                    class="cell__field--input"
                  />
                </div>

                <div class="table__cell body-cell-suitability">
                  <img :src="item.suitability ? tickIcon : crossIcon" />
                </div>

                <div class="table__cell body-cell-actions">
                  <VButton
                    class="table__button--action"
                    @click="toggleDetails(item.uuid ?? index)"
                  >
                    <div class="button__details--wrapper">
                      <p class="button__wrapper--text">
                        {{ openedRows.includes(item.uuid ?? index) ? 'Скрыть' : 'Подробнее...' }}
                      </p>
                      <img
                        class="button__wrapper--icon"
                        :src="
                          openedRows.includes(item.uuid ?? index)
                            ? triangleUpIcon
                            : triangleDownIcon
                        "
                        alt="triangle.svg"
                      />
                    </div>
                  </VButton>
                </div>
              </div>
            </template>

            <template
              v-if="openedRows.includes(item.uuid ?? index)"
              #accordion-body
            >
              <div class="table__row--details">
                <div class="row__details--buttons-left">
                  <VButton
                    class="table__button-delete"
                    @click="deleteItem(item.uuid)"
                  >
                    <img
                      src="@/assets/icons/sections/buttons/basket-delete.svg"
                      class="table__button-delete-icon"
                      alt="delete.svg"
                    />
                  </VButton>
                </div>

                <div class="row__details-rows">
                  <div class="row__details--upper">
                    <div class="table__cell body-cell-verification-organization">
                      <p class="cell__header--text">Организация-поверитель</p>
                      <div class="cell__header--content">
                        <p v-if="editingId !== (item.uuid ?? index)">
                          {{ item.verification_organization }}
                        </p>
                        <VInput
                          v-else
                          v-model="item.verification_organization"
                          type="text"
                          :value="item.verification_organization"
                          color="white"
                          class="cell__field--input"
                        />
                      </div>
                    </div>
                    <div class="table__cell body-cell-number-serial">
                      <p class="cell__header--text">Серийный номер</p>
                      <div class="cell__header--content">
                        <p v-if="editingId !== (item.uuid ?? index)">{{ item.number_serial }}</p>
                        <VInput
                          v-else
                          v-model="item.number_serial"
                          type="text"
                          :value="item.number_serial"
                          color="white"
                          class="cell__field--input"
                        />
                      </div>
                    </div>
                    <div class="table__cell body-cell-address-operating">
                      <p class="cell__header--text">Адрес эксплуатации</p>
                      <div class="cell__header--content">
                        <p v-if="editingId !== (item.uuid ?? index)">
                          {{ item.address_operating }}
                        </p>
                        <VInput
                          v-else
                          v-model="item.address_operating"
                          type="text"
                          :value="item.address_operating"
                          color="white"
                          class="cell__field--input"
                        />
                      </div>
                    </div>
                    <div class="table__cell body-cell-agreement-number">
                      <p class="cell__header--text">Номер договора</p>
                      <div class="cell__header--content">
                        <p v-if="editingId !== (item.uuid ?? index)">
                          {{ item.agreement_number }}
                        </p>
                        <VInput
                          v-else
                          v-model="item.agreement_number"
                          type="text"
                          :value="item.agreement_number"
                          color="white"
                          class="cell__field--input"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row__details-lower">
                    <div class="table__cell body-cell-person">
                      <p class="cell__header--text">Ответственный сотрудник</p>
                      <div class="cell__header--content">
                        <p v-if="editingId !== (item.uuid ?? index)">{{ item.person }}</p>
                        <VInput
                          v-else
                          v-model="item.person"
                          type="text"
                          :value="item.person"
                          color="white"
                          class="cell__field--input"
                        />
                      </div>
                    </div>

                    <div class="table__cell body-cell-organization-owner">
                      <p class="cell__header--text">Организация</p>
                      <div class="cell__header--content">
                        <p v-if="editingId !== (item.uuid ?? index)">
                          {{ item.organization_owner }}
                        </p>
                        <VInput
                          v-else
                          v-model="item.organization_owner"
                          type="text"
                          :value="item.organization_owner"
                          color="white"
                          class="cell__field--input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row__details--buttons-right">
                  <VButton
                    class="table__button-edit"
                    @click="toggleEdit(item, index)"
                  >
                    <img
                      class="person__page-icon-action"
                      src="@/assets/icons/sections/buttons/pencil-edit.svg"
                      alt="edit.svg"
                    />
                  </VButton>

                  <VButton
                    v-if="editingId === (item.uuid ?? index)"
                    class="table__button-save"
                  >
                    <img
                      class="icon-action"
                      src="@/assets/icons/sections/buttons/tick-save.svg"
                      alt="save.svg"
                      @click="saveEdit(item)"
                    />
                  </VButton>
                  <VButton
                    v-if="editingId === (item.uuid ?? index)"
                    class="table__button-cancel"
                  >
                    <img
                      src="@/assets/icons/sections/buttons/cross-cancel.svg"
                      class="icon-action"
                      alt="cancel.svg"
                      @click="cancelEdit"
                    />
                  </VButton>
                </div>
              </div>
            </template>
          </AccordionComponent>
        </template>
      </div>
    </div>

    <div class="equipment__page-menu">
      <div class="menu__download">
        <div class="download__buttons">
          <VButton class="button__import">
            <img
              class="button__import--icon"
              src="@/assets/icons/sections/buttons/excel-import.svg"
              alt="excel-import.svg"
            />
          </VButton>
          <VButton
            class="button__export"
            @click="exportEquipment"
          >
            <img
              class="button__export--icon"
              src="@/assets/icons/sections/buttons/excel-export.svg"
              alt="excel-export.svg"
            />
          </VButton>
        </div>

        <p class="download__text">
          При импорте оборудование добавляется в
          <b>
            Прочее оборудование
            <b />
          </b>
        </p>
      </div>
      <div class="menu__status">
        <h3 class="menu__status--text">До истечения свидетельства</h3>
        <ul class="menu__status--list">
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
      <div class="menu__addition">
        <h2 class="menu__addition--header">Добавить оборудование</h2>
        <div class="menu__addition--buttons">
          <VButton
            class="addition__button"
            @click="
              additionForm = forms.addition;
              openAddition = !openAddition;
            "
          >
            Вручную
          </VButton>
          <VButton
            class="addition__button"
            @click="
              additionForm = forms.import;
              openAddition = !openAddition;
            "
          >
            Из Аршины
          </VButton>
        </div>
      </div>

      <template v-if="openAddition">
        <div class="equipment__page-modal-form">
          <component
            :is="additionForm"
            @equipment-addition="addEquipment"
            @close-modal="openAddition = false"
            @equipment-import="importEquipment"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { onMounted, ref } from 'vue';

  // composables
  import apiClient from '@/composables/api/apiClient.js';

  // helpers.
  import formatDate from '@/helpers/format/format.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';
  import tickIcon from '@/assets/icons/sections/buttons/tick-save.svg';
  import crossIcon from '@/assets/icons/sections/buttons/cross-cancel.svg';
  import triangleUpIcon from '@/assets/icons/sections/legends/triangle-up.svg';
  import triangleDownIcon from '@/assets/icons/sections/legends/triangle-down.svg';
  import AccordionComponent from '@/components/modules/AccordionComponent.vue';
  import EquipmentMetrologyAdditionForm from '@/components/forms/EquipmentMetrologyAdditionForm.vue';
  import EquipmentMetrologyImportForm from '@/components/forms/EquipmentMetrologyImportForm.vue';

  // constants.
  const forms = {
    addition: EquipmentMetrologyAdditionForm,
    import: EquipmentMetrologyImportForm,
  };

  const editingId = ref(null);
  const originalItem = ref(null);
  const openAddition = ref(false);
  const additionForm = ref(forms.addition);

  const equipments = ref([]);

  const openedRows = ref([]);

  const toggleEdit = (item, index) => {
    originalItem.value = { ...item };
    editingId.value = item.uuid ?? index;
  };

  const toggleDetails = (id) => {
    const index = openedRows.value.indexOf(id);

    if (index === -1) {
      openedRows.value.push(id);
    } else {
      openedRows.value.splice(index, 1);
    }
  };

  const addEquipment = async (newEquipment) => {
    try {
      await apiClient.post('/user/equipment/metrology/add_equipment', newEquipment);
    } catch (error) {
      console.error('Ошибка добавления оборудования:', error);
    }
  };

  const importEquipment = async (newEquipmentImport) => {
    try {
      await apiClient.post('/user/equipment/metrology/import_equipment', newEquipmentImport);

      await getEquipments();
    } catch (error) {
      console.error('Ошибка импорта оборудования:', error);
    }
  };

  const getEquipments = async () => {
    const response = await apiClient.get('/user/equipment/metrology/equipments');

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
        verification_organization: item.verification_organization,
        address_operating: item.address_operating,
        organization_owner: item.organization_owner,
        person: item.person,
        agreement_number: item.agreement_number || null,
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
      const data = {
        uuid: item.uuid,
        name: item.name,
        number_serial: item.number_serial,
        verification_number: item.verification_number,
        verification_date: item.verification_date,
        valid_date: item.validate,
      };

      await apiClient.patch('/user/equipment/metrology/edit_equipment', data);

      editingId.value = null;
      originalItem.value = null;

      await getEquipments();
    } catch (error) {
      console.error('Ошибка при сохранении изменений:', error);
    }
  };

  const deleteItem = async (item) => {
    try {
      await apiClient.delete('/user/equipment/metrology/delete_equipment', {
        params: {
          equipment_id: item.id,
        },
      });

      await getEquipments();
    } catch (error) {
      console.error('Ошибка удаления оборудования:', error);
    }
  };

  const exportEquipment = async () => {
    const response = await apiClient.get('/user/equipment/metrology/export_equipments');

    const link = document.createElement('a');

    link.href = URL.createObjectURL(new Blob([response.data]));
    link.download = 'equipment.xlsx';

    link.click();
  };

  onMounted(async () => {
    await getEquipments();
  });
</script>

<style scoped lang="scss">
  .equipment__page-main {
    position: relative;
    display: flex;
    width: 100%;
    padding: 20px 40px;
    font-family: $font-family-base;
    gap: 10px;
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
    background-color: inherit;
    grid-template-columns: 5% 25% 10% 10% 15% 15% 10% 10%;

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
      grid-template-columns: 5% 25% 10% 10% 15% 15% 10% 10%;

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

      .cell__name--link {
        text-decoration: none;
        color: $color-dark;
      }
    }

    .table__row--details {
      display: flex;
      max-height: 230px;
      margin-top: -10px;
      padding: 16px;
      border-radius: 0 0 10px 10px;
      background-color: rgba($color-light, 0.98);
      grid-column: 1 / -1;

      .cell__header--text {
        margin: 0.2rem;
        text-align: center;
        text-transform: uppercase;
        font-size: 15px;
        font-weight: bold;
      }

      .table__cell {
        padding: 8px 4px;
        text-align: center;
        font-size: 14px;
      }

      .row__details--buttons-right {
        display: flex;
        justify-content: flex-end;
        width: 35%;
        margin: auto 1rem 1rem 1rem;
        gap: 1rem;
      }

      .row__details--buttons-left {
        margin: auto 1rem 1rem 1rem;
      }

      .row__details-rows {
        display: flex;
        place-content: flex-start left;
        width: 100%;
        flex-direction: column;

        .row__details--upper {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .row__details-lower {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
      }
    }

    .table__button--action {
      display: flex;
      border: none;
      background-color: inherit;
      font-weight: bold;
      color: $color-blue-light;

      .button__details--wrapper {
        display: flex;
        align-items: center;

        .button__wrapper--icon {
          margin: 0.4rem;
        }
      }
    }

    .table__button-delete,
    .table__button-edit,
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

    .cell__field--input {
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  .equipment__page-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    flex-direction: column;

    .menu__download {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
      flex-direction: column;

      .download__buttons {
        .button__import,
        .button__export {
          border: none;
          background-color: inherit;
          cursor: pointer;
        }
      }

      .download__text {
        text-align: center;
      }
    }

    .menu__status {
      .menu__status--list {
        display: flex;
        justify-content: left;
        margin: 0;
        padding: 0;
        list-style: none;
        flex-direction: column;

        .list__item {
          display: flex;
          align-items: center;

          .list__item--icon {
            margin: 0.5rem;
          }
        }
      }
    }

    .menu__addition {
      .menu__addition--buttons {
        .addition__button {
          width: 40%;
          height: 3.2rem;
          margin: 0.8rem;
          border-radius: 20px;
          border: none;
          background-color: rgb(56 142 60 / 70%);
          color: $color-light;
          cursor: pointer;
          box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
        }
      }
    }

    .equipment__page-modal-form {
      position: absolute;
      right: 3rem;
      bottom: 0.5rem;
      z-index: 10;
      display: flex;
      justify-content: flex-end;
      width: 35%;
      max-height: 415px;
    }
  }
</style>
