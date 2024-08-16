<template>
  <div class="page-order-composition">
    <div v-if="!inCart" class="page-order-composition__header">
      <p class="page-order-composition__title">
        Состав заказа
      </p>

      <button
        type="button"
        class="page-order-composition__edit"
        @click.prevent="cartStore.toggleShowCartModal(true)"
      >
        Изменить
      </button>
    </div>
    <ul v-if="!inCart" class="page-order-composition__list">
      <PagesOrderCompositionProduct
        v-for="(item, i) in cartStore.cartItems"
        :key="i"
        :item="item"
      />
    </ul>

    <ModalsCartDiscountBlock v-if="!inCart"
        :is-show="isShowDiscountBlock"
        :discount="discountBlock"
        :source="'order'"
    />

    <div v-if="!inCart" class="page-order-composition__divider" />

    <ul class="page-order-composition__list">
      <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          {{ cartStore.cartItemsLength }} {{ declOfNum(cartStore.cartItemsLength, ['товар', 'товара', 'товаров']) }}
        </p>
        <p class="page-order-composition__value">
          <small v-if="onlyItemsRegularPrice > onlyItemsPrice">
            {{ onlyItemsRegularPrice }} ₽
          </small>
          {{ onlyItemsPrice.toLocaleString() }} ₽
        </p>
      </li>
      <li
          v-if="(autoCouponsFixed > 0 || autoCouponsPercents > 0) && showDeliveryPrice"
          class="page-order-composition__item"
      >
        <p class="page-order-composition__value">
          Подарочные скидки
        </p>
        <p class="page-order-composition__value page-order-composition__value--bonuses">
          - {{ autoDiscountSum.toLocaleString() }} ₽
        </p>
      </li>
      <li
        v-if="!!promocode"
        class="page-order-composition__item"
      >
        <p class="page-order-composition__value">
          Промокод
        </p>
        <p class="page-order-composition__value page-order-composition__value--bonuses">
          - {{ promocode.amount.toLocaleString() }} {{ promocode.type === 'percent' ? '%' : '₽' }}
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
      <li
        v-if="commonStore.deliveryType === 'delivery'"
        class="page-order-composition__item"
      >
        <p class="page-order-composition__value">
          Доставка
          <UIIcon name="info" v-if="showDeliveryPrice" />
        </p>
        <p class="page-order-composition__value" v-if="showDeliveryPrice">
          {{ deliveryPrice.toLocaleString() }}
        </p>
        <p class="page-order-composition__value" v-else>
          Не набрана минимальная сумма.
        </p>
      </li>
    </ul>

    <div class="page-order-composition__divider" />

    <ul class="page-order-composition__list">
      <li v-if="bonusesApplied > 0" class="page-order-composition__item">
        <p class="page-order-composition__value">
          Бонусов применено
        </p>
        <p class="page-order-composition__value">
          - {{ bonusesApplied }} ₽
        </p>
      </li>


      <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Сумма заказа
        </p>
        <p class="page-order-composition__value">
            <!-- <small v-if="cartItemsRegularPrice.toLocaleString() !== cartItemsPrice.toLocaleString()">
              {{ cartItemsRegularPrice.toLocaleString() }} ₽
            </small> -->
          <span v-if="showDeliveryPrice"> {{ cartItemsPrice.toLocaleString() }} ₽ </span>
          <span v-else> {{ onlyItemsPrice.toLocaleString() }} ₽ </span>
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
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'

import declOfNum from '@/utils/declOfNum'

import {useCalcDeliveryPrice} from '@/composables/useCalcDeliveryPrice'

defineProps({
  inCart: {
    type: Boolean,
    default: false,
  },
})

const cartStore = useCartStore()
const commonStore = useCommonStore()
const catalogStore = useCatalogStore();
const { cartItemsRegularPrice, cartItemsPrice, bonusesApplied, isShowDiscountBlock, discountBlock } = storeToRefs(cartStore)

onMounted(() => {
  if (selectedLocation?.value?.zone && deliveryType.value === 'delivery') {
    const shouldShowDeliveryPrice = selectedLocation.value.zone.sum.some(item => 
      parseFloat(item.min_sum_order) <= parseFloat(cartStore.cartItemsPrice)
    );

    showDeliveryPrice.value = shouldShowDeliveryPrice;
  }
})

