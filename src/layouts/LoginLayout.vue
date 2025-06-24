<template>
  <div class="login__layout-base">
    <div class="login__layout-view">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
  .login__layout-base {
    width: 100%;
    min-height: 100vh;
    padding: 6% 0;
    background-color: rgba($color-dark, 0.5);
  }

  .login__layout-view {
    width: 52%;
    height: 100%;
    margin: 0 auto;
    padding: 5.8% 7.5% 30px 7.5%;
    background-color: $color-light;
    text-align: center;
    font-family: $font-family-base;
  }
</style>
