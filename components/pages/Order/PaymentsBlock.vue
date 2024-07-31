<template>
  <div class="page-order-payments">
    <p class="page-order-payments__title">
      Способы оплаты
    </p>

    <div class="page-order-payments__list">
      <div
        v-for="item in paymentMethods"
        :key="item.id"
        class="page-order-payments__item"
      >
        <UIRadio
          :id="item.id"
          :value="modelValue"
          :default-value="item.id"
          @input="update"
        >
          {{ item.title }}
        </UIRadio>

        <div
          v-if="item.id === 'cod' && modelValue === 'cod'"
          class="page-order-payments-block"
        >
          <p class="page-order-payments-block__label">
            С какой суммы подготовить сдачу?
          </p>
          <div class="page-order-payments-block__box">
            <div class="page-order-payments-block__prefix">
              Сдача с
            </div>
            <input
              type="text"
              value="5 000 ₽"
              class="page-order-payments-block__input"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  paymentMethods: {
    type: Array,
    default: () => ([]),
  },
  modelValue: {
    type: undefined,
    default: null,
  },
})

const emits = defineEmits(['update:modelValue'])

const update = (e) => {
  emits('update:modelValue', e.target.value)
}
</script>

<style lang="scss" scoped>
.page-order-payments {
  display: grid;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__list {
    display: grid;
    grid-gap: 16px;
  }
}

.page-order-payments-block {
  display: grid;
  grid-gap: 12px;

  margin: 16px 0 0 34px;

  width: 100%;
  max-width: 275px;

  &__label {
    @include text_normal;
    font-weight: 500;
    color: var(--grayText);
  }

  &__box {
    position: relative;
    width: 100%;
  }

  &__prefix {
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;

    display: flex;
    align-items: center;

    @include text_normal;
    font-weight: 500;
    color: var(--grayText);

    padding: 0 14px 0 16px;

    z-index: 1;

    &:after {
      content: '';

      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;

      display: block;

      width: 2px;
      height: 20px;

      margin: auto;

      background: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
    }
  }

  &__input {
    width: 100%;
    height: 48px;

    padding: 12px 16px 12px 109px;

    @include text_normal;
    font-weight: 500;

    background: var(--grayBg2);
    border-radius: 14px;

    &::-webkit-input-placeholder {
      color: var(--grayText);
    }
    &:-moz-placeholder {
      color: var(--grayText);
      opacity:  1;
    }
    &::-moz-placeholder {
      color: var(--grayText);
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: var(--grayText);
    }
    &::-ms-input-placeholder {
      color: var(--grayText);
    }
    &::placeholder {
      color: var(--grayText);
    }
  }
}
</style>