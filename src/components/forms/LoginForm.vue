<template>
  <div class="login__form--wrapper">
    <div class="form__wrapper--content">
      <h1 class="wrapper__login--text">Вход в личный кабинет</h1>

      <div class="form__wrapper--fields">
        <VInput
          v-model="form.name"
          color="grey"
          :error="!!errors.name"
          class="form__field--input"
          placeholder="Наименование организации"
          @update="errors.name = ''"
        />

        <VInput
          v-model="form.inn"
          color="grey"
          :error="!!errors.inn"
          placeholder="ИНН"
          class="form__field--input"
          @update="errors.inn = ''"
        />

        <VInput
          v-model="form.email"
          type="email"
          color="grey"
          class="form__field-input"
          :error="!!errors.email"
          placeholder="Электронная почта"
          @update="errors.email = ''"
        />

        <div class="form__field--wrapper">
          <VInput
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            :error="!!errors.password"
            color="grey"
            class="form__field--input"
            placeholder="Пароль"
            @update="errors.password = ''"
          />

          <VButton
            class="form__field--button"
            @click="showPassword = !showPassword"
          >
            <img :src="showPassword ? eyeCloseIcon : eyeOpenIcon" />
          </VButton>
        </div>

        <VInput
          v-model="form.license_key"
          :error="!!errors.license_key"
          color="grey"
          class="form__field--input"
          placeholder="Введите ваш ключ"
          @update="errors.license_key = ''"
        />
      </div>

      <div class="login__form--submit">
        <VButton
          class="submit__button"
          @click="handlerLoginButton"
        >
          Войти
        </VButton>
      </div>

      <div class="login__footer">
        <div
          class="login__footer--checkbox"
          @click="cookieAccepted = !cookieAccepted"
        >
          <img
            v-if="cookieAccepted"
            src="@/assets/icons/sections/buttons/tick-save.svg"
            alt="✓"
            class="checkbox__checkmark"
          />
        </div>
        <p class="login__footer--user-agreement">
          Нажимая “Войти”, вы соглашаетесь с

          <a href="#">Условиями использования сервиса</a>
          и
          <a href="#">Политикой конфиденциальности</a>
        </p>
      </div>
    </div>

    <template v-if="showCookieBlock">
      <div class="wrapper__cookie">
        <div class="wrapper__cookie--text">
          <p class="cookie__warning--text">
            {{ policyText.policyWarning }}
            <a
              href=""
              class="cookie__text--link"
              target="_blank"
              download="/Политика_в_отношении_обработки_персональных_данных.pdf"
            >
              Политика в отношении обработки персональных данных.
            </a>
          </p>

          <p
            class="cookie__condition--text"
            v-text="policyText.policyCondition"
          ></p>
        </div>

        <div class="wrapper__cookie--buttons">
          <VButton
            class="button__accept"
            @click="
              cookieAccepted = true;
              showCookieBlock = false;
            "
          >
            Принять
          </VButton>

          <VButton
            class="button__reject"
            @click="showCookieBlock = false"
          >
            Отклонить
          </VButton>
        </div>
      </div>
    </template>

    <template v-if="errors">
      <div class="form__wrapper-errors">
        <template
          v-for="(error, index) in errors"
          :key="index"
        >
          <ToastComponent
            v-if="error"
            :message="error"
            color="red"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
  // vue.
  import { ref, onMounted } from 'vue';

  // vuex.
  import { storeToRefs } from 'pinia';
  import { useUiUxStore } from '@/stores/uiuxStore.js';
  import { useUserStore } from '@/stores/userStore.js';

  // composables.
  import apiClient from '@/composables/api/apiClient.js';
  import { useLockBodyScroll } from '@/composables/scroll/useBlockScrollBody.js';

  // utils.
  import { strValidate } from '@/helpers/validation/validate.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';
  import ToastComponent from '@/components/modules/ToastComponent.vue';
  import eyeCloseIcon from '@/assets/icons/sections/buttons/eye-close.svg';
  import eyeOpenIcon from '@/assets/icons/sections/buttons/eye-open.svg';

  // text.
  import policyText from '@/assets/texts/policyText.js';

  // constants.
  const { setCurrentForm } = useUiUxStore();
  const { loginName, loginEmail } = storeToRefs(useUserStore());
  const { disableBodyScroll } = useLockBodyScroll();

  const form = ref({
    name: '',
    inn: '',
    email: '',
    password: '',
    license_key: '',
  });

  const errors = ref({
    name: '',
    inn: '',
    email: '',
    password: '',
    license_key: '',
  });

  const scrollY = ref(0);
  const cookieAccepted = ref(false);
  const showCookieBlock = ref(true);
  const showPassword = ref(false);

  onMounted(() => {
    window.addEventListener('scroll', () => {
      scrollY.value = window.scrollY;
    });
    disableBodyScroll();
  });

  const validate = () => {
    errors.value = {
      name: strValidate(form.value.name, '', true),
      inn: strValidate(form.value.inn, 'inn', true),
      email: strValidate(form.value.email, 'email', true),
      password: strValidate(form.value.password, 'password', true),
      license_key: strValidate(form.value.license_key, '', true),
    };
  };

  const handlerLoginButton = async () => {
    validate(form);

    if (Object.values(errors.value).some((item) => item !== '')) {
      return;
    }

    try {
      const response = await apiClient.post('/user/auth/login', {
        name: form.value.name,
        inn: form.value.inn,
        email: form.value.email,
        password: form.value.password,
        license_key: form.value.license_key,
      });

      if (response.status === 200) {
        loginEmail.value = form.value.email.trim();
        loginName.value = form.value.name.trim();

        setCurrentForm('LoginConfirmForm');
      }
    } catch (err) {
      const responseData = err.response?.data;

      if (responseData?.errors && typeof responseData.errors === 'object') {
        console.error(responseData.errors);
      }
    }
  };
