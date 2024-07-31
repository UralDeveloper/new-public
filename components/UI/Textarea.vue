<template>
  <div class="textarea">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'textarea__area',
        color ? `textarea__area--${color}` : ''
      ]"
      @input="emits('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: undefined,
    default: '',
  },
  value: {
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
})

const emits = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.textarea {
  width: 100%;

  &__area {
    width: 100%;
    height: 100px;

    padding: 12px 15px;

    @include text_normal;
    font-weight: inherit;

    background: var(--grayBg2);
    border-radius: 14px;

    resize: none;

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
