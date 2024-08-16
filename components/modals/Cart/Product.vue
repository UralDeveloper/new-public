<template>
  <div class="modal-cart-item" v-if="!isItSupplement">
    <button
      class="modal-cart-item__remove"
      @click.stop="removeFromCart()"
    >
      <UIIcon name="trash" />
    </button>
    <div class="modal-cart-item__main">
      <div class="modal-cart-item__image">
        <img
          :data-src="productImage"
          :alt="item.name"
          :key="item.id"
          v-lazy-load
        >
      </div>
      <div class="modal-cart-item__content">
        <div class="modal-cart-item__top">
          <p class="modal-cart-item__title">
            {{ item.name }}
          </p>
          <p
              class="modal-cart-item__info"
              v-if="item?.variation_id"
          >
             <span>{{ variableItemName }} </span>
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

        <div class="modal-cart-item__footer">
          <div class="modal-cart-item__price">
            <small v-if="+itemRegularPrice !== +itemPrice">
              {{ itemRegularPrice.toLocaleString() }} ₽
            </small>
            {{ itemPrice.toLocaleString() }} ₽
          </div>

          <UICounter
              v-if="! isDiscountProduct"
              :count="counterLabel"
              :id="item.id"
              @increment="increment()"
              @decrement="decrement()"
              class="modal-cart-item__counter"
          />
        </div>
      </div>
    </div>

    <div
      v-if="item.supplements.length"
      class="modal-cart-item__supplements"
    >
      <div
        v-for="(supplement, s) in item.supplements"
        :key="s"
        class="modal-cart-item-supplement"
      >
        <p class="modal-cart-item-supplement__name">
          {{ supplement.name }}
        </p>

        <div class="modal-cart-item-supplement__info">
          <p class="modal-cart-item-supplement__count">
            {{ supplement.count }} шт
          </p>
          <p class="modal-cart-item-supplement__price">
            +{{ supplement.price }} ₽
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCalcDeliveryPrice} from '@/composables/useCalcDeliveryPrice'
import  { useCartStore } from '@/store/cart'
import imageSize from '@/utils/imageSize'

const cart = useCartStore()
const catalogStore = useCatalogStore();
const { productInCart } = storeToRefs(cart)

const router = useRouter();
const route = useRoute();

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  }
})

const supplementsInCatalog = computed(() => {
  return catalogStore.catalog?.find(item => item.name.toLowerCase() === 'допы')?.products || null;
})

const currentSupplement = computed(() => {
  return supplementsInCatalog?.value?.find(item => +item.id === +props.item.id) || null;
})

const catalogIds = computed(() => new Set(supplementsInCatalog?.value?.map(item => item.id))) 

const isItSupplement = computed(() => {
  return catalogIds.value.has(+props.item.id);
})

// console.log(currentSupplement.value);

// console.log('+++++props.item', props.item)

const isDiscountProduct = computed(() => {
  return cart.getDiscountProductById(props.item.id) !== undefined
})
// Computed
const productImage = computed(() => {
  const image = props.item.image
  return imageSize(image, 'small')
})

const counterLabel = computed(() => {
  //let add_to_basket_once = props.item.add_to_basket_once || 1;
  let portion_nat_size = props.item.portion_nat_size || 1;
  const value = parseInt((portion_nat_size * props.item.count * 100).toString()) / 100;
  return `${value} ${props.item.measure_unit}`
})

const currentProductInCart = computed(() => {
  return productInCart.value(+props.item.id, props.item.supplements, props.item.variation_id || null)
})

const supplementsPrice = computed(() => {
  return props.item.supplements.reduce((acc, item) => {
    acc += item.count * item.price

    return acc
  }, 0)
})

const itemRegularPrice = computed(() => {
  let add_to_basket_once = props.item.add_to_basket_once || 1;
  return (supplementsPrice.value + (+props.item.regular_price * +add_to_basket_once)) * props.item.count
})

const itemPrice = computed(() => {
  let add_to_basket_once = props.item.add_to_basket_once || 1;

  if (currentSupplement.value && props.item.count > 2) {
    return (supplementsPrice.value + (+props.item.price * +add_to_basket_once)) * props.item.count - currentSupplement.value.price * 2
  }
  return (supplementsPrice.value + (+props.item.price * +add_to_basket_once)) * props.item.count
})

const variableItemName = computed(() => {
  if(!props.item?.variation_id)
      return '';
  let name = '';
  props.item?.variation_data?.attributes.map( attr => {
    name += attr.name + ': ' + decodeURI(attr.option) + ' ';
  })
  return name;

});
// Methods
const openProduct = () => {
  const productId = +props.item.id

  catalogStore.setProduct(productId);

  console.log(props.item);

  let productUrl = `/menu${props.item?.url || ''}`

  window.history.replaceState(null, '', productUrl);

  catalogStore.selectedProductUrl = productUrl;

  catalogStore.isOpenedFromCart = true;

  if (props.item.supplements) {
    catalogStore.cartProductSelectedSupplements = props.item.supplements;
  }

}

const removeFromCart = () => {
  cart.removeFromCart(+currentProductInCart.value.idx)
  useCalcDeliveryPrice()
}

const increment = () => {
  cart.incrementItem(+currentProductInCart.value.idx)
  useCalcDeliveryPrice()
}

const decrement = () => {
  cart.decrementItem(+currentProductInCart.value.idx)
  useCalcDeliveryPrice()
}
</script>

<style lang="scss" scoped>
.modal-cart-item {
  position: relative;

  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  padding: 5px 10px 5px 5px;

  background: var(--white);
  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }

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

    width: 100px;
    height: 100px;

    border: 1px solid var(--grayBg);
    border-radius: 20px;

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

    margin-top: 20px;
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

  &__counter {
    max-width: 130px;
  }

  &__supplements {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    padding: 0 10px 5px 8px;
  }
}
</style>
<style lang="scss" scoped>
.modal-cart-item-supplement {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__name {
    @include text_small;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__count {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    padding: 3px 6px;

    @include text_mini;

    background: var(--grayBg);
    border-radius: 23px;
  }

  &__price {
    width: 60px;

    padding-left: 10px;

    @include text_small;
    font-weight: 600;
    color: #B0B0B0;
    text-align: right;
  }
}
</style>