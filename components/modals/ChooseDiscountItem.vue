<template>
  <div class="modal-discount-item">
<!--    <button-->
<!--        class="modal-discount-item__remove"-->
<!--        @click.prevent="hideDiscountBlock()"-->
<!--    />-->
    <div class="modal-discount-item__main">
      <div class="modal-discount-item__image" :class ="(isDiscountDisabled)?'disabled':'enabled'">
        <img
            :data-src="item.image"
            :alt="item.name"
            v-lazy-load
        >
      </div>
      <div class="modal-discount-item__content">
        <div class="modal-discount-item__top">
          <p class="modal-discount-item__title">
            {{ item.name }}
          </p>
        </div>

        <div class="modal-discount-item__middle">
          <p class="modal-discount-item__middle__description" :class ="(isDiscountDisabled)?'disabled':'enabled'">
            {{ item.description}}
          </p>
        </div>

        <div class="modal-discount-item__footer">
          <UIButton
              color="yellow"
              :class="[
                'modal-discount-item__select-btn',
                item.isSelected ? `disabled` : 'enabled',
              ]"
              @click.prevent="toggleDiscountSelect()"
              :disabled="isDiscountDisabled"
          >
            <span v-if="item.isSelected" class="modal-discount-item__select-btn__text">Изменить выбор</span>
            <span v-else class="modal-discount-item__select-btn__text">{{ (item.type in ["percent", "amount", "fixed_cart"]) ? "Применить промокод" : "Получить подарок" }}</span>
          </UIButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useChooseDiscountStore } from '@/store/choose_discount'
import {useCartStore} from "~/store/cart";
const cartStore = useCartStore()
const chooseDiscountStore = useChooseDiscountStore()
//const { productInCart } = storeToRefs(cart)

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  }
})
const toggleDiscountSelect = () => {
  props.item.isSelected = ! props.item.isSelected
  //setPrevDiscountProduct()
  chooseDiscountStore.setSelectedDiscountValue(props.item.id, props.item.isSelected)
}
// const setPrevDiscountProduct = () => {
//   const cart = useCartStore()
//   const cartItem = cart.productInCart(props.item.product.id, /*[], props.item.product.variationId*/)
//   if (cartItem.item) {
//     console.log("setSelectedProduct cartItem before condition: ",cartItem)
//     const discountProduct = {
//       id: cartItem.item.id,
//       idx: cartItem.idx
//     }
//     cart.setPrevDiscountProduct(discountProduct)
//     console.log("setSelectedProduct props.item inside: ",props.item)
//   }
// }
// const isDefaultImage = computed(() => {
//   return Object.values(cartStore.defaultImages).find(((image) => image === props.item.image)) !== undefined
// })
const selectedDiscountExists = computed(() => {
  return chooseDiscountStore.selectedDiscount.length > 0
})
const isSelected = computed(() => {
  if (selectedDiscountExists) {
    return chooseDiscountStore?.selectedDiscount[0]?.id === props.item.id
  }
  else {
    return false;
  }
})
const isDiscountDisabled = computed(() => {
  return (selectedDiscountExists.value && (! props.item.isSelected))
})
</script>
<style scoped lang="scss">
.modal-discount-item {
  position: relative;
  border-bottom: 1px solid #F5F4F2;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  padding: 5px 10px 5px 5px;

  background: var(--white);
  //border-radius: 20px;
  &__select-btn {
    width: 100%;
    height: 35px;
    font-weight: 600;
    &.disabled {
      background: white;
      border: 1px solid yellow;
    }
  }
  &__remove {
    position: absolute;
    top: 15px;
    right: 10px;

    ::v-deep(.ui-icon) svg {
      width: 18px;
      height: 18px;

      path {
        fill: var(--grayText);
      }
    }
  }

  &__main {
    display: flex;
    grid-gap: 20px;
  }

  &__image {
    flex: 0 0 auto;

    width: 100px;
    height: 100px;

    border: 1px solid var(--grayBg);
    border-radius: 20px;
    &.disabled {
      opacity: 0.5;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 10px 0;
  }
  &__middle {
    &__description {
      &.disabled {
        opacity: 0.5;
      }
    }
  }
  &__top {
    display: grid;
    grid-gap: 4px;

    padding-right: 30px;
  }

  &__title {
    @include text_small;
    font-weight: 600;
  }

  &__info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @include text_mini;
    color: var(--grayText);

    span {
      display: flex;
      align-items: center;

      &:after {
        content: '';
        display: block;
        width: 3px;
        height: 3px;

        margin: 0 4px;

        background: var(--grayText);
        border-radius: 50%;
        opacity: 0.3;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>