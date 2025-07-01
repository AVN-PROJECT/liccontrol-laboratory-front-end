<template>
  <div class="person__page-main">
    <div class="person__page-table-wrapper">
      <table class="person__page-table">
        <thead class="person__page-table-header">
          <tr class="person__page-table-header-columns">
            <th class="person__page-table-header-id">№</th>
            <th class="person__page-table-header-fio">ФИО</th>
            <th class="person__page-table-header-phone">Номер телефона</th>
            <th class="person__page-table-header-certificate-number">Номер аттестата</th>
            <th class="person__page-table-header-certificate-date">Дата аттестата</th>
            <th class="person__page-table-header-certificate-valid-date">Окончание аттестации</th>
            <th class="person__page-table-header-equipments">Закрепленное оборудование</th>
            <th class="person__page-table-header-action"></th>
          </tr>
        </thead>
        <tbody class="person__page-table-body">
          <tr
            v-for="(item, index) in persons"
            :key="item.uuid ?? index"
            :class="[{ editing: editingId === (item.uuid ?? index) }, item.status]"
            class="person__page-table-columns"
          >
            <td class="person__page-table-cell-id">
              <div class="person__page-table-cell-id-wrapper">
                <p class="person__page-table-value">{{ index + 1 }}</p>
              </div>
              <VButton
                v-if="editingId === (item.uuid ?? index)"
                class="person__page-button-delete"
                @click="deleteItem(item.uuid)"
              >
                <img
                  src="@/assets/icons/sections/buttons/basket-delete.svg"
                  class="person__page-icon-delete"
                  alt="delete.svg"
                />
              </VButton>
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
                class="person__page-table-field"
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
                class="person__page-table-field"
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
                class="person__page-table-field"
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
                class="person__page-table-field"
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
                class="person__page-table-field"
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
                class="person__page-table-field"
              />
            </td>

            <td class="person__page-table-cell-actions">
              <div class="last-cell">
                <VButton
                  class="person__page-button-cancel"
                  @click="cancelEdit"
                >
                  <img
                    v-if="editingId === (item.uuid ?? index)"
                    src="@/assets/icons/sections/buttons/cross-cancel.svg"
                    class="person__page-icon-cancel"
                    alt="cancel.svg"
                  />
                </VButton>
                <VButton
                  class="person__page-button-save"
                  @click="saveEdit(item)"
                >
                  <img
                    v-if="editingId === (item.uuid ?? index)"
                    class="person__page-icon-save"
                    src="@/assets/icons/sections/buttons/tick-save.svg"
                    alt="save.svg"
                  />
                </VButton>

                <VButton
                  class="person__page-button-edit"
                  @click="toggleEdit(item, index)"
                >
                  <img
                    v-if="editingId !== (item.uuid ?? index)"
                    class="person__page-icon-edit"
                    src="@/assets/icons/sections/buttons/pencil-edit.svg"
                    alt="edit.svg"
                  />
                </VButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  import VButton from '@/components/ui/VButton.vue';
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

  const deleteItem = async (uuid) => {
    try {
      await apiClient.delete('/user/person/delete_person', {
        data: { uuid: uuid },
      });

      window.location.reload();
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
      width: 80%;
      height: calc(100vh - 170px);
      margin-right: 2.5%;

      .person__page-table {
        width: 100%;
        border-spacing: 0 10px;
        border-collapse: separate;

        .person__page-table-header {
          .person__page-table-header-columns {
            .person__page-table-header-id {
              width: 5%;
            }

            .person__page-table-header-fio {
              width: 30%;
            }

            .person__page-table-header-phone {
              width: 20%;
            }

            .person__page-table-header-certificate-number {
              width: 15%;
            }

            .person__page-table-header-certificate-date {
              width: 15%;
            }

            .person__page-table-header-certificate-valid-date {
              width: 10%;
            }

            .person__page-table-header-equipments {
              width: 15%;
            }

            .person__page-table-header-action {
              width: 10%;
            }

            th {
              font-size: 16px;
            }
          }
        }

        .person__page-table-body {
          .person__page-table-columns {
            width: 100%;
            background-color: inherit;
            text-align: center;
            font-size: 16px;
            box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
            transition: all 0.3s ease;

            .person__page-table-cell-id {
              width: 5%;
            }

            .person__page-table-cell-fio {
              width: 30%;
            }

            .person__page-table-cell-phone {
              width: 20%;
            }

            .person__page-table-cell-certificate-number {
              width: 15%;
            }

            .person__page-table-cell-certificate-date {
              width: 15%;
            }

            .person__page-table-cell-certificate-valid-date {
              width: 10%;
            }

            .person__page-table-cell-equipments {
              width: 15%;
            }

            .person__page-table-cell-actions {
              width: 10%;
              padding-right: 0.2rem;
              cursor: pointer;
            }

            td {
              background-color: $color-light;
            }

            td:first-child {
              height: 1.5rem;
              border-bottom-left-radius: 10px;
              border-top-left-radius: 10px;
            }

            td:last-child {
              height: 1.5rem;
              border-bottom-right-radius: 10px;
              border-top-right-radius: 10px;
            }

            .person__page-button-edit,
            .person__page-button-cancel,
            .person__page-button-delete,
            .person__page-button-save {
              width: 25px;
              border: 0;
              background: inherit;
              cursor: pointer;

              img {
                margin: 0.5rem;
              }
            }

            .person__page-button-delete,
            .person__page-button-save {
              margin-top: 20px;
            }

            .person__page-button-edit {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;
              margin: 0;
              padding: 0;
              border: 0;
              background: transparent;
              cursor: pointer;

              &:hover {
                transform: scale(1.1);
                transition: transform 0.2s ease;
              }

              .person__page-icon-edit {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgb(0 0 0 / 15%);
            }
          }
        }

        .person__page-table-body::-webkit-scrollbar {
          width: 4px;
        }

        .person__page-table-body::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: $color-blue-light;
        }

        .person__page-table-body::-webkit-scrollbar-thumb:hover {
          background-color: $color-blue-dark;
        }
      }
    }

    .person__page-menu {
      display: flex;
      width: 20%;
      flex-direction: column;
    }
  }
</style>
