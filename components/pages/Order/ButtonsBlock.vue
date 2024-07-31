<template>
  <div class="page-order-buttons">
    <UIButton
      color="gray"
      class="page-order-buttons__button page-order-buttons__button--back"
      @click="navigateTo('/')"
    >
      <UIIcon
        name="arrow"
        class="page-order-buttons__arrow"
      />
      Назад в корзину
    </UIButton>

    <UIButton
      :is-loading="isLoading"
      color="yellow"
      :class="['page-order-buttons__button page-order-buttons__button--order', { 'page-order-buttons__button--center' : isLoading }]"
      @click="emits('submit')"
      :disabled="!showDeliveryPrice"
    >
      <span>
      Оформить заказ
      </span>
      <p v-if="showDeliveryPrice"> {{ cartItemsPrice.toLocaleString() }} ₽ </p>
      <p v-else> {{ onlyItemsPrice.toLocaleString() }} ₽ </p>
    </UIButton>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import {useCommonStore} from "~/store/common";

const cartStore = useCartStore()
const commonStore = useCommonStore()

const { cartItemsPrice, cartItemsRegularPrice } = storeToRefs(cartStore)
const { deliveryType } = storeToRefs(commonStore)

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const showDeliveryPrice = ref(deliveryType.value === 'delivery' ? false : true);

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

const onlyItemsPrice = computed(() => cartStore.onlyItemsPrice)

const emits = defineEmits(['submit'])

// <!-- Computed -->
const promocode = computed(() => cartStore.promocode)
const selectedLocation = computed(() => commonStore.selectedLocation)

// const endPrice = computed(() => {
//   const promocodeObj = promocode.value
//   let sum = cartItemsPrice.value
//
//   if (promocodeObj) {
//     const promocodeAmount = promocodeObj.amount
//     if (promocodeObj.type === 'percent') {
//       sum = parseInt((sum - (sum / 100 * promocodeAmount)) * 100) / 100
//     } else {
//       sum = parseInt(sum - promocodeAmount * 100) / 100
//     }
//   }
//
//   return sum
// })
//TODO вынести куда нибудь
const endPrice = computed(() => {
  const promocodeObj = promocode.value
  let sum = cartItemsRegularPrice.value//cartItemsPrice.value
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
</script>

<style lang="scss" scoped>
.page-order-buttons {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__button {
    width: 100%;
    font-weight: 600;

    @include mq($bp-medium) {
      width: auto;
    }

    &--back {
      display: none;

      @include mq($bp-medium) {
        display: flex;
      }
    }
    
    &--order {
      grid-gap: 40px;
      justify-content: space-between;
      min-width: 200px;

      span {
        font-weight: 500;
      }
    }

    &--center {
      justify-content: center;
    }
  }

  &__arrow {
    transform: rotate(180deg);
  }
}
</style>