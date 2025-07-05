<template>
  <div class="equipment__form--import">
    <div class="form__buttons--close">
      <VButton>
        <img />
      </VButton>
    </div>
    <div class="form__fields">
      <label class="field__label--verification-number">
        <VInput
          v-model="newEquipmentImport.verification_number"
          size="medium"
          type="text"
          color="write"
        />
      </label>
    </div>
    <div>
      <VButton>
        <p>Добавить оборудование</p>
        <img src="" />
      </VButton>
    </div>
  </div>
</template>

<script setup>
  // vue.
  import { ref } from 'vue';

  // components.
  import VInput from '@/components/ui/VInput.vue';
  import VButton from '@/components/ui/VButton.vue';

  // constants.
  const newEquipmentImport = ref({
    verification_number: '',
  });
</script>

<style scoped lang="scss">
  .equipment__form--import {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: linear-gradient(45deg, rgb(143 200 155 / 30%) 0%, #f5f5f5 100%);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    gap: 1.5rem;
  }
</style>
