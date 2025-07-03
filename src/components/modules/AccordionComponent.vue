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
  /* styles go here */
</style>
