<template>
  <div class="accordion">
    <div class="accordion-header">
      <slot name="accordion-header" />
    </div>
    <div class="accordion-body">
      <slot name="accordion-body" />
    </div>
  </div>
</template>

<script setup>
  /* JS go here */
</script>

<style scoped lang="scss">
  .accordion {
    border-radius: 10px;
    background-color: $color-light;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgb(0 0 0 / 15%);
    }
  }
</style>
