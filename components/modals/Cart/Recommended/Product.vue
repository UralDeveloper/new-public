<template>
  <div v-if="isItemExistsInStoke" class="modal-product-recommended-item" @click="openProduct()">
    <div class="modal-product-recommended-item__image">
      <img v-lazy-load :data-src="itemImage" alt="">

      <p v-if="discount" class="modal-product-recommended-item__discount">
        -{{ discount }}%
      </p>
    </div>
    <div class="modal-product-recommended-item__content">
      <p class="modal-product-recommended-item__title">
        {{ props.item.name }}
      </p>

      <CommonPriceBlock :regular-price="itemRegularPrice" :price="itemPrice" is-reverse />

      <div>

        <!-- <div v-if="isItemInCart" class="add-button add-button--counter active">
            <button class="add-button--counter__operation" @click="decrement()">-</button>
            <span>{{ countLabel }}</span>
            <button class="add-button--counter__operation" @click="increment()">+</button>
        </div>

        <button v-else type="submit" :disabled="disabled"
        class='cart-recommended-item__button'
        @click.stop.prevent="addToCart()">

            <span class="cart-recommended-item__button_cross">+</span>
            <span>Добавить</span>

        </button> -->
        <CommonAddButton
            :item="currentProductInCart.item"
            :product-type="productType"
            is-small
            @increment="increment()"
            @decrement="decrement()"
            @add="addToCart()"
            class="cart-recommended-item__button"
        />

      </div>

    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common';
import imageSize from '@/utils/imageSize'

const cart = useCartStore()
const commonStore = useCommonStore()

const { productInCart } = storeToRefs(cart)

const countLabel = computed(() => {
  if (props.item) {
    let portion_nat_size = props.item.portion_nat_size || 1
    const value = parseInt(((+portion_nat_size) * +currentProductInCart.value.item.count) * 100) / 100
    return `${value} ${props.item.measure_unit}`
  }

  return null
})

const props = defineProps({
  item: {
    type: Object,
    default: () => ([]),
  },

  adress: {
    type: Object,
    default: () => ({}),
  }
})

const itemImage = computed(() => {
  return props.item?.images[0] || ''
})

const isItemInCart = computed(() => {
  let data = cart.cartItems.find(item => item.id == props.item.id);

  if (data) {
    return data;
  }
  else {
    return null;
  }
})

const itemPrice = computed(() => {
  return +props.item.price
})

const itemRegularPrice = computed(() => {
  return +props.item.regular_price
})

const discount = computed(() => {
  if (itemPrice.value !== itemRegularPrice.value) {
    return 100 - Math.round(itemPrice.value / itemRegularPrice.value * 100)
  }

  return 0
})

// TODO отрефакторить
const isItemExistsInStoke = computed(() => {
  if (commonStore.deliveryType == 'delivery') { // доставка
    for (const location of props.item.locations) {
      if (location.id == props.adress.zone.sklad) {
        if (props.item.manage_stock && location.quantity > 0) {
          return true; // если на выбранном складе (после определения адреса) есть товар
        }
        else if (!props.item.manage_stock && props.item.in_stock) {
          return true; // если на выбранном складе регулирование товара отключено, но товар присутствует
        }
        else {
          return false;
        }
      }
    }
  }
  else if (commonStore.deliveryType == 'pickup') { // самовывоз
    for (const location of props.item.locations) {
      if (location.id == props.adress.warehouse_id) {
        if (props.item.manage_stock && location.quantity > 0) {
          return true; // если на выбранном складе (после определения адреса) есть товар
        }
        else if (!props.item.manage_stock && props.item.in_stock) {
          return true; // если на выбранном складе регулирование товара отключено, но товар присутствует
        }
        else {
          return false;
        }
      }
    }
  }
  else {
    return false;
  }
})

const productType = computed(() => {
  return props.item?.type
})

const currentProductInCart = computed(() => {
  if (productType.value === 'simple') {
    return productInCart.value(+props.item.id)
  }

  return {
    idx: null
  }
})

const isOrderingDisabled = computed(() => commonStore.getOrderDisability)

// Methods
const addToCart = () => {
  if (isOrderingDisabled.value) {
    commonStore.toggleShowPopupModal(true);
    return;
  }
  cart.addToCart(props.item)
}

const increment = () => {
  cart.incrementItem(currentProductInCart.value.idx)
}

const decrement = () => {
  cart.decrementItem(currentProductInCart.value.idx)
}
</script>

<style lang="scss" scoped>
.modal-product-recommended-item {
  display: flex;
  align-items: center;
  grid-gap: 20px;

  &:hover {
    cursor: pointer;
  }

  width: 310px;

  padding: 5px;

  background: var(--white);
  border-radius: 20px;

  &__image {
    position: relative;
    flex: 0 0 auto;

    width: 100px;
    height: 100px;

    border: 1px solid var(--grayBg);
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__discount {
    position: absolute;
    top: 8px;
    left: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 47px;
    height: 19px;

    @include extra_small;
    font-weight: 600;

    background: var(--grayBg);
    border-radius: 16px;
  }

  &__content {
    height: 100px;
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin-top: 6px;
    margin-bottom: 9px;
    max-width: 120px;
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__button {
    // width: 135px;

    margin-top: 15px;

    // font-weight: 500;
  }
}
</style>
<style lang="scss" scoped>
// .cart-recommended-item__button {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     grid-gap: 5px;

//     position: absolute;
//     right: 10px;
//     bottom: 10px;

//     max-width: 110px;
//     width: 100%;
//     height: 25px;

//     padding: 0;

//     @include text_normal;
//     font-weight: 500;
//     font-size: 14px;

//     background: var(--grayBg);
//     border: 2px solid transparent;
//     border-radius: 14px;

//     white-space: nowrap;

//     transition: border-color 0.3s, background-color 0.3s;

//     @include mq($bp-small) {
//         padding: 0 20px;
//     }

//     &:hover:enabled,
//     &.active {
//         background: var(--white);
//         border-color: var(--yellowDark);
//     }

//     &:disabled {
//         cursor: not-allowed;
//     }

//     &_cross {
//         font-size: 20px;
//     }
// }

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;


  position: absolute;
  right: 10px;
  bottom: 10px;

  max-width: 130px;
  width: 100%;
  height: 25px;
  padding: 0;

  @include text_normal;
  font-weight: 500;

  background: var(--grayBg);
  border: 2px solid transparent;
  border-radius: 14px;

  white-space: nowrap;

  transition: border-color 0.3s, background-color 0.3s;

  &--reverse {
    flex-direction: row-reverse;
  }

  &--counter {
    justify-content: space-between;

    &__operation {
      font-size: 25px;
      font-weight: 400;
      width: 40px;
    }
  }

  &--small {
    height: 32px;

    padding: 0;

    @include text_small;
    font-weight: 500;
  }

  &:hover:enabled,
  &.active {
    background: var(--white);
    border-color: var(--yellowDark);
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>