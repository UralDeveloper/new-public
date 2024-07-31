<template>
  <li class="page-order-composition-product">
    <div class="page-order-composition-product__line">
      <p class="page-order-composition-product__label">
        {{ item.name }}
      </p>
      <p class="page-order-composition-product__value">
        {{ regularPrice.toLocaleString() }} ₽
      </p>
    </div>
    <p
      v-if="item?.supplements?.length"
      class="page-order-composition-product__supplements"
    >
      <span
        v-for="(supplement, s) in item.supplements"
        :key="s"
      >
        {{ supplement.name }}
      </span>
    </p>
  </li>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

// Computed
const supplementsPrice = computed(() => {
  if (props.item?.supplements?.length) {
    return props.item.supplements.reduce((acc, item) => {
      acc += item.count * item.price

      return acc
    }, 0)
  }

  return 0
})

const regularPrice = computed(() => {
  return (supplementsPrice.value + +props.item.price) * props.item.count * props.item.add_to_basket_once
})
</script>

<style lang="scss" scoped>
.page-order-composition-product {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  grid-gap: 4px;

  &__line {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    grid-gap: 20px;
  }

  &__label {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    color: var(--black);
    font-weight: 500;
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    font-weight: 600;

    white-space: nowrap;
  }

  &__supplements {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    @include text_mini;
    color: var(--black);

    span {
      &:after {
        content: ',';
        
        margin-right: 4px;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }
}
</style>