</script>

<style scoped lang="scss">
  .login__form--wrapper {
    position: relative;

    .form__wrapper--fields {
      display: flex;
      flex-direction: column;
      width: 70.6%;
      gap: 1.5rem;
      margin: 0 auto;
    }

    .form__field--wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;

      .form__field--button {
        position: absolute;
        top: 0.6rem;
        right: 1rem;
        border: none;
        background-color: inherit;
        transition: 0.2ms ease;
        cursor: pointer;
      }

      .form__field--input {
        width: 100%;
      }
    }

    .login__footer {
      display: flex;
      margin-top: 20px;

      .login__footer--checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 79px;
        height: 50px;
        border-radius: 4px;
        border: 2px solid $color-blue-light;
        background-color: $color-light;
        transition: all 0.2s ease;
        cursor: pointer;

        .checkbox__checkmark {
          width: 60%;
          height: 60%;
        }
      }
    }

    .login__footer--user-agreement {
      margin: 0;

      a {
        border-bottom: 1px solid $color-dark;
        color: $color-dark;
        cursor: pointer;
      }
    }

    .submit__button {
      margin: 5% 0 2.4% 0;
      padding: 3% 5%;
      border-radius: 10px;
      border: none;
      background-color: $color-green-light;
      text-align: center;
      font-size: 1.7vw;
      color: $color-dark-blue;
      cursor: pointer;
      box-shadow: 0 2px 4px rgb(0 31 63 / 20%);

      &:hover {
        background-color: $color-green-light;
        box-shadow: 0 4px 8px rgb(0 31 63 / 30%);
        transform: translateY(-2px);
      }
    }

    .wrapper__cookie {
      position: fixed;
      top: 73%;
      left: 3%;
      z-index: 2000;
      display: flex;
      width: 70%;
      padding: 1.4% 1%;
      background: rgb(238 238 238 / 50%);
      text-align: left;
      transition: top 0.1s linear;
      box-shadow: 0 0 10px 1px rgb(0 0 0 / 25%);
      backdrop-filter: blur(3px);

      .wrapper__cookie--text {
        display: flex;
        flex-direction: column;
        font-size: 1.6rem;
        font-weight: 400;
        letter-spacing: 0.04em;

        .cookie__warning--text,
        .cookie__condition--text {
          margin: 0;
        }

        .cookie__text--link {
          text-decoration: underline;
          color: $color-blue-light;
        }
      }

      .wrapper__cookie--buttons {
        gap: 1rem;

        .button__accept {
          display: inline-block;
          width: 120px;
          height: 47px;
          margin-top: 7px;
          padding: 10px;
          border-radius: 10px;
          border: none;
          background-color: $color-blue-sky;
          cursor: pointer;
        }

        .button__reject {
          border: none;
          text-decoration: underline;
          font-size: 1.1vw;
          font-weight: 400;
          color: $color-dark;
          cursor: pointer;
        }
      }
    }

    .form__wrapper-errors {
      position: absolute;
      top: -13rem; // !! Подумаю над реализацией еще...
      right: -35rem;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
    }
  }
</style>
