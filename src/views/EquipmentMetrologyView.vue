<template>
  <div class="equipment__page-personal-main">
    <div class="equipment__page-personal-table-wrapper">
      <table class="equipment__page-personal-table">
        <thead class="equipment__page-table-header">
          <tr class="equipment__page-table-header-columns">
            <th class="equipment__page-table-header-id">№</th>
            <th class="equipment__page-table-header-name">Наименование оборудования</th>
            <th class="equipment__page-table-header-type">Тип СИ</th>
            <th class="equipment__page-table-header-verification-date">Дата начала поверки</th>
            <th class="equipment__page-table-header-verification-valid">Дата окончания поверки</th>
            <th class="equipment__page-table-header-verification-number">Номер свидетельства</th>
            <th class="equipment__page-table-header-suitability">Пригодность</th>
            <th class="equipment__page-table-header-action"></th>
          </tr>
        </thead>
        <tbody class="equipment__page-personal-table-body">
          <tr
            v-for="(item, index) in equipments"
            :key="item.uuid ?? index"
            :class="[{ editing: editingId === (item.uuid ?? index) }, item.status]"
            class="equipment__page-table-columns"
          >
            <td class="equipment__page-table-cell-id">
              <div class="equipment__page-table-cell-id-wrapper">
                <p class="equipment__page-table-value">{{ index + 1 }}</p>
              </div>
              <VButton class="equipment__page-button-delete">
                <img
                  v-if="editingId === (item.uuid ?? index)"
                  src="@/assets/icons/sections/buttons/basket-delete.svg"
                  class="equipment__page-icon-action"
                  alt="delete.svg"
                  @click="deleteItem(item.uuid)"
                />
              </VButton>
            </td>

            <td class="equipment__page-table-cell-name">
              <p
                v-if="!editingId"
                class="equipment__page-table-value"
              >
                {{ item.name }}
              </p>
              <VInput
                v-else
                v-model="item.name"
                type="text"
                :value="item.name"
                color="white"
                class="equipment__page-table-field"
              />
            </td>
            <td class="equipment__page-table-cell-type">
              <p
                v-if="!editingId"
                class="equipment__page-table-value"
              >
                {{ item.type }}
              </p>
              <VInput
                v-else
                v-model="item.type"
                :value="item.type"
                type="text"
                color="white"
                class="equipment__page-table-field"
              />
            </td>
            <td class="equipment__page-table-cell-verification-date">
              <p
                v-if="!editingId"
                class="equipment__page-table-value"
              >
                {{ item.verification_date }}
              </p>
              <VInput
                v-else
                v-model="item.verification_date"
                type="text"
                :value="item.verification_date"
                color="white"
                class="equipment__page-table-field"
              />
            </td>
            <td class="equipment__page-table-cell-verification-valid">
              <p
                v-if="!editingId"
                class="equipment__page-table-value"
              >
                {{ item.verification_valid }}
              </p>
              <VInput
                v-else
                v-model="item.verification_valid"
                type="text"
                :value="item.verification_valid"
                color="white"
                class="equipment__page-table-field"
              />
            </td>
            <td class="equipment__page-table-cell-verification-number">
              <p
                v-if="!editingId"
                class="equipment__page-table-value"
              >
                {{ item.verification_number }}
              </p>
              <VInput
                v-else
                v-model="item.verification_number"
                type="text"
                :value="item.verification_number"
                color="white"
                class="equipment__page-table-field"
              />
            </td>
            <td class="equipment__page-table-cell-suitability">
              <p
                v-if="!editingId"
                class="equipment__page-table-value"
              >
                <img
                  :src="item.suitability ? tickIcon : crossIcon"
                  alt="suitability.svg"
                />
              </p>
            </td>

            <td class="person__page-table-cell-actions">
              <div class="action-buttons">
                <div
                  v-if="editingId === (item.uuid ?? index)"
                  class="person__page-table-action-buttons"
                >
                  <VButton class="equipment__page-button-cancel">
                    <img
                      v-if="editingId === (item.uuid ?? index)"
                      src="@/assets/icons/sections/buttons/cross-cancel.svg"
                      class="equipment__page-icon-action"
                      alt="cancel.svg"
                      @click="cancelEdit"
                    />
                  </VButton>

                  <VButton class="equipment__page-button-save">
                    <img
                      v-if="editingId === (item.uuid ?? index)"
                      class="equipment__page-icon-action"
                      src="@/assets/icons/sections/buttons/tick-save.svg"
                      alt="save.svg"
                      @click="saveEdit(item)"
                    />
                  </VButton>

                  <VButton class="equipment__page-button-edit">
                    <p>{{ 'Скрыть' ? editingId : 'Подробнее...' }}</p>
                  </VButton>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

  const editingId = ref(null);
  const originalItem = ref(null);

  const equipments = ref([]);

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

  // const addEquipment = async () => {
  //   const { name, serial, certificateNumber, certificateDate, validDate } = newItem.value;
  //
  //   if (!name || !serial || !certificateNumber || !certificateDate || !validDate) {
  //     return;
  //   }
  //
  //   const payload = {
  //     name: name.trim(),
  //     number_serial: serial.trim(),
  //     verification_number: certificateNumber.trim(),
  //     verification_date: certificateDate,
  //     valid_date: newItem.value.validDate,
  //   };
  //
  //   try {
  //     await apiClient.post('/user/equipment/metrology/add_equipment', payload);
  //
  //     await getEquipments();
  //
  //     newItem.value = {
  //       name: '',
  //       serial: '',
  //       certificateNumber: '',
  //       certificateDate: '',
  //       validDate: '',
  //     };
  //   } catch (error) {
  //     console.error('Ошибка добавления оборудования:', error);
  //   }
  // };

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
  .equipment__page-personal-main {
    display: flex;
    width: 100%;
    padding: 20px 40px;
    font-family: $font-family-base;
    gap: 20px;

    .equipment__page-personal-table-wrapper {
      overflow-y: auto;
      width: 80%;
      max-height: calc(100vh - 170px);
      margin-right: 2.5%;

      .equipment__page-personal-table {
        width: 100%;
        border-spacing: 0 10px;
        border-collapse: separate;

        .equipment__page-table-header {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: white;

          .equipment__page-table-header-columns {
            .equipment__page-table-header-id {
              width: 5%;
            }

            .equipment__page-table-header-name {
              width: 20%;
            }

            .equipment__page-table-header-type {
              align-items: center;
              width: 5%;
            }

            .equipment__page-table-header-verification-date {
              width: 10%;
              text-align: center;
            }

            .equipment__page-table-header-verification-valid {
              width: 10%;
              text-align: center;
            }

            .equipment__page-table-header-verification-number {
              width: 15%;
              text-align: center;
            }

            .equipment__page-table-header-suitability {
              width: 10%;
              text-align: center;
            }

            .equipment__page-table-header-action {
              width: 10%;
            }

            th {
              padding: 12px 8px;
              text-align: left;
              font-size: 16px;
            }
          }
        }

        .equipment__page-personal-table-body {
          .equipment__page-table-columns {
            width: 100%;
            background-color: inherit;
            font-size: 16px;
            box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
            transition: all 0.3s ease;

            td {
              padding: 12px 8px;
              background-color: $color-light;
              vertical-align: middle;
              text-align: left;
            }

            .equipment__page-table-cell-id {
              width: 5%;

              .equipment__page-table-cell-id-wrapper {
                display: flex;
                align-items: center;
                gap: 8px;
              }
            }

            .equipment__page-table-cell-name {
              width: 20%;
            }

            .equipment__page-table-cell-type {
              align-items: center;
              width: 5%;
            }

            .equipment__page-table-cell-verification-date {
              width: 10%;
              text-align: center;
            }

            .equipment__page-table-cell-verification-valid {
              width: 10%;
              text-align: center;
            }

            .equipment__page-table-cell-verification-number {
              width: 15%;
            }

            .equipment__page-table-cell-suitability {
              width: 10%;
              text-align: center;
            }

            .person__page-table-cell-actions {
              width: 10%;

              .action-buttons {
                display: flex;
                gap: 8px;
                justify-content: flex-end;

                .person__page-table-action-buttons {
                  display: flex;
                }
              }
            }

            td:first-child {
              border-bottom-left-radius: 10px;
              border-top-left-radius: 10px;
            }

            td:last-child {
              border-bottom-right-radius: 10px;
              border-top-right-radius: 10px;
            }

            .equipment__page-table-value {
              margin: 0;
              padding: 8px 0;
            }

            .equipment__page-table-field {
              width: 100%;
              margin: -4px 0;
            }

            .equipment__page-button-edit,
            .equipment__page-button-cancel,
            .equipment__page-button-delete,
            .equipment__page-button-save {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;
              margin: 0.2rem;
              padding: 0;
              border: none;
              background: transparent;
              cursor: pointer;

              &:hover {
                transform: scale(1.1);
                transition: transform 0.2s ease;
              }
            }

            .equipment__page-icon-action {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgb(0 0 0 / 15%);
            }
          }
        }
      }
    }
  }
</style>