watch(() => cartStore.cartItemsPrice, () => {
  if (selectedLocation?.value?.zone && deliveryType.value === 'delivery') {
    const shouldShowDeliveryPrice = selectedLocation.value.zone.sum.some(item => 
      parseFloat(item.min_sum_order) <= parseFloat(cartStore.cartItemsPrice)
    );

    showDeliveryPrice.value = shouldShowDeliveryPrice;
  }
});

const onlyItemsRegularPrice = computed(() => {
  let price = cartItemsRegularPrice.value
  
  if (commonStore.selectedLocation?.delivery_price > 0) {
    price -= commonStore.selectedLocation?.delivery_price
  }

  return price
})

const onlyItemsPrice = computed(() => cartStore.onlyItemsPrice)
// let getDiscountBlock = discountBlock.value
// let getIsShowDiscountBlock = isShowDiscountBlock.value
// //const isShowDiscountBlock = ref(isShowDiscountBlock)
// const getIsShowDiscountBlock = computed(() => isShowDiscountBlock)
// const getDiscountBlock = computed(() => discountBlock)
// watch(() => getDiscountBlock.value, (newValue, oldValue) => {
//   getDiscountBlock = newValue.value
// })
// watch(() => isShowDiscountBlock, (newValue, oldValue) => {
//   getIsShowDiscountBlock = newValue.value
// })

// <!-- Computed -->
const promocode = computed(() => cartStore.promocode)
const autoCouponsPercents = computed(() => cartStore.getAutoDiscountPercentSum)
const autoCouponsFixed = computed(() => cartStore.getAutoDiscountFixedSum)
const autoDiscountSum = computed(() =>
    parseInt((onlyItemsPrice.value * (autoCouponsPercents.value / 100)) + autoCouponsFixed.value)
)
const selectedLocation = computed(() => commonStore.selectedLocation)
const deliveryType = computed(() => commonStore.deliveryType)
//TODO вынести куда нибудь
const endPrice = computed(() => { // вроде как вынесено в стор, и больше не используется. удалять пока страшно
  const promocodeObj = promocode.value
  let sum = cartItemsPrice.value//cartItemsRegularPrice.value
  let promoCodePercents = parseInt(cartStore.getAutoDiscountPercentSum)
  let promoCodeFixedSum = parseInt(cartStore.getAutoDiscountFixedSum)
  //Применяем промокод
  if (promocodeObj) {
    if (promocodeObj.type === 'percent') {
      //общие проценты
      promoCodePercents += promocodeObj.amount
    } else {
      promoCodeFixedSum += promocodeObj.amount
    }
  }
  if (promoCodePercents > 0) {
    sum = sum - (sum * (promoCodePercents / 100))//sum * ((100 - promoCodePercents) / 100) ////sum - promocodeAmount * 100) / 100
  }
  if (promoCodeFixedSum > 0) {
    sum = sum - promoCodeFixedSum
  }
  if (cartStore.bonusesApplied > 0) {
    sum = sum - cartStore.bonusesApplied
  }
  if (selectedLocation.value?.delivery_price > 0) {
    sum = sum + selectedLocation.value?.delivery_price
  }
  return sum
})

useCalcDeliveryPrice()

const showDeliveryPrice = ref(deliveryType.value === 'delivery' ? false : true);

const deliveryPrice = computed(() => {
  let price = selectedLocation.value?.delivery_price || 0
  return price > 0 ? price.toLocaleString() + ' ₽' : 'Бесплатно'
})
</script>

<style lang="scss" scoped>
ul {
  margin-bottom: 0;
  padding-left: 0;
}
p {
  margin-bottom: 0;
}
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

    &--bonuses {
      grid-gap: 6px;

      :deep(.ui-icon) svg path {
        fill: var(--orange);
      }
    }

    small {
      @include extra_small;
      color: rgba(0, 0, 0, 0.30);
      text-decoration: line-through;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background: var(--grayText2);
  }
}
</style>