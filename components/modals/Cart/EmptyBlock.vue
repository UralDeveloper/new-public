<template>
  <div class="modal-cart-empty">
    <a
      href="#"
      class="modal-cart-empty__close"
      @click.prevent="emits('close')"
    >
      <UIIcon name="close" />
    </a>

    <div class="modal-cart-empty__header">
      <UIIcon name="cart-empty" />
      <p class="modal-cart__title">
        Ой, пока пусто!
      </p>
    </div>
    <!-- <div class="modal-cart-empty__content">
      <p class="modal-cart-empty__label">
        Хотите повоторить предыдущий заказ?
      </p>
      <UIButton
        color="yellow"
        class="modal-cart-empty__button"
      >
        <UIIcon name="repeat" />
        Повторить
      </UIButton>
    </div> -->
  </div>
</template>

<script setup>
const emits = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.modal-cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 40px;

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;

    @include mq($bp-small) {
      display: none;
    }

    ::v-deep(.ui-icon) svg path {
      fill: var(--blackText3);
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 23px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;

    width: 292px;

    padding: 30px 40px;

    text-align: center;

    background: var(--white);
    border-radius: 20px;
  }

  &__label {
    @include text_big;
    font-weight: 600;
    color: var(--black);
  }

  &__button {
    width: 100%;

    font-weight: 500;
  }
}
</style>