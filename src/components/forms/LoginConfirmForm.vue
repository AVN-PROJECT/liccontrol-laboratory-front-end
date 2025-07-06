<template>
  <div
    v-if="loginEmail"
    class="login__form--confirm-email"
  >
    <h2 class="form__header--text">Подтвердите электронную почту</h2>

    <p class="form__description">
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
      class="form__error--text"
    >
      Введен неверный код
    </p>

    <VButton
      class="login__form--button"
      @click="handlerConfirmButton"
    >
      Подтвердить
    </VButton>

    <div class="login__footer">
      <p class="login__footer--user-agreement">
        Не получили код?
        <br />
        <br />
        <a
          class="form__reset-code"
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
  import apiClient from '@/composables/api/apiClient.js';

  // utils.
  import Cookies from 'js-cookies/src/cookies.js';
  import { useUserStore } from '@/stores/userStore.js';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';

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
  .login__footer--user-agreement {
    margin-top: 6.4%;

    a {
      border-bottom: 1px solid $color-dark;
      color: $color-dark;
      cursor: pointer;
    }

    .form__reset-code {
      border-bottom: 0 solid $color-dark;
      color: $color-blue;
      cursor: pointer;
    }
  }

  .login__form--button {
    margin: 2.2rem;
    padding: 4% 7%;
    border-radius: 10px;
    border: none;
    background-color: $color-green-light;
    text-align: center;
    font-size: 1.3vw;
    color: $color-dark-blue;
    cursor: pointer;
  }

  .login__form-two-fa {
    display: flex;
    justify-content: center;
    gap: 3.5rem;
    margin-top: 8%;
  }

  .two-fa-box {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    border: none;
    background: rgb(217 217 217 / 30%);
    text-align: center;
    font-family: $font-family-paragraphs;
    font-size: 1.5rem;
    color: #000;
    box-shadow: inset 0 0 4px 2px rgb(0 0 0 / 25%);
  }

  .form__error--text {
    margin-top: 6%;
    margin-bottom: 0;
    font-family: $font-family-paragraphs;
    font-size: 0.9vw;
    color: $color-red;
  }
</style>
