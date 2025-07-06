<template>
  <div class="instruction__page-main">
    <h1>Инструкция по работе сервисом Лицконтроль: Лаборатория</h1>

    <div class="page__description">
      <h2 class="description__header">О сервисе Лицконтроль: Лаборатория</h2>

      <p class="description__header--text">
        ЛицКонтроль: Лаборатория — это цифровой сервис для системной проверки, анализа и управления
        данными о людях, оборудовании и работах производимых Вашей компанией.
      </p>
    </div>

    <div class="page__person">
      <h2 class="page__person-header">1. Страница “Персонал”</h2>

      <div class="person__description">
        <p class="person__description--text">
          Здесь хранится информация о сотрудниках, закреплённом за ними оборудовании и
          контролируются сроки окончания действия аттестаций. Для просмотра истекающих в первую
          очередь аттестаций, в столбцах “Дата аттестации” и “Окончание аттестации” предусмотрена
          сортировка по убыванию/возрастанию.
        </p>
      </div>

      <div class="page__person-about-table">
        <img
          class="page__person-about-table--image"
          src="@/assets/images/screenshots/person/person-table.png"
          alt="person-table.png"
        />
        <p class="page__person-about-table--text">
          При необходимости каждое поле сотрудника может быть отредактировано.
        </p>
      </div>

      <div class="page__person-about-forms">
        <div class="forms__about">
          <p class="forms__about--text">
            Новых сотрудников можно добавить вручную в специальной форме. Также возможен быстрый
            импорт/экспорт данных из файлов Excel.
          </p>
        </div>

        <div class="page__person-about-forms--images">
          <img
            class="page__person-about-forms-images--form"
            src="@/assets/images/screenshots/person/person-form.png"
            alt="person-form.png"
          />
          <img
            class="page__person-about-forms-images--excel"
            src="@/assets/images/screenshots/person/person-excel.png"
            alt="person-excel.png"
          />
        </div>
      </div>
    </div>

    <div class="page__equipment">
      <h2 class="page__equipment-header">2. Страница “Оборудование”</h2>

      <div class="page__equipment--description">
        <p class="equipment__description--text">
          На данной странице ведётся учёт принадлежащего Вам оборудования, которые прошли поверку у
          организаций-поверителей. Оборудование можно добавить автоматически из ФГИС «АРШИН» или
          внести вручную, выбрав соответствующий вариант формы:
        </p>
      </div>

      <div class="page__equipment-images-forms">
        <img
          class="page__equipment-images--form"
          src="@/assets/images/screenshots/equipment/equipment-form.png"
          alt="equipment-form.png"
        />
        <img
          class="page__equipment-images--import"
          src="@/assets/images/screenshots/equipment/equipment-import.png"
          alt="equipment-import.png"
        />
      </div>

      <div class="page__equipment-about-status">
        <div class="equipment__status">
          <p class="equipment__status--text">
            Программа автоматически подсвечивает оборудование с истекающим сроком поверки и будет
            оповещать Вас в окне уведомлений:
          </p>
        </div>
        <div class="equipment__status--images">
          <img
            class="equipment-image--status"
            src="@/assets/images/screenshots/equipment/equipment-status.png"
            alt="equipment-status.png"
          />
          <img
            class="equipment-image--notifications"
            src="@/assets/images/screenshots/equipment/equipment-notification.png"
            alt="equipment-notification.png"
          />
        </div>
      </div>

      <div class="page__equipment-about-filter">
        <img
          class="equipment__filter--image"
          src="@/assets/images/screenshots/equipment/equipment-filter.png"
          alt="equipment-form.png"
        />
        <p class="equipment__filter--text">
          Для отбора определённого оборудования можно воспользоваться фильтром
        </p>
      </div>

      <div class="page__equipment-about-excel">
        <p class="equipment__excel--text">
          Как и на странице “Персонал”, оборудование можно импортировать из файла Excel, но в таком
          случае оно будет добавлено на страницу “Прочее оборудование”:
        </p>

        <img
          class="equipment__excel--images"
          src="@/assets/images/screenshots/equipment/equipment-excel.png"
          alt="equipment-excel.png"
        />
      </div>
    </div>

    <div class="page__equipment-personal">
      <h2 class="page__equipment-personal-header">3. Страница “Прочее оборудование”</h2>

      <p>
        Эта страница содержит оборудование не прошедшее поверку и отсутствующее во ФГИС “Аршин”. Для
        переноса оборудования из “прочего” на страницу поверенного, необходимо заполнить поле “Номер
        свидетельства” и дождаться обновления проверки данных с ФГИС “Аршин”.
      </p>

      <img
        class="page__equipment-personal-table--image"
        src="@/assets/images/screenshots/equipment/equipment-personal-table.png"
        alt="equipment-personal-table.png"
      />
    </div>

    <div class="page__agreement">
      <h2 class="page__agreement-header">4. Страница “Договоры”</h2>

      <p class="page__agreement-description">
        На данной странице ведётся учёт всех договоров Вашей компании. Выполненный договор можно
        завершить нажатием кнопки “Завершить” и он будет добавлен в архив “Завершённые”:
      </p>

      <img
        class="page__agreement-table--image"
        src="@/assets/images/screenshots/agreement/agreement-table.png"
        alt="agreement-table.png"
      />

      <div>
        <img
          class="page__equipment-personal-table--image"
          src="@/assets/images/screenshots/agreement/agreement-status.png"
          alt="agreement-status.png"
        />
      </div>

      <div>
        <div>
          <p>Ниже расположена форма для добавления нового договора.</p>
          <p>
            При добавлении в договор оборудования, будет заполнена информация о договоре в
            соответствующих полях этого оборудования:
          </p>
          <img
            class="page__agreement-table--image"
            src="@/assets/images/screenshots/agreement/agreement-info.png"
            alt="agreement-info.png"
          />
        </div>
      </div>

      <img
        class="page__equipment-personal-table--image"
        src="@/assets/images/screenshots/agreement/agreement-form.png"
        alt="agreement-form.png"
      />
    </div>
  </div>
</template>

<script setup>
  /* JS go here */
</script>

<style scoped lang="scss">
  .instruction__page-main {
    display: flex;
    justify-content: center;
    padding: 5rem;
    text-align: center;
    font-family: $font-family-base;
    flex-direction: column;

    .page__description {
      text-align: left;
      font-size: 1.5rem;
    }

    .page__person {
      text-align: left;

      .page__person-about-table--image {
        width: 70%;
      }

      .page__person-about-forms--images {
        display: flex;

        .page__person-about-forms-images--form {
          width: 30%;
          height: 40%;
        }

        .page__person-about-forms-images--excel {
          width: 30%;
          height: 40%;
        }
      }
    }

    .page__equipment {
      text-align: left;

      .equipment__description--text {
        text-align: left;
      }

      .page__equipment-images-forms {
        display: flex;
        gap: 1rem;

        .page__equipment-images--form {
          width: 35%;
        }

        .page__equipment-images--import {
          width: 20%;
          height: 10%;
        }
      }

      .equipment__status--images {
        display: flex;
        gap: 1rem;

        .equipment-image--status {
          width: 70%;
          height: 20%;
        }

        .equipment-image--notifications {
          width: 20%;
          height: 5%;
        }
      }

      .page__equipment-about-filter {
        .equipment__filter--image {
          width: 40%;
          height: 40%;
        }
      }

      .page__equipment-about-excel {
        .equipment__excel--images {
          width: 20%;
        }
      }
    }
  }
</style>
