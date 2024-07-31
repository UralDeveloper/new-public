<template>
  <div class="page-order-form">
    <p class="page-order-form__title">
      Кто получит заказ?
    </p>

    <div class="page-order-form__rows">
      <div class="page-order-form__row page-order-form__row--double">
        <div class="page-order-form-input">
          <label
            for="name"
            class="page-order-form-input__label"
          >
            Имя
          </label>
          <input
            id="name"
            type="text"
            v-model="modelValue.name"
            placeholder="Введите имя"
            :class="['page-order-form-input__area', { 'page-order-form-input__area--error' : !!modelValue.nameError }]"
          >
          <span
            v-if="modelValue.nameError"
            class="page-order-form-input__error"
          >
            {{ modelValue.nameError }}
          </span>
        </div>

        <div class="page-order-form-input">
          <label
            for="phone"
            class="page-order-form-input__label"
          >
            Номер телефона
          </label>
          <input
            id="phone"
            type="tel"
            v-maska
            data-maska="+7 (###) ###-##-##"
            v-model="modelValue.phone"
            placeholder="Введите номер телефона"
            :class="['page-order-form-input__area', { 'page-order-form-input__area--error' : !!modelValue.phoneError }]"
          >
          <span
            v-if="modelValue.phoneError"
            class="page-order-form-input__error"
          >
            {{ modelValue.phoneError }}
          </span>
        </div>
      </div>

      <div class="page-order-form__row">
        <div class="page-order-form-input">
          <label
            for="comment"
            class="page-order-form-input__label"
          >
            Комментарий
          </label>
          <textarea
            id="comment"
            v-model="modelValue.comment"
            placeholder="Введите комментарий"
            class="page-order-form-input__area page-order-form-input__area--textarea"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vMaska } from 'maska'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['update:modelValue'])

const name = ref('')
const phone = ref('')
</script>

<style lang="scss" scoped>
.page-order-form {
  display: grid;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__rows {
    display: grid;
    grid-gap: 20px;
  }

  &__row {
    display: grid;
    grid-gap: 20px;

    &--double {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.page-order-form-input {
  position: relative;

  display: grid;
  grid-gap: 12px;

  &__label {
    @include text_normal;
    font-weight: 500;
    color: var(--black);
  }

  &__area {
    width: 100%;
    height: 48px;

    padding: 12px 16px;

    @include text_normal;
    font-weight: 500;

    background: var(--grayBg2);
    border: 1px solid var(--grayText2);
    border-radius: 14px;

    &--error {
      border-color: var(--red);
    }

    &--textarea {
      height: 80px;
      resize: none;
    }
  }

  &__error {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;

    @include text_mini;
    color: var(--red);
  }
}
</style>