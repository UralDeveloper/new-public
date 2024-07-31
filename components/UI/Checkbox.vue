<template>
  <label
    class="checkbox"
  >
    <input
      type="checkbox"
      class="checkbox__input"
    >

    <span
      class="checkbox__box"
    />

    <slot />
  </label>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  grid-gap: 10px;

  @include text_normal;
  font-weight: 500;
  color: var(--black);

  cursor: pointer;

  &__input {
    display: none;

    &:checked + .checkbox {
      &__box {
        border-color: var(--yellow);
        background: $yellow url('@/assets/svg/checked.svg')no-repeat 50%;
      }
    }
  }

  &__box {
    width: 24px;
    height: 24px;

    border: 2px solid var(--grayText2);
    border-radius: 7px;
  }
}
</style>
