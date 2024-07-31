<template>
  <div class="page-order-promocode">
    <p class="page-order-promocode__title">
      Ввести промокод
    </p>

    <CommonPromocodeBlock />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-order-promocode {
  display: grid;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
  }
}
</style>