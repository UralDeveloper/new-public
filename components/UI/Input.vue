<template>
  <div class="input">
    <label
      v-if="label"
      :for="id"
      class="input__label"
      :class="`input__label--${color}`"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :value="modelValue || value"
      :placeholder="placeholder"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :class="[
        'input__area',
        color ? `input__area--${color}` : ''
      ]"
      @input="emits('update:modelValue', $event.target.value)"
      @blur="emits('blur')"
      @focus="emits('focus')"
    >
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: undefined,
    default: '',
  },
  value: {
    type: undefined,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
})

const emits = defineEmits(['update:modelValue', 'blur', 'focus'])
</script>

<style lang="scss" scoped>
.input {
  width: 100%;

  &__label {
    display: block;

    @include text_normal;
    font-weight: 500;
    color: var(--black);

    margin-bottom: 12px;

    &--gray {
      color: #6e6e6d !important;
      font-weight: 400;
    }
  }

  &__area {
    width: 100%;
    height: 48px;

    padding: 12px 15px;

    @include text_normal;
    font-weight: 500;
    color: var(--black);

    background: var(--grayBg2);
    border-radius: 14px;

    &--gray {
      &::-webkit-input-placeholder {
        color: var(--white) !important;
        font-weight: 400;
        font-family: 'Vela Sans';
      }

      background: #6e6e6d !important;
    }

    &--white {
      background: var(--white);
      border: 1px solid var(--grayText2);
    }

    &--gray {
      background: var(--grayBg);
    }

    &:disabled {
      background: var(--grayBg2);
    }

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
