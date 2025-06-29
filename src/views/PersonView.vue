<template>
  <div class="person__page-main">
    <div class="person__page-table-wrapper">
      <div class="person__page-table-header">
        <table class="person__page-table-columns">
          <thead>
            <tr>
              <th class="person__page-table-header-id">№</th>
              <th class="person__page-table-header-fio">ФИО</th>
              <th class="person__page-table-header-phone">Номер телефона</th>
              <th class="person__page-table-header-certificate-number">Номер аттестата</th>
              <th class="person__page-table-header-certificate-date">Дата аттестата</th>
              <th class="person__page-table-header-certificate-valid-date">Окончание аттестата</th>
              <th class="person__page-table-header-equipments">Закрепленное оборудование</th>
              <th class="person__page-table-header-action"></th>
            </tr>
          </thead>
          <tbody class="person__page-table-body">
            <tr
              v-for="(item, index) in persons"
              :key="item.uuid ?? index"
              :class="[{ editing: editingId === (item.uuid ?? index) }, item.status]"
            >
              <td class="person__page-table-cell-id">
                <div class="person__page-table-cell-id-wrapper">
                  <p class="person__page-table-value">{{ index + 1 }}</p>
                </div>
                <img
                  v-if="editingId === (item.uuid ?? index)"
                  src="@/assets/icons/sections/buttons/basket-delete.svg"
                  class="person__page-icon-delete"
                  alt="delete.svg"
                  @click="deleteItem(item.uuid)"
                />
              </td>

              <td class="person__page-table-cell-fio">
                <p
                  v-if="!editingId"
                  class="person__page-table-value"
                >
                  {{ item.fio }}
                </p>
                <VInput
                  v-else
                  v-model="item.fio"
                  type="text"
                  :value="item.fio"
                  color="white"
                />
              </td>
              <td class="person__page-table-cell-phone">
                <p
                  v-if="!editingId"
                  class="person__page-table-value"
                >
                  {{ item.number_phone }}
                </p>
                <VInput
                  v-else
                  v-model="item.number_phone"
                  :value="item.number_phone"
                  type="text"
                  color="white"
                />
              </td>
              <td class="person__page-table-cell-certificate-number">
                <p
                  v-if="!editingId"
                  class="person__page-table-value"
                >
                  {{ item.certificate_number }}
                </p>
                <VInput
                  v-else
                  v-model="item.certificate_number"
                  type="text"
                  :value="item.certificate_number"
                  color="white"
                />
              </td>
              <td class="person__page-table-cell-certificate-date">
                <p
                  v-if="!editingId"
                  class="person__page-table-value"
                >
                  {{ item.certificate_date }}
                </p>
                <VInput
                  v-else
                  v-model="item.certificate_date"
                  type="text"
                  :value="item.certificate_date"
                  color="white"
                />
              </td>
              <td class="person__page-table-cell-certificate-valid-date">
                <p
                  v-if="!editingId"
                  class="person__page-table-value"
                >
                  {{ item.certificate_valid_date }}
                </p>
                <VInput
                  v-else
                  v-model="item.certificate_valid_date"
                  type="text"
                  :value="item.certificate_valid_date"
                  color="white"
                />
              </td>
              <td class="person__page-table-cell-equipments">
                <p
                  v-if="!editingId"
                  class="person__page-table-value"
                >
                  {{}}
                </p>
                <VInput
                  v-else
                  v-model="item.equipments"
                  type="text"
                  color="white"
                />
              </td>

              <td class="actions-cell">
                <div class="last-cell">
                  <img
                    v-if="editingId === (item.uuid ?? index)"
                    src="@/assets/icons/sections/buttons/cross-cancel.svg"
                    class="person__page-icon-cancel"
                    alt="cancel.svg"
                    @click="cancelEdit"
                  />
                  <img
                    v-if="editingId === (item.uuid ?? index)"
                    class="person__page-icon-save"
                    src="@/assets/icons/sections/buttons/tick-save.svg"
                    alt="save.svg"
                    @click="saveEdit(item)"
                  />

                  <img
                    v-if="editingId !== (item.uuid ?? index)"
                    class="person__page-icon-edit"
                    src="@/assets/icons/sections/buttons/pencil-edit.svg"
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

    <div class="person__page-menu">
      <div class="person__page-menu-download">
        <div class="person__page-menu-download-import">
          <img
            src=""
            alt="import.svg"
          />
        </div>

        <div class="person__page-menu-download-export">
          <img
            src=""
            alt="export.svg"
          />
        </div>
      </div>

      <div class="person__page-menu-form">
        <p>Добавить нового сотрудника вручную можно в форме ниже:</p>

        <PersonAdditionForm />
      </div>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { ref, onMounted } from 'vue';

  // composables.
  import apiClient from '@/composables/api/apiClient.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import PersonAdditionForm from '@/components/forms/PersonAdditionForm.vue';

  const persons = ref([]);
  const editingId = ref(null);
  const originalItem = ref(null);

  onMounted(() => {
    getPersons();
  });

  const getPersons = async () => {
    try {
      const response = await apiClient.get('/user/person/persons');

      persons.value = response.data.map((person) => ({
        uuid: person.uuid,
        organization_id: person.organization_id,
        fio: person.fio,
        certificate_number: person.certificate_number,
        certificate_date: person.certificate_date,
        number_phone: person.number_phone,
        certificate_valid_date: person.certificate_valid_date,
        equipments: person.equipments,
      }));
    } catch (err) {
      console.error('Ошибка загрузки сотрудников:', err);
    }
  };

  const deleteItem = async (item) => {
    try {
      await apiClient.delete('/user/person/delete_person', {
        data: { uuid: item.uuid },
      });

      await getPersons();
    } catch (error) {
      console.error('Ошибка удаления:', error);

      if (error.response) {
        console.error('Ответ сервера:', error.response.data);
      }
    }
  };

  const toggleEdit = (item, index) => {
    originalItem.value = { ...item };
    editingId.value = item.uuid ?? index;
  };

  const cancelEdit = () => {
    const index = persons.value.findIndex((person) => person.uuid === originalItem.value.uuid);
    if (index !== -1) {
      persons.value[index] = { ...originalItem.value };
    }
    editingId.value = null;
    originalItem.value = null;
  };

  const saveEdit = async (person) => {
    try {
      const data = {
        uuid: person.uuid,
        fio: person.fio.trim(),
        certificate_number: person.certificate_number,
        certificate_date: person.certificate_date,
        certificate_valid_date: person.certificate_valid_date,
        number_phone: person.number_phone,
        equipments: person.equipments,
      };

      await apiClient.patch('/user/person/edit_person', data);

      await getPersons();
    } catch (error) {
      console.error('Ошибка редактирования:', error);
    } finally {
      editingId.value = null;
      originalItem.value = null;
    }
  };
