<template>
  <ModalsOverlay
    :is-show="isShow"
    position="right"
    :offset="0"
    name="cart"
    @close="cartStore.toggleShowCartModal(false)"
  >
    <div
      :class="[
        'modal-cart',
        { 'modal-cart--empty' : !cartItemsLength }
      ]"
    >
      <a
        href="#"
        class="modal-cart__close"
        @click.prevent="closeModal()"
      >
        <UIIcon name="close" />
      </a>
      
      <div
        v-if="cartItemsLength"
        class="modal-cart__main"
      >
        <div class="modal-cart__header">
          <div class="modal-cart__top">
            <p
              class="modal-cart__title"
              @click.prevent="closeModal()"
            >
              <UIIcon name="arrow" />
              Корзина
            </p>

            <button
              class="modal-cart__clear"
              @click.prevent="beforeClearCart()"
            >
              <UIIcon name="trash" />
              Очистить
            </button>
          </div>
          <p class="modal-cart__count">
            {{ cartItemsLength }} товара на <span>{{ cartItemsPrice.toLocaleString() }} ₽</span>
          </p>
        </div>

        <div class="modal-cart__content">
          <ModalsCartDiscountBlock
              :is-show="isShowDiscountBlock"
              :discount="discountBlock"
              :source="'cart'"
          />

          <ModalsCartProduct
            v-for="(item, i) in filteredCartItems"
            :key="i"
            :item="item"
          />

          <ModalsCartRecommended
            v-if="RecommendedInCatalog && commonStore.selectedLocation"
            :related="RecommendedInCatalog"
            :adress="commonStore.selectedLocation"
          />

          
          <ModalsCartSupplement
            v-if="supplementsInCatalog && commonStore.selectedLocation"
            :supplements="supplementsInCatalog"
            :adress="commonStore.selectedLocation"
          />

           <CommonPromocodeBlock class="cart__promocode-block"
            in-cart
          />
          <!--
          <PagesOrderBonusBlock v-if="isBonusesEnabled"
          @submit="isShowBonusesModal = true"
           class="cart__order-bonuses" />
           -->
           <PagesOrderComposition class="cart__order-composition" in-Cart /> 

          <!-- <PagesOrderTimeDeliveryBlock class="cart__order-deliveryTime" 
            :delivery-type="deliveryType"
            :available-delivery-time="availableDeliveryTime"
            @showModal="isShowTimeDeliveryModal = true"
          /> -->
        </div>
        
        
        

        <div class="modal-cart__footer">
          

          <!-- <div class="modal-cart-delivery">
            <div class="modal-cart-delivery__icon">
              <UIIcon name="delivery" />
            </div>
            <div class="modal-cart-delivery__list">
              <div class="modal-cart-delivery__line">
                <p class="modal-cart-delivery__value">
                  Доставка
                </p>
                <p class="modal-cart-delivery__value">
                  40-50 мин
                </p>
              </div>
              <div class="modal-cart-delivery__line">
                <p class="modal-cart-delivery__value">
                  250 ₽
                </p>
                <p class="modal-cart-delivery__value modal-cart-delivery__value--gray">
                  До бесплатной 550 ₽
                </p>
              </div>
            </div>
          </div> -->

          <UIButton
            color="yellow"
            class="modal-cart-order-btn"
            @click="submit()"
            :disabled="!showDeliveryPrice"
          >
            Перейти к оформлению
            <span class="modal-cart-order-btn__price">
              <!-- <small v-if="+cartItemsRegularPrice !== +cartItemsPrice">
                {{ cartItemsRegularPrice.toLocaleString() }} ₽
              </small> -->
              <span v-if="showDeliveryPrice"> {{ cartItemsPrice.toLocaleString() }} ₽ </span>
              <span v-else> {{ onlyItemsPrice.toLocaleString() }} ₽ </span>
            </span>
          </UIButton>
        </div>
      </div>

      <ModalsCartEmptyBlock
        v-else
        @close="closeModal()"
      />
    </div>

    <LazyModalsAccept
      v-if="commonStore.isShowAcceptModal"
      title="Подтвердите удаление"
      text="Все добавленные товары будут удалены"
      @accept="clearCart()"
    />
  </ModalsOverlay>
  <!-- <LazyModalsBonuses
    v-if="isShowBonusesModal"
    @close="isShowBonusesModal = false"
  /> -->
</template>

<script setup>
import {useCalcDeliveryPrice} from '@/composables/useCalcDeliveryPrice'

const catalogStore = useCatalogStore();
const cartStore = useCartStore()
const commonStore = useCommonStore()
const userStore = useUserStore();
const chooseDiscountStore = useChooseDiscountStore();

const isBonusesEnabled = computed(() => ( userStore.bonusActive ))
const isShowBonusesModal = ref(false)

const isMobileOrTablet = computed(() => commonStore.isMobileOrTablet);

const isShowProductModal = computed(() => catalogStore.isShowProductModal)
const { selectedLocation, deliveryType } = storeToRefs(commonStore)

const { selectedProduct } = storeToRefs(catalogStore)

const showDeliveryPrice = ref(deliveryType.value === 'delivery' ? false : true);

