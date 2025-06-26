<template>
  <div class="equipment__page-metrology-main">
    <div class="equipment__page-metrology-table-wrapper">
      <div class="equipment__page-metrology-table-header">
        <table class="equipment__page-metrology-table-columns">
          <thead>
            <tr>
              <th class="equipment__page-table-header-id">№</th>
              <th class="equipment__page-table-header-name">Наименование оборудования</th>
              <th class="equipment__page-table-header-type">Тип СИ</th>
              <th class="equipment__page-table-header-verification-date">Дата начала поверки</th>
              <th class="equipment__page-table-header-verification-valid">
                Дата окончания поверки
              </th>
              <th class="equipment__page-table-header-verification-number">Номер свидетельства</th>
              <th class="equipment__page-table-header-suitability">Пригодность</th>
              <th class="equipment__page-table-header-action"></th>
            </tr>
          </thead>
          <tbody class="equipment__page-metrology-table-body">
            <tr
              v-for="(item, index) in equipments"
              :key="item.uuid ?? index"
              :class="[{ editing: editingId === (item.uuid ?? index) }, item.status]"
            >
              <td class="equipment__page-table-cell-id">
                <div class="equipment__page-table-cell-id-wrapper">
                  <p class="equipment__page-table-value">{{ index + 1 }}</p>
                </div>
                <img
                  v-if="editingId === (item.uuid ?? index)"
                  src="@/assets/icons/sections/basket-delete.svg"
                  class="equipment__page-icon-delete"
                  alt="delete.svg"
                  @click="deleteItem(item.uuid)"
                />
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
                />
              </td>
              <td class="equipment__-table-cell-verification-number">
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
                />
              </td>
              <td class="equipment__page-table-cell-suitability">
                <p
                  v-if="!editingId"
                  class="equipment__page-table-value"
                >
                  {{}}
                </p>
                <VInput
                  v-else
                  v-model="item.suitability"
                  type="text"
                  color="white"
                />
              </td>

              <td class="actions-cell">
                <div class="last-cell">
                  <img
                    v-if="editingId === (item.uuid ?? index)"
                    src="@/assets/icons/sections/cross-cancel.svg"
                    class="equipment__page-icon-cancel"
                    alt="cancel.svg"
                    @click="cancelEdit"
                  />
                  <img
                    v-if="editingId === (item.uuid ?? index)"
                    class="equipment__page-icon-save"
                    src="@/assets/icons/sections/tick-save.svg"
                    alt="save.svg"
                    @click="saveEdit(item)"
                  />

                  <img
                    v-if="editingId !== (item.uuid ?? index)"
                    class="equipment__page-icon-edit"
                    src="@/assets/icons/sections/pencil-edit.svg"
                    alt="edit.svg"
                    @click="toggleEdit(item, index)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { onMounted, ref } from 'vue';

  // composables
  import apiClient from '@/composables/apiClient.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';

  const editingId = ref(null);
  const originalItem = ref(null);

  const equipments = ref([]);

  const toggleEdit = (item) => {
    originalItem.value = { ...item };
    editingId.value = item.id;
  };

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
        id: item.uuid,
        name: item.name,
        number_serial: item.number_serial,
        verification_number: item.verification_number,
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
    const index = equipments.value.findIndex((i) => i.id === originalItem.value.id);
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
  .equipment__page-metrology-main {
    display: flex;
    width: 100%;
    padding: 20px 40px;
    font-family: $font-family-base;
    gap: 20px;

    .equipment__page-metrology-table-wrapper {
      overflow-y: auto;
      width: 75%;
      height: calc(100vh - 170px);
      margin-right: 2.5%;

      .equipment__page-metrology-table-header {
        width: 100%;
        border-spacing: 0 25px;
        text-align: center;
        font-size: 16px;
        border-collapse: separate;

        .equipment__page-table-header-id {
          width: 2%;
        }

        .equipment__page-table-header-name {
          width: 38%;
        }

        .equipment__page-table-header-type {
          width: 20%;
        }

        .equipment__page-table-header-verification-date {
          width: 20%;
        }

        .equipment__page-table-header-verification-valid {
          width: 20%;
        }

        .equipment__page-table-header-verification-number {
          width: 20%;
        }

        .equipment__page-table-header-suitability {
          width: 25%;
        }

        .equipment__page-table-header-action {
          width: 20%;
        }
      }

      .equipment__page-metrology-table-columns {
        width: 100%;
        border-spacing: 0 25px;
        text-align: center;
        font-size: 16px;
        border-collapse: separate;

        td {
          padding-right: 12px;
          vertical-align: top;
        }

        thead th {
          position: sticky;
          top: 0;
          z-index: 10;
          padding: 10px;
          text-align: center;
          font-weight: 600;
        }

        .actions-cell {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          gap: 8px;
          float: right;
          cursor: pointer;
        }

        .last-cell {
          display: flex;
          flex-direction: column;
        }

        .equipment__page-icon-edit,
        .equipment__page-icon-cancel,
        .equipment__page-icon-delete,
        .equipment__page-icon-save {
          width: 25px;
          cursor: pointer;
        }

        .equipment__page-icon-save {
          margin-top: 20px;
        }
      }

      .equipment__page-metrology-table-body {
        box-sizing: content-box;
        overflow-y: auto;
        max-height: calc(100vh - 270px);
        scrollbar-width: thin;
        scrollbar-color: #1565c0 transparent;

        tr {
          background-color: #fff;

          td:first-child {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
        }

        td {
          padding: 15px 8px;

          button {
            border: none;
            background: none;
            font-size: 1.2rem;
            cursor: pointer;
          }

          thead th {
            position: sticky;
            top: 0;
            z-index: 10;
            text-align: center;
            font-weight: 600;
          }
        }

        .equipment__page-metrology-table-body::-webkit-scrollbar {
          width: 4px;
        }

        .equipment__page-metrology-table-body::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: #1565c0;
        }

        .equipment__page-metrology-table-body::-webkit-scrollbar-thumb:hover {
          background-color: #0d47a1;
        }
      }
    }
  }
</style>
