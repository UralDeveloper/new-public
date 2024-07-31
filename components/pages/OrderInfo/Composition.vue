<template>
  <div class="page-order-composition">
    <div class="page-order-composition__header">
      <p class="page-order-composition__title">
        Состав заказа
      </p>
    </div>
    <ul class="page-order-composition__list">
      <li
        v-for="(item, i) in itemsList"
        :key="i"
        class="page-order-composition__item page-order-composition__item--product"
      >
        <div class="page-order-composition__line">
          <p class="page-order-composition__label">
            {{ item.name }}
          </p>
          <p class="page-order-composition__value">
            {{ item.total.toLocaleString() }} ₽
          </p>
        </div>
        <!-- <p class="page-order-composition__supplements">
          <span
            v-for="(supplement, s) in item.supplements"
            :key="s"
          >
            {{ supplement.name }}
          </span>
        </p> -->
      </li>
    </ul>

    <div class="page-order-composition__divider" />

    <ul class="page-order-composition__list">
      <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          {{ itemsLength }} {{ declOfNum(itemsLength, ['товар', 'товара', 'товаров']) }}
        </p>
        <p class="page-order-composition__value">
          {{ totalPrice.toLocaleString() }} ₽
        </p>
      </li>

      <li
          v-if="order?.discount_total"
          class="page-order-composition__item"
      >
        <p class="page-order-composition__value">
          Скидка
        </p>
        <p class="page-order-composition__value">
          {{ order?.discount_total.toLocaleString() }} ₽
        </p>
      </li>

      <li
          v-if="order?.shipping_lines[0]?.total "
          class="page-order-composition__item"
      >
        <p class="page-order-composition__value">
          Доставка
        </p>
        <p class="page-order-composition__value">
          {{ order?.shipping_lines[0]?.total ? order?.shipping_lines[0]?.total.toLocaleString() : 0 }} ₽
        </p>
      </li>

      <!-- <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Списание баллов
        </p>
        <p class="page-order-composition__value page-order-composition__value--bonuses">
          0
          <UIIcon name="bonuses" />
        </p>
      </li> -->
      <!-- <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Доставка
          <UIIcon name="info" />
        </p>
        <p class="page-order-composition__value">
          Бесплатно
        </p>
      </li> -->
    </ul>

    <div class="page-order-composition__divider" />

    <ul class="page-order-composition__list">
      <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Сумма заказа
        </p>
        <p class="page-order-composition__value">
          {{ order.total.toLocaleString() }} ₽
        </p>
      </li>
      <!-- <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Начислим баллов
          <UIIcon name="info" />
        </p>
        <p class="page-order-composition__value page-order-composition__value--bonuses">
          0
          <UIIcon name="bonuses" />
        </p>
      </li> -->
    </ul>
  </div>
</template>

<script setup>
import declOfNum from '@/utils/declOfNum'

const props = defineProps({
  items: {
    type: Array,
    default: () => ([]),
  },
  order: {
    type: Object,
    default: () => {},
  },
})

const itemsLength = computed(() => {
  return props.items.length
})

const totalPrice = computed(() => {

  return props.items.reduce((acc, item) => {
    acc += +item.subtotal

    return acc
  }, 0)
})

const itemsList = computed(() => {
  return props.items.filter(item => item.product_type !== 'supplements_options')
})
</script>

<style lang="scss" scoped>
.page-order-composition {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  padding: 20px;

  background: var(--grayBg2);
  border-radius: 20px;
  
  @include mq($bp-medium) {
    padding: 40px;
    
    background: var(--white);
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
  }

  &__header {
    display: none;

    @include mq($bp-medium) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__edit {
    @include text_normal;
    font-weight: 500;
    color: var(--grayText);
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 20px;

    &--product {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      grid-gap: 4px;
    }
  }

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

    small {
      @include text_mini;
    }
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    font-weight: 600;

    white-space: nowrap;

    &--bonuses {
      grid-gap: 6px;

      ::v-deep(.ui-icon) svg path {
        fill: var(--orange);
      }
    }
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

  &__divider {
    width: 100%;
    height: 1px;
    background: var(--grayText2);
  }
}
</style>