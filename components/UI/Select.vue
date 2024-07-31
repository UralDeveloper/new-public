<template>
  <div class="select">
    <label
      v-if="label"
      class="select__label"
    >
      {{ label }}
    </label>

    <div class="select__box">
      <p class="select__value">
        {{ modelValue || placeholder }}
      </p>

      <UIIcon
        name="arrow"
        class="select__arrow"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: undefined,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.select {
  position: relative;

  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  width: 100%;

  &__label {
    @include text_normal;
    font-weight: 500;
    color: var(--black);
  }

  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 48px;

    padding: 12px 16px;
    
    background: var(--grayBg);
    border-radius: 14px;
  }

  &__value {
    @include text_normal;
    font-weight: 500;
    color: var(--grayText);
  }

  &__arrow {
    transform: rotate(90deg);
  }
}
</style>