onMounted(() => {
  if (selectedLocation?.value?.zone && deliveryType.value === 'delivery') {
    const shouldShowDeliveryPrice = selectedLocation.value.zone.sum.some(item => 
      parseFloat(item.min_sum_order) <= parseFloat(cartStore.cartItemsPrice)
    );

    showDeliveryPrice.value = shouldShowDeliveryPrice;
  }

  useCalcDeliveryPrice();
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

const isOrderingDisabled = computed(() => commonStore.getOrderDisability)

const supplementsInCatalog = computed(() => {
  return catalogStore.catalog.find(item => item.name.toLowerCase() === 'допы')?.products || null;
})

const RecommendedInCatalog = computed(() => {
  return catalogStore.catalog.find(item => item.name.toLowerCase() === 'рекомендуемые в корзине')?.products || null;
})

const { cartItems, cartItemsLength, cartItemsRegularPrice, cartItemsPrice, isShowDiscountBlock, discountBlock, discountProducts } = storeToRefs(cartStore)
const isShow = ref(true)

const filteredCartItems = computed(() => {
  return cartItems.value.filter(item => {
    let discounIds = discountProducts.value?.map(item => item.id);

    if (!discounIds.includes(item.id)) {
      return true;
    }
    else {
      return false;
    }
  })
})

const closeModal = () => {
  isShow.value = false
}

const beforeClearCart = () => {
  commonStore.toggleShowAcceptModal(true)
}

const clearCart = () => {
  cartStore.clearCart()
}

const submit = () => {
  if (isOrderingDisabled.value) {
    commonStore.toggleShowPopupModal(true);
    return;
  }
  if (!commonStore.selectedLocation) {
    commonStore.toggleShowReceiptModal(true);
    return;
  }
  closeModal()
  if (commonStore.selectedLocation) {
    navigateTo('/order')
  }
}
</script>

<style lang="scss" scoped>
.d-none {
  display: none;
}
.cart__order-composition {
  box-shadow: none;
  padding: 20px 22px;
}

.cart__order-deliveryTime {
  margin-top: 10px;
}

.cart__order-bonuses {
  margin: 20px 0;
  padding: 0 20px;
}

.cart__promocode-block {
  margin: 10px 0;

  :deep > input {
    background: var(--white);
  }
}

.modal-cart {
  position: relative;

  width: 100vw;
  max-width: 512px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: var(--grayBg);

  @include mq($bp-small) {
    border-radius: 40px 0 0 40px;
  }

  &--empty {
    justify-content: center;
  }

  &__close {
    display: none;

    @include mq($bp-small) {
      display: block;

      position: absolute;
      left: -60px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__title {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_large;
    font-weight: 700;

    @include mq($bp-small) {
      @include h2;
    }

    span {
      transform: rotate(180deg);

      @include mq($bp-small) {
        display: none;
      }
    }
  }

  &__main {
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-bottom: 110px;

    @include maq($bp-small) {
      padding-bottom: 90px;
    }
  }

  &__header {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding: 20px;

    background: var(--white);
    border-bottom: 1px solid var(--grayText2);
    
    @include mq($bp-small) {
      padding: 40px 40px 20px;

      border-radius: 40px 0 0 0;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__clear {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    @include text_normal;
    font-weight: 500;
    color: var(--grayText);

    :deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: var(--grayText);
      }
    }
  }

  &__count {
    display: none;

    @include mq($bp-small) {
      display: block;

      @include text_big;
      font-weight: 600;

      span {
        color: var(--orange);
      }
    }
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    padding: 20px;

    overflow-y: auto;

    @include mq($bp-small) {
      padding: 28px 40px;
    }
  }

  &__footer {
    flex: 0 0 auto;

    position: absolute;
    bottom: 0;
    z-index: 100;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding: 20px;

    background: var(--white);
    border-top: 1px solid var(--grayText2);
    
    @include mq($bp-small) {
      grid-gap: 20px;

      padding: 20px 40px 40px;
      
      border-radius: 0 0 40px 0;
    }
  }
}

.modal-cart-delivery {
  display: flex;
  align-items: center;
  grid-gap: 18px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 52px;
    height: 52px;

    background: var(--grayBg);
    border-radius: 14px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 5px;
  }

  &__line {
    display: flex;
    align-items: center;
  }

  &__value {
    display: flex;
    align-items: center;

    @include text_small;
    font-weight: 500;

    &:after {
      content: '';
      display: block;
      width: 3px;
      height: 3px;

      margin: 0 5px;

      background: var(--grayText);
      border-radius: 50%;
      opacity: 0.3;
    }

    &:last-child {
      &:after {
        display: none;
      }
    }

    &--gray {
      color: var(--grayText);
    }
  }
}

.modal-cart-order-btn {
  justify-content: space-between;

  padding: 0px 20px;

  font-weight: 500;

  &__price {
    display: flex;
    align-items: center;
    grid-gap: 6px;

    font-weight: 600;

    small {
      @include extra_small;
      color: rgba(0, 0, 0, 0.30);
      text-decoration: line-through;
    }
  }
}
</style>