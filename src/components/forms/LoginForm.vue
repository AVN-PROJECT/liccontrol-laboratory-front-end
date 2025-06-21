<template>
  <div class="login-form__wrapper">
    <div class="login-form__component">
      <h1 class="header-login__text">Вход в личный кабинет</h1>

      <div class="login__form">
        <VInput
          v-model="form.name"
          color="grey"
          :error="!!errors.license_key"
          type="text"
          placeholder="Наименование организации"
          @input="errors.name = ' '"
        />

        <VInput
          v-model="form.inn"
          type="text"
          color="grey"
          :error="!!errors.inn"
          placeholder="ИНН"
          @input="errors.inn = ' '"
        />

        <VInput
          v-model="form.email"
          type="email"
          color="grey"
          :error="!!errors.email"
          placeholder="Электронная почта"
          @input="errors.email = ' '"
        />

        <div class="password-input-wrapper">
          <VInput
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            :error="!!errors.password"
            color="grey"
            placeholder="Пароль"
            @input="errors.password = ' '"
          />
          <!--          <button-->
          <!--            type="button"-->
          <!--            class="toggle-password-btn"-->
          <!--            @click="showPassword = !showPassword"-->
          <!--          >-->
          <!--            <img-->
          <!--              v-if="showPassword"-->
          <!--              src="@/assets/"-->
          <!--              alt="Скрыть"-->
          <!--            />-->
          <!--            <img v-else src="@/assets/" alt="Показать" />-->
          <!--          </button>-->
        </div>

        <VInput
          v-model="form.license_key"
          :error="!!errors.license_key"
          type="text"
          color="grey"
          placeholder="Введите ваш ключ"
          @input="errors.license_key = ' '"
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
            src=""
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
    <div
      v-if="showCookieBlock"
      class="login__cookie"
      :style="{ top: `${scrollY + 20}px` }"
    >
      <p class="login__cookie-text">
        Мы используем файлы cookies для улучшения работы сайта и большего удобства его
        использования. Более подробную информацию об использовании файлов cookies можно найти здесь
        <a
          href=""
          target="_blank"
          download="/Политика_в_отношении_обработки_персональных_данных.pdf"
        >
          Политика в отношении обработки персональных данных.
        </a>
        Продолжая пользоваться сайтом, вы подтверждаете, что были проинформированы об использовании
        файлов cookies сайтом https://liccontrol.ru/ и согласны с нашими правилами обработки
        персональных данных. Вы можете отключить файлы cookies в настройках Вашего браузера.
      </p>
      <div class="login__cookie_options">
        <div class="login__cookie-accept">
          <a @click="acceptCookies">Принято</a>
        </div>
        <div class="login__cookie-reject">
          <a @click="rejectCookies">Отклонить</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import apiClient from '@/composables/apiClient.js';
  import { useLockBodyScroll } from '@/composables/useBlockScrollBody.js';
  import { strValidate } from '@/helpers/validation/validate.js';

  import VInput from '@/components/ui/VInput.vue';

  const { disableBodyScroll } = useLockBodyScroll();

  import { useUiUxStore } from '@/stores/uiuxStore.js';
  import { useUserStore } from '@/stores/userStore.js';

  const toastList = ref([]);

  defineProps({
    message: String,
    type: {
      type: String,
      default: 'info',
    },
  });

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    toastList.value.push({ message, id, type });

    setTimeout(() => {
      toastList.value = toastList.value.filter((t) => t.id !== id);
    }, 5000);
  };

  const { setCurrentForm } = useUiUxStore();
  const { loginName, loginEmail } = storeToRefs(useUserStore());

  const form = ref({
    name: '',
    inn: '',
    email: '',
    password: '',
    license_key: '',
  });

  const errors = ref({});

  const validate = (form) => {
    const errors = {
      inn: strValidate(form.inn, 'inn', true),
      email: strValidate(form.email, 'email', true),
      password: strValidate(form.password, 'password', true),
    };

    errors.value = errors;
  };

  const handlerLoginButton = async () => {
    validate(form);

    if (Object.keys(errors).some((item) => item !== '')) {
      return;
    }

    try {
      const response = await apiClient.post('/user/auth/login', {
        name: form.value.name?.trim() || '',
        inn: form.value.inn?.trim() || '',
        email: form.value.email?.trim() || '',
        password: form.value.password?.trim() || '',
        license_key: form.value.license_key?.trim() || '',
      });

      if (response.status === 200) {
        loginEmail.value = form.value.email.trim();
        loginName.value = form.value.name.trim();

        setCurrentForm('LoginConfirmForm');
      }
    } catch (err) {
      const responseData = err.response?.data;

      if (responseData?.errors && typeof responseData.errors === 'object') {
        Object.values(responseData.errors).forEach((msg) => showToast(msg, 'error'));
        return;
      }

      if (Array.isArray(responseData?.errors)) {
        responseData.errors.forEach((msg) => showToast(msg, 'error'));
        return;
      }

      if (typeof responseData?.message === 'string') {
        showToast(responseData.message, 'error');
        return;
      }

      if (typeof responseData?.detail === 'string') {
        showToast(responseData.detail, 'error');
        return;
      }

      if (err.response?.status) {
        showToast(`Ошибка сервера: ${err.response.status} ${err.response.statusText}`, 'error');
        return;
      }

      showToast('Неизвестная ошибка сервера. Попробуйте позже.', 'error');
    }
  };

  const cookieAccepted = ref(false);
  const showCookieBlock = ref(true);

  const acceptCookies = () => {
    showCookieBlock.value = false;
  };

  const rejectCookies = () => {
    showCookieBlock.value = false;
  };
  const showPassword = ref(false);

  onMounted(() => {
    disableBodyScroll();
  });
