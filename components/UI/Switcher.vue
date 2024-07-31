<template>
  <label class="switcher">
    <input
      type="checkbox"
      class="switcher__input"
    >
    <span class="switcher__box">
      <span class="switcher__btn" />
    </span>
  </label>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.switcher {
  display: flex;
  align-items: center;

  width: 52px;
  height: 28px;

  cursor: pointer;

  &__input {
    display: none;

    &:checked + .switcher__box {
      background: var(--blackText);

      .switcher__btn {
        left: calc(100% - 2px - 24px);
      }
    }
  }

  &__box {
    position: relative;

    width: 100%;
    height: 100%;

    background: var(--grayText2);
    border-radius: 14px;

    transition: background-color 0.3s;
  }

  &__btn {
    position: absolute;
    top: 2px;
    left: 2px;

    width: 24px;
    height: 24px;

    background: var(--white);
    border-radius: 50%;

    transition: left 0.3s;
  }
}
</style>