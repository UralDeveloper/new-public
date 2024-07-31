<template>
  <form
    :class="[
      'promocode-block',
      {
        'promocode-block--cart' : inCart,
        'promocode-block--error' : promocodeResult.status === 'error',
        'promocode-block--success' : promocodeResult.status === 'success'
      }
    ]"
    @submit.prevent="onSubmit()"
  >
    <span class="promocode-block__icon">
      <UIIcon name="promocode" />
    </span>
    <input
      v-model.trim="promocode"
      type="text"
      placeholder="Промокод"
      :disabled="isLoading || !!promocodeResult.status"
      class="promocode-block__input"
    >

    <div class="promocode-block__actions">
      <button
        v-if="promocodeResult.status"
        class="promocode-block__action"
        @click.prevent.stop="onReset()"
      >
        Сбросить
      </button>
      <button
        v-else
        :disabled="isLoading"
        type="submit"
        class="promocode-block__action"
      >
        {{ isLoading ? 'Применяем...' : 'Применить' }}
      </button>
    </div>

    <span
      v-if="promocodeResult.status"
      class="promocode-block__status">
      {{ promocodeResult.message }}
    </span>
  </form>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import {useCommonStore} from "~/store/common";
import {useChooseDiscountStore} from "~/store/choose_discount";

const cartStore = useCartStore()
const chooseDiscountStore = useChooseDiscountStore()
const { cartItems, needApplyPromocode } = storeToRefs(cartStore)
const config = useRuntimeConfig()

defineProps({
  inCart: {
    type: Boolean,
    default: false,
  },
})

const promocode = ref('')
const promocodeResult = reactive({
  status: null, // null | error | success
  message: '',
})
const isLoading = ref(false)
//const wentToPromoCondition = ref(false)
// <!-- Computed -->
const promocodeObj = computed(() => cartStore.promocode)
watch(() => promocodeObj.value, () => {
  const promocode = promocodeObj.value
  console.log("promocode WATCH: ",promocode)
  if (promocode?.amount > 0 && promocode?.value && promocode?.type) {
    promocodeResult.message = 'Промокод успешно применён'
    promocodeResult.status = 'success'
    isLoading.value = false
    cartStore.setNeedApplyPromocode(false)
    //wentToPromoCondition.value = false
  }
})
// <!-- Methods -->
const onReset = () => {
  promocode.value = ''
  promocodeResult.status = null
  promocodeResult.message = ''
  cartStore.setPromocode(null)
  let selectedPromocodes = chooseDiscountStore.discountItems.filter((item) => {
    return [cartStore.defaultImages.promoPercent, cartStore.defaultImages.promoFixed].includes(item.image) && item.isSelected
  })
  console.log('__selectedPromocodes', selectedPromocodes)
  if (selectedPromocodes.length > 0) {
    const autoCouponLength = cartStore.getAutoCoupons.length + 1
    chooseDiscountStore.clearSelected()
    cartStore.setDiscountBlock({
      header: "Вам доступны скидка или подарок!",
      description: "Вам доступны " + autoCouponLength + " скидки или подарка. Выберите 1 из предложенных вариантов",
      buttonColor: "yellow",//"#ffce00",
      buttonText: "Выбрать",
      image: cartStore.defaultImages.giftImg
    })
  }
}

const onSubmit = async () => {
  if (isLoading.value) {
    return false
  }

  isLoading.value = true

  const obj = {}

  obj.coupon_code = promocode.value

  obj.line_items = cartItems.value.map(item => {
    return {
      product_id: item.id,
      quantity: item.count,
    }
  })

  const { data, error } = await useFetch(`${config.public.BASE_URL}/wp-json/api/flutter_woo/coupon`, {
    method: 'POST',
    body: obj
  })

  let status = null;
  let message = '';
  if (error?.value) {
    message = error?.value?.data?.message || 'Не удалось применить промокод'

    status = 'error'
  } else {
    const coupon = data?.value?.coupon || {}
    const commonStore = useCommonStore()
    const settings = commonStore.promoSettings
    const isPromoCodeAddedToDiscounts = chooseDiscountStore.discountItems.filter((item) => {
      return [cartStore.defaultImages.promoPercent, cartStore.defaultImages.promoFixed].includes(item.image)
    }).length !== 0
    // if (! settings?.coupons_and_auto_coupons_summing && coupon && ! needApplyPromocode.value /*&& ! isPromoCodeAddedToDiscounts*/) {
    //   console.log("returned coupon:",coupon)
    //   if (! isPromoCodeAddedToDiscounts) {
    //     chooseDiscountStore.addDiscount({
    //       id: Date.now(),
    //       name: obj.coupon_code,
    //       image: coupon.discount_type === 'percent' ? cartStore.defaultImages.promoPercent : cartStore.defaultImages.promoFixed,
    //       amount: coupon.amount,
    //       description: "Скидка " + coupon.amount + (coupon.discount_type === 'percent' ? '%' : 'р'),
    //       discountType: coupon.discount_type,
    //       isSelected: false,
    //       product: null
    //     }, true)
    //     chooseDiscountStore.clearSelected()
    //   }
    //   //isLoading.value = false
    //   //wentToPromoCondition.value = true
    //   onReset()
    //   if (cartStore.isShowCartModal)
    //     chooseDiscountStore.toggleChooseDiscountModal(true, 'cart')
    //   else {
    //     cartStore.setNeedOpenChooseDiscountModal(true)
    //   }
    //   return false
    // }
    // else {
      message = 'Промокод успешно применён'
      status = 'success'


      cartStore.setPromocode({
        value: promocode.value,
        type: coupon.discount_type,
        amount: parseFloat(coupon.amount)
      })
      cartStore.setNeedApplyPromocode(false)
      //wentToPromoCondition.value = false
    // }
  }

  promocodeResult.status = status
  promocodeResult.message = message

  isLoading.value = false
}

const setDefault = () => {
  if (promocodeObj.value) {
    promocode.value = promocodeObj.value.value

    onSubmit()
  }
}

setDefault()
</script>

<style lang="scss" scoped>
.promocode-block {
  position: relative;

  width: 100%;

  &--error {
    .promocode-block {
      &__input {
        border-color: var(--red);
      }

      &__actions {
        &:before {
          background: var(--orangeLight);
        }
      }

      &__action, &__status {
        color: var(--red);
      }
    }
  }

  &--success {
    .promocode-block {
      &__input {
        border-color: var(--green);
      }

      &__actions {
        &:before {
          background: var(--greenLight);
        }
      }

      &__action, &__status {
        color: var(--green);
      }
    }
  }

  &--cart {
    .promocode-block {
      &__status {
        top: 100%;

        @include text_mini;
        font-weight: 500;
      }
    }
  }

  &__icon {
    position: absolute;
    top: 12px;
    left: 16px;
    bottom: 12px;

    z-index: 1;
  }

  &__input {
    width: 100%;
    height: 48px;

    padding: 12px 16px 12px 52px;

    @include text_normal;
    font-weight: 500;

    background: var(--grayBg2);
    border: 1px solid var(--grayBg2);
    border-radius: 14px;

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

  &__actions {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;

    padding-right: 4px;

    &:before {
      content: '';

      display: block;

      width: 2px;
      height: 20px;

      background: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
    }
  }

  &__action {
    height: 100%;

    padding: 0 16px;

    @include text_normal;
    font-weight: 500;
    color: var(--grayText);

    background: none;
    border: none;
  }

  &__status {
    position: absolute;
    top: calc(100% + 4px);
    left: 16px;

    @include text_small;
    font-weight: 500;
  }
}
</style>