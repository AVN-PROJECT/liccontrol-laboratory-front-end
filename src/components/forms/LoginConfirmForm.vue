<template>
  <div
    v-if="loginEmail"
    class="login__confirm-email-form"
  >
    <h2 class="login__form-text">Подтвердите электронную почту</h2>

    <p class="login__email-description">
      На Вашу почту {{ loginEmail }} было отправлено письмо с кодом подтверждения.
      <br />
      <br />
      Введите код ниже:
    </p>

    <div class="login__form-two-fa">
      <VInput
        v-for="(digit, index) in twoFAInput"
        :key="index"
        ref="inputRefs"
        v-model="twoFAInput[index]"
        type="text"
        maxlength="1"
        class="two-fa-box"
        @input="handleInput(index)"
        @keydown="handlerBackspace($event, index)"
        @paste="handlePaste($event)"
      />
    </div>

    <p
      v-if="isCodeCorrect === false"
      class="error-text"
    >
      Введен неверный код
    </p>

    <button
      class="login__form-button-login"
      @click="handlerConfirmButton"
    >
      Подтвердить
    </button>

    <div class="login__footer">
      <p class="login__footer-user-agreements">
        Не получили код?
        <br />
        <br />
        <a
          class="request_code"
          href="#"
          @click.prevent=""
        >
          Запросить код повторно
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { ref } from 'vue';

  // vuex.
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';

  // composables.
  import apiClient from '@/composables/apiClient.js';

  // utils.
  import Cookies from 'js-cookies/src/cookies.js';
  import { useUserStore } from '@/stores/userStore.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';

  // constants.
  const twoFAInput = ref(['', '', '', '']);
  const inputRefs = ref([]);
  const isCodeCorrect = ref(null);
  const errors = ref({
    server: '',
  });

  const { loginEmail, loginName } = storeToRefs(useUserStore());

  const router = useRouter();

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text/plain') ?? '';

    const digits = pastedText.replace(/\D/g, '').split('');

    digits.slice(0, 4).forEach((digit, index) => {
      twoFAInput.value[index] = digit;
    });

    const nextIndex = digits.length < 4 ? digits.length : 3;
    inputRefs.value[nextIndex]?.focus();
  };

  const handleInput = (index) => {
    if (twoFAInput.value[index].length === 1 && index < twoFAInput.value.length - 1) {
      inputRefs.value[index + 1]?.focus();
    }
  };

  const handlerBackspace = (event, index) => {
    if (event.key === 'Backspace' && !twoFAInput.value[index] && index > 0) {
      inputRefs.value[index - 1]?.focus();
    }
  };

  const handlerConfirmButton = async () => {
    const code = twoFAInput.value.join('');

    if (code.length === 4) {
      try {
        const response = await apiClient.post('/user/auth/login-code', {
          name: loginName.value,
          email: loginEmail.value,
          code: code,
        });

        if (response.status === 200) {
          const cookieOptions = {
            path: '/',
          };

          if (location.hostname !== 'localhost') {
            cookieOptions.domain = 'liccontrol.ru';
            cookieOptions.secure = true;
          }

          Cookies.setItem('accessToken', response.data.accessToken, cookieOptions);

          await router.push('/user/profile');
        }
      } catch {
        isCodeCorrect.value = false;

        errors.value.server = 'Ошибка соединения с сервером';
      }
    }
  };
</script>

<style scoped lang="scss">
  // .support {
  //  margin: 0;
  //  font-size: 0.85vw;
  //  color: $color-blue;
  // }

  .login__footer-user-agreements {
    margin-top: 6.4%;

    a {
      border-bottom: 1px solid $color-dark;
      color: $color-dark;
      cursor: pointer;
    }

    .request_code {
      border-bottom: 0 solid $color-dark;
      color: $color-blue;
      cursor: pointer;
    }
  }

  .login__form-button-login {
    margin: 5% 0 6.4% 0;
    padding: 4% 7%;
    border-radius: 10px;
    border: none;
    background-color: $color-blue-sky;
    text-align: center;
    font-family: Jura, sans-serif;
    font-size: 1.9vw;
    font-weight: 400;
    color: #001f3f;
    cursor: pointer;
  }

  .login__form-two-fa {
    display: flex;
    justify-content: center;
    gap: 61px;
    margin-top: 8%;
  }

  .two-fa-box {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    border: none;
    background: rgb(217 217 217 / 30%);
    text-align: center;
    font-family: Montserrat, sans-serif;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    color: #000;
    box-shadow: inset 0 0 4px 2px rgb(0 0 0 / 25%);
  }

  .error-text {
    margin-top: 6%;
    margin-bottom: 0;
    font-family: Montserrat, sans-serif;
    font-size: 0.9vw;
    font-style: normal;
    color: $color-red;
  }
</style>
