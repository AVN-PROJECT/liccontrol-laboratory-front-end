<template>
  <div class="login__form--wrapper">
    <div class="form__wrapper--content">
      <h1 class="wrapper__login--text">Вход в личный кабинет</h1>

      <div class="form__wrapper--fields">
        <VInput
          v-model="form.name"
          color="grey"
          :error="!!errors.name"
          type="text"
          placeholder="Наименование организации"
          @update="errors.name = ''"
        />

        <VInput
          v-model="form.inn"
          type="text"
          color="grey"
          :error="!!errors.inn"
          placeholder="ИНН"
          @update="errors.inn = ''"
        />

        <VInput
          v-model="form.email"
          type="email"
          color="grey"
          :error="!!errors.email"
          placeholder="Электронная почта"
          @update="errors.email = ''"
        />

        <div class="password-input-wrapper">
          <VInput
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            :error="!!errors.password"
            color="grey"
            placeholder="Пароль"
            @update="errors.password = ''"
          />
          <button
            type="button"
            class="toggle-password-btn"
            @click="showPassword = !showPassword"
          >
            <img
              v-if="showPassword"
              :src="eyeCloseIcon ? showPassword : eyeOpenIcon"
              alt="Скрыть"
            />
          </button>
        </div>

        <VInput
          v-model="form.license_key"
          :error="!!errors.license_key"
          type="text"
          color="grey"
          placeholder="Введите ваш ключ"
          @update="errors.license_key = ''"
        />
      </div>

      <div class="login-form-submit">
        <button
          class="login__form-button-login"
          @click="handlerLoginButton"
        >
          Войти
        </button>
      </div>

      <a
        href="#"
        class="support"
        @click.prevent=""
      >
        Тех. поддержка
      </a>

      <div class="login__footer">
        <div
          class="custom-checkbox"
          @click="cookieAccepted = !cookieAccepted"
        >
          <img
            v-if="cookieAccepted"
            src="@/assets/icons/sections/buttons/tick-save.svg"
            alt="✓"
            class="checkmark"
          />
        </div>
        <p class="login__footer-user-agreements">
          Нажимая “Войти”, вы соглашаетесь с

          <a href="#">Условиями использования сервиса</a>
          и
          <a href="#">Политикой конфиденциальности</a>
        </p>
      </div>
    </div>

    <template v-if="showCookieBlock">
      <div class="wrapper__cookie">
        <div>
          <p class="wrapper__cookie--text">
            {{ policyText.policyWarning }}
            <a
              href=""
              target="_blank"
              download="/Политика_в_отношении_обработки_персональных_данных.pdf"
            >
              Политика в отношении обработки персональных данных.
            </a>
          </p>

          <p v-text="policyText.policyCondition"></p>
        </div>

        <div class="wrapper__cookie--buttons">
          <VButton
            class="button__accept"
            @click="
              cookieAccepted = true;
              showCookieBlock = false;
            "
          >
            Принято
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

  // utils.
  const { disableBodyScroll } = useLockBodyScroll();
  import { strValidate } from '@/helpers/validation/validate.js';
  import { useLockBodyScroll } from '@/composables/scroll/useBlockScrollBody.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import eyeCloseIcon from '@/assets/icons/sections/buttons/eye-close.svg';
  import eyeOpenIcon from '@/assets/icons/sections/buttons/eye-open.svg';

  // text.
  import policyText from '@/assets/texts/policyText.js';
  import VButton from '@/components/ui/VButton.vue';

  // constants.
  const { setCurrentForm } = useUiUxStore();
  const { loginName, loginEmail } = storeToRefs(useUserStore());

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
    const newErrors = {
      name: strValidate(form.value.name, '', true),
      inn: strValidate(form.value.inn, 'inn', true),
      email: strValidate(form.value.email, 'email', true),
      password: strValidate(form.value.password, 'password', true),
      license_key: strValidate(form.value.license_key, '', true),
    };

    errors.value = {
      ...errors.value,
      ...newErrors,
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
  .form__wrapper--fields {
    display: flex;
    width: 70.6%;
    margin: 0 auto;
    flex-direction: column;

    p {
      margin: 0;
      color: $color-blue-light;
      cursor: pointer;
    }

    input {
      margin-bottom: 5%;
    }
  }

  .support {
    margin: 0;
    font-size: 0.95vw;
    color: $color-blue;
  }

  .login__footer {
    display: flex;
    margin-top: 20px;

    .custom-checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 79px;
      height: 50px;
      border-radius: 4px;
      border: 2px solid #1976d2;
      background-color: #fff;
      transition: all 0.2s ease;
      cursor: pointer;

      .checkmark {
        width: 100%;
      }
    }
  }

  .login__footer-user-agreements {
    margin: 0;

    a {
      border-bottom: 1px solid $color-dark;
      color: $color-dark;
      cursor: pointer;
    }
  }

  .login__form-button-login {
    margin: 5% 0 2.4% 0;
    padding: 3% 5%;
    border-radius: 10px;
    border: none;
    background-color: $color-blue-sky;
    text-align: center;
    font-family: Jura, sans-serif;
    font-size: 1.7vw;
    font-weight: 400;
    color: #001f3f;
    cursor: pointer;
    box-shadow: 0 2px 4px rgb(0 31 63 / 20%);

    &:hover {
      background-color: #7ab8d6;
      box-shadow: 0 4px 8px rgb(0 31 63 / 30%);
      transform: translateY(-2px);
    }
  }

  .checkmark {
    width: 60%;
    height: 60%;
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
    text-align: center;
    transition: top 0.1s linear;
    box-shadow: 0 0 10px 1px rgb(0 0 0 / 25%);
    backdrop-filter: blur(3px);

    .wrapper__cookie--text {
      display: flex;
      flex-direction: column;
    }

    .wrapper__cookie--buttons {
      .button__accept {
        display: inline-block;
        width: 120px;
        height: 47px;
        margin-top: 7px;
        padding: 10px;
        border-radius: 10px;
        border: none;
        background-color: $color-blue-sky;
      }

      .button__reject {
        gap: 2rem;
        border: none;
        text-decoration: underline;
        font-size: 1.1vw;
        font-weight: 400;
        color: $color-dark;
      }
    }

    p {
      margin: 5px 25px 5px 0;
      font-size: 24px;
      font-weight: 400;
      letter-spacing: 0.04em;

      a {
        border-bottom: 1px solid #1976d2;
        color: #1976d2;
      }
    }
  }

  .password-input-wrapper {
    position: relative;

    input {
      width: 100%;
      padding-right: 40px;
    }

    .toggle-password-btn {
      position: absolute;
      top: 35%;
      right: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background: transparent;
      transform: translateY(-50%);
      cursor: pointer;

      img {
        display: block;
        width: 30px;
        height: 22px;
      }
    }
  }
</style>
