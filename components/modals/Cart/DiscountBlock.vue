<template>
  <div class="modal-cart-item"
       v-if="discount"
  >
    <button
        class="modal-cart-item__remove"
        @click.prevent="hideDiscountBlock()"
    />
    <div class="modal-cart-item__main"

    >
      <div class="modal-cart-item__image">
        <img v-if="isProduct"
            :data-src="discountProductImage"
            :alt="discount?.header"
            :key="discount?.header"
            v-lazy-load
        >
        <img v-else
            :data-src="discount?.image"
            :alt="discount?.header"
            :key="discount?.description"
            v-lazy-load
        >
      </div>
      <div class="modal-cart-item__content" :class="{'single-discount': discounts.length === 1}">
        <div class="modal-cart-item__top">
          <p class="modal-cart-item__title">
            {{ discount?.header }}
          </p>
          <!-- <p class="modal-cart-item__info">
            <span>
              100 гр
            </span>
            <span>
              1680 ₽/шт
            </span>
          </p> -->
        </div>

        <div class="modal-cart-item__middle">
          <p class="modal-cart-item__discount-description" v-if="discounts.length > 1">
            {{ discount?.description }}
          </p>
          <p class="modal-cart-item__discount-description" v-else>
            У вас есть 1 подарок
          </p>
        </div>

        <div class="modal-cart-item__footer" v-if="discounts.length > 1">
          <UIButton
              v-bind:color="buttonColorRef?.value"
              :class="[
                'modal-cart-discount-btn',
                buttonColor === 'white' ? `active` : '',
              ]"
              @click.prevent="toggleChooseDiscountModal()"
          >
            {{ discount?.buttonText }}
          </UIButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//const emits = defineEmits(['close'])
import imageSize from "~/utils/imageSize";
import  { useChooseDiscountStore } from '@/store/choose_discount'
const discountStore = useChooseDiscountStore()
const discounts = computed(() => discountStore.discounts)

const cartStore = useCartStore();
const catalogStore = useCatalogStore();

const isProduct = computed(() => {
  return cartStore.discountProducts.length > 0 ? true : false;
})

const discountProductImage = computed(() => {
  if (isProduct.value) {
    const product = catalogStore.getProductById(cartStore.discountProducts[0].id)

    return product?.images[0] || '';
  }
  else {
    return ''
  }
})

const props = defineProps({
  discount: {
    type: Object,
    default: () => null,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  source: {
    type: String,
    default: ''
  }
})

const buttonColorRef = ref(props?.discount?.buttonColor)
console.log("discount inside block:", props.discount);
//const isShow = ref(true)
// const discountImage = computed(() => {
//   const image = props.discount.image
//   return imageSize(image, 'small')
// })
const toggleChooseDiscountModal = () => {
  discountStore.toggleChooseDiscountModal(true, props.source.toString())
}
const hideDiscountBlock = () => {
  isShow.value = false
}
const buttonColor = computed(() => {
  return props?.discount?.buttonColor
})
</script>
<style lang="scss" scoped>
.modal-cart-discount-btn {
  &.active {
    background: var(--white);
    border: 1px solid var(--yellowDark);

    &:hover {
      color: var(--white);
      background: var(--yellowDark);
    }
  }
  &:not(.active) {
    background: var(--yellow);

    &:hover {
      color: var(--white);
      background: var(--yellowDark);
    }
  }
  width: 100%;
  height: 35px;
}

.modal-cart-item {
  position: relative;
  &__discount-description {
    @include text_small;
    opacity: 0.5;
  }
  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  padding: 5px 10px 5px 5px;

  background: var(--white);
  border-radius: 20px;

  &__remove {
    position: absolute;
    top: 15px;
    right: 10px;

    :deep(.ui-icon) svg {
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

    //width: 100px;
    //height: 100px;
    height: 130px;
    width: 130px;

    border: 1px solid var(--grayBg);
    border-radius: 20px;
    align-self: center;

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

    &.single-discount {
      justify-content: center;
    }
  }

  &__top {
    display: grid;
    grid-gap: 4px;

    padding-right: 30px;
  }
  &__middle {
    margin-top: 5px;
  }
  &__title {
    font-size: 20px;
    //@include text_small;
    font-weight: 600;
    line-height: 1.1;
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

  &__price {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    @include text_normal;
    font-weight: 600;
    color: var(--orange);

    small {
      @include extra_small;
      color: rgba(0, 0, 0, 0.30);
      text-decoration: line-through;
    }
  }
}
</style>