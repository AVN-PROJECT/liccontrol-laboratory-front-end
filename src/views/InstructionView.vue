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

      <p class="page__person--text">
        Здесь хранится информация о сотрудниках, закреплённом за ними оборудовании и контролируются
        сроки окончания действия аттестаций. Для просмотра истекающих в первую очередь аттестаций, в
        столбцах “Дата аттестации” и “Окончание аттестации” предусмотрена сортировка по
        убыванию/возрастанию.
      </p>

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
      <p class="page__person-about-forms">
        Новых сотрудников можно добавить вручную в специальной форме. Также возможен быстрый
        импорт/экспорт данных из файлов Excel.
      </p>

      <div class="page__person-about-forms-images">
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

    <div class="page__equipment">
      <h2 class="page__equipment-header">Страница “Оборудование”</h2>

      <p class="page__equipment--text">
        На данной странице ведётся учёт принадлежащего Вам оборудования, которые прошли поверку у
        организаций-поверителей. Оборудование можно добавить автоматически из ФГИС «АРШИН» или
        внести вручную, выбрав соответствующий вариант формы:
      </p>

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
      <p>
        Программа автоматически подсвечивает оборудование с истекающим сроком поверки и будет
        оповещать Вас в окне уведомлений:
      </p>

      <div class="page__equipment-images-status">
        <img
          class="page__equipment-images--status"
          src="@/assets/images/screenshots/equipment/equipment-status.png"
          alt="equipment-status.png"
        />
        <img
          class="page__equipment-images--notifications"
          src="@/assets/images/screenshots/equipment/equipment-notification.png"
          alt="equipment-notification.png"
        />
      </div>

      <div>
        <img
          class="page__equipment-images--form"
          src="@/assets/images/screenshots/equipment/equipment-form.png"
          alt="equipment-form.png"
        />
        <p>Для отбора определённого оборудования можно воспользоваться фильтром</p>
      </div>
      <p>
        Как и на странице “Персонал”, оборудование можно импортировать из файла Excel, но в таком
        случае оно будет добавлено на страницу “Прочее оборудование”:
      </p>

      <img
        class="page__equipment-images--form"
        src="@/assets/images/screenshots/equipment/equipment-form.png"
        alt="equipment-form.png"
      />
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
    }
  }
</style>