</script>

<style scoped lang="scss">
  .person__page-main {
    display: flex;
    width: 100%;
    padding: 20px 40px;
    font-family: $font-family-base;
    gap: 20px;

    .person__page-table-wrapper {
      overflow-y: auto;
      width: 75%;
      height: calc(100vh - 170px);
      margin-right: 2.5%;

      .person__page-table-header {
        width: 100%;
        border-spacing: 0 25px;
        text-align: center;
        font-size: 16px;
        border-collapse: separate;

        .person__page-table-header-id {
          width: 2%;
        }

        .person__page-table-header-fio {
          width: 38%;
        }

        .person__page-table-header-phone {
          width: 20%;
        }

        .person__page-table-header-certificate-number {
          width: 20%;
        }

        .person__page-table-header-certificate-date {
          width: 20%;
        }

        .person__page-table-header-certificate-valid-date {
          width: 20%;
        }

        .person__page-table-header-equipments {
          width: 25%;
        }

        .person__page-table-header-action {
          width: 20%;
        }
      }

      .person__page-table-columns {
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

        .person__page-icon-delete {
          margin-top: 25px;
          cursor: pointer;
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

        .person__page-icon-edit,
        .person__page-icon-cancel,
        .person__page-icon-delete,
        .person__page-icon-save {
          width: 25px;
          cursor: pointer;
        }

        .person__page-icon-save {
          margin-top: 20px;
        }

        input[readonly] {
          background-color: #f4f4f4;
          color: #888;
          cursor: not-allowed;
        }
      }

      .person__page-table-body {
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

        .person__page-table-body::-webkit-scrollbar {
          width: 4px;
        }

        .person__page-table-body::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: #1565c0;
        }

        .person__page-table-body::-webkit-scrollbar-thumb:hover {
          background-color: #0d47a1;
        }
      }
    }

    .person__page-menu {
      display: flex;
      width: 25%;
      flex-direction: column;
    }
  }
</style>
