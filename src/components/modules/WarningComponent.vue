<template>
  <div class="warning__content">
    <div class="content__buttons">
      <VButton
        class="buttons__close"
        @click="emit('close-model')"
      >
        <img
          class="buttons__close--icon"
          src="@/assets/icons/sections/buttons/cross-cancel.svg"
          alt="cross.svg"
        />
      </VButton>
    </div>

    <div class="content__text">
      <img
        class="content__text--icon"
        src="@/assets/icons/sections/legends/exclamation-mark.svg"
        alt="exclamation-mark.svg"
      />
      <p class="content__text--text">
        Статус проверки оборудования автоматически обновляется раз в сутки
      </p>
    </div>
  </div>
</template>

<script setup>
  // components.
  import VButton from '@/components/ui/VButton.vue';

  // constants.
  const emit = defineEmits(['close-model']);
</script>

<style scoped lang="scss">
  .warning__content {
    position: relative;
    display: flex;
    width: 76%;
    max-height: 90px;
    padding: 0.4rem;
    border-radius: 10px;
    background-color: rgb(143 200 155 / 20%);
    text-align: left;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    flex-direction: column;

    .content__buttons {
      display: flex;
      justify-content: flex-end;
      margin: 0;

      .buttons__close {
        position: absolute;
        margin: 0;
        border: none;
        background-color: inherit;
      }
    }

    .content__text {
      display: flex;
      align-items: center;
      margin: 0;

      .content__text--icon {
        margin: 1rem;
      }

      .content__text--text {
        margin: 0;
      }
    }
  }
</style>
