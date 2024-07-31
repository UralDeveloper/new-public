<template>
  <div class="counter">
    <button
      class="counter__button"
      @click.stop.prevent="emits('decrement')"
      :id="`cart_minus_${id}`"
    >
      <UIIcon name="minus" />
    </button>

    <span class="counter__count">
      {{ count }}
    </span>

    <button
      class="counter__button"
      @click.stop.prevent="emits('increment')"
      :id="`cart_plus_${id}`"
    >
      <UIIcon name="plus" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: [String, Number],
    default: 1,
  },
  id: {
    type: Number,
    default: 1,
  },
})

const emits = defineEmits(['increment', 'decrement'])
</script>

<style lang="scss" scoped>
.counter {
  // width: 130px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @include text_normal;
  font-weight: 500;

  border-radius: 14px;
  background: var(--grayBg);

  &__button {
    height: 32px;

    padding: 6px 10px;
  }

  &__count {
    white-space: nowrap;
  }
}
</style>