</script>

<style scoped lang="scss">
  .login__form {
    display: flex;
    width: 70.6%;
    margin: 0 auto;
    flex-direction: column;

    p {
      margin: 0;
      color: $color-blue2;
      cursor: pointer;
    }

    input {
      margin-bottom: 5%;
    }

    .input-error {
      border: 2px solid $color-red;
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

    // .request_code {
    //  border-bottom: 0 solid $color-dark;
    //  color: $color-blue;
    //  cursor: pointer;
    // }
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

    &:active {
      animation: buttonClick 0.4s ease;
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      border-radius: 100%;
      background: rgb(255 255 255 / 50%);
      opacity: 0;
      transform: scale(1, 1) translate(-50%, -50%);
      transform-origin: 50% 50%;
    }

    &:focus:not(:active):after {
      animation: ripple 0.6s ease-out;
    }
  }

  @keyframes buttonClick {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.95);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes ripple {
    0% {
      opacity: 0.5;
      transform: scale(0, 0);
    }

    100% {
      opacity: 0;
      transform: scale(20, 20);
    }
  }

  // .border-green {
  //  border: 2px solid #48a600;
  // }
  //
  // .border-red {
  //  border: 2px solid $color-red;
  // }
  //
  // .error-text {
  //  color: $color-red;
  //  font-size: 0.9vw;
  //  margin-top: 6%;
  //  margin-bottom: 0;
  //
  //  font-family: 'Montserrat', sans-serif;
  //  font-style: normal;
  // }
  .login__cookie {
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

    .login__cookie-accept {
      display: inline-block;
      width: 120px;
      height: 47px;
      margin-top: 7px;
      padding: 10px;
      border-radius: 10px;
      background-color: $color-blue-sky;

      a {
        font-size: 1.2vw;
        font-weight: 400;
        color: #001f3f;
      }
    }

    .login__cookie-reject {
      margin-top: 20px;
      margin-left: 10px;

      a {
        text-decoration: underline;
        font-size: 1.1vw;
        font-weight: 400;
        color: #000;
      }
    }
  }

  .password-input-wrapper {
    position: relative;

    input {
      width: 100%;
      padding-right: 40px;
    }

    // .toggle-password-btn {
    //  position: absolute;
    //  right: 14px;
    //  top: 35%;
    //  transform: translateY(-50%);
    //  background: transparent;
    //  border: none;
    //  cursor: pointer;
    //  padding: 0;
    //  display: flex;
    //  align-items: center;
    //  justify-content: center;
    //
    //  img {
    //    width: 30px;
    //    height: 22px;
    //    display: block;
    //  }
    // }
  }
</style>
