<template>
  <div class="equipment__page-main">
    <div class="equipment-page__table table">
      <div class="table__header">
        <div class="table__cell header-cell-id">№</div>
        <div class="table__cell header-cell-type">Наименование оборудования</div>
        <div class="table__cell header-cell-date">Серийный номер</div>
        <div class="table__cell header-cell-valid">Адрес эксплуатации</div>
        <div class="table__cell header-cell-number">Номер договора</div>
        <div class="table__cell header-cell-suitability">Ответственный сотрудник</div>
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
                  <p>{{ index + 1 }}</p>
                </div>

                <div class="table__cell body-cell-name">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.name }}</p>

                  <VInput
                    v-else
                    v-model="item.name"
                    type="text"
                    :value="item.name"
                    color="white"
                    class="input-field"
                  />
                </div>
                <div class="table__cell body-cell-number-serial">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.number_serial }}</p>
                  <VInput
                    v-else
                    v-model="item.number_serial"
                    type="text"
                    :value="item.number_serial"
                    color="white"
                    class="input-field"
                  />
                </div>
                <div class="table__cell body-cell-address-operating">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.address_operating }}</p>
                  <VInput
                    v-else
                    v-model="item.address_operating"
                    type="text"
                    :value="item.address_operating"
                    color="white"
                    class="input-field"
                  />
                </div>
                <div class="table__cell body-cell-agreement-number">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.agreement_number }}</p>
                  <VInput
                    v-else
                    v-model="item.agreement_number"
                    type="text"
                    :value="item.agreement_number"
                    color="white"
                    class="input-field"
                  />
                </div>
                <div class="table__cell body-cell-person">
                  <p v-if="editingId !== (item.uuid ?? index)">{{ item.person }}</p>
                  <VInput
                    v-else
                    v-model="item.person"
                    type="text"
                    :value="item.person"
                    color="white"
                    class="input-field"
                  />
                </div>

                <div class="table__cell body-cell-actions">
                  <VButton
                    class="table__button--details"
                    @click="toggleDetails(item.uuid ?? index)"
                  >
                    <div class="button__details--wrapper">
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

                <div class="row__details--row">
                  <div class="table__cell body-cell-organization-owner">
                    <p class="cell__header--text">Организация-арендатор</p>
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
                        class="input-field"
                      />
                    </div>
                  </div>
                  <div class="table__cell body-cell-verification-number">
                    <p class="cell__header--text">Номер свидетельства</p>
                    <div class="cell__header--content">
                      <p v-if="editingId !== (item.uuid ?? index)">
                        {{ item.verification_number }}
                      </p>
                      <VInput
                        v-else
                        v-model="item.verification_number"
                        type="text"
                        :value="item.verification_number"
                        color="white"
                        class="input-field"
                      />
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
      </div>
      <div class="menu__addition">
        <EquipmentPersonalForm @equipment-addition="addEquipment" />
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
  import triangleUpIcon from '@/assets/icons/sections/legends/triangle-up.svg';
  import triangleDownIcon from '@/assets/icons/sections/legends/triangle-down.svg';
  import AccordionComponent from '@/components/modules/AccordionComponent.vue';
  import EquipmentPersonalForm from '@/components/forms/EquipmentPersonalForm.vue';

  // constants.
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

  const toggleEdit = (item, index) => {
    originalItem.value = { ...item };
    editingId.value = item.uuid ?? index;
  };

  const getEquipments = async () => {
    const response = await apiClient.get('/user/equipment/personal/equipments');

    if (response.status === 200 && Array.isArray(response.data)) {
      equipments.value = response.data.map((item) => ({
        uuid: item.uuid,
        name: item.name,
        number_serial: item.number_serial,
        organization_owner: item.organization_owner,
        address_operating: item.address_operating,
        agreement_number: item.agreement_number,
        person: item.person,
        verification_number: item.verification_number,
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

  const addEquipment = async (newEquipment) => {
    try {
      await apiClient.post('/user/equipment/personal/add_equipment', newEquipment);

      await getEquipments();
    } catch (error) {
      console.error(error);
    }
  };

  const saveEdit = async (item) => {
    try {
      const data = {
        uuid: item.uuid,
        name: item.name,
        number_serial: item.number_serial,
      };

      await apiClient.patch('/user/equipment/personal/edit_equipment', data);

      editingId.value = null;
      originalItem.value = null;

      await getEquipments();
    } catch (error) {
      console.error('Ошибка при сохранении изменений:', error);
    }
  };

  const deleteItem = async (uuid) => {
    try {
      await apiClient.delete('/user/equipment/personal/delete_equipment', {
        data: { uuid: uuid },
      });

      await getEquipments();
    } catch (error) {
      console.error('Ошибка удаления оборудования:', error);
    }
  };

  const exportEquipment = async () => {
    const response = await apiClient.get('/user/equipment/personal/export_equipments');

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
    background-color: white;
    grid-template-columns: 5% 25% 10% 15% 15% 15% 10% 10%;
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
  }

  .table__row {
    display: grid;
    padding: 12px 8px;
    border-radius: 10px;
    grid-template-columns: 5% 25% 10% 15% 15% 15% 10% 10%;

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

  .table__row--details {
    display: flex;
    max-height: 170px;
    margin-top: -10px;
    padding: 16px;
    border-radius: 0 0 10px 10px;
    background-color: rgba($color-light, 0.98);
    grid-column: 1 / -1;

    .cell__header--text {
      align-content: center;
      text-align: center;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: bold;
    }

    .cell__header--content {
      text-align: center;
      font-size: 14px;
    }
  }

  .row__details--row {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: 2rem;
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

  .table__button--details {
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

  .input-field {
    width: 100%;
    margin-bottom: 1.5rem;
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
    }

    .menu__addition {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 3rem;
      flex-direction: column;
    }
  }
</style>
