<template>
    <div v-if="isItemExistsInStoke" class="modal-cart-supplementItem">
        <div class="modal-cart-supplementItem__main">
            <div class="modal-cart-supplementItem__image">
                <img :data-src="productImage" :alt="props.item.name" v-lazy-load>
            </div>
            <div class="modal-cart-supplementItem__content">
                <div class="modal-cart-supplementItem__top">
                    <p class="modal-cart-supplementItem__title">
                        {{ props.item.name }}
                    </p>
                </div>
                <div class="modal-cart-supplementItem__footer">
                    <div class="modal-cart-supplementItem__price">
                        <!-- <small v-if="+itemRegularPrice !== +itemPrice">
                        {{ itemRegularPrice.toLocaleString() }} ₽
                        </small> -->

                        <div v-if="itemFreeLimit.length > 0">
                            <span v-if="
                                freeItems.quantity !== 0 &&
                                !currentProductInCart?.item 
                                || (currentProductInCart?.item?.count <= freeItems.quantity)"
                            >
                                0 ₽ - {{ freeItems.quantity }} шт., далее {{ props.item.price }} ₽
                            </span>
                            <span v-else> {{ props.item.price }} ₽</span>
                        </div>
                        
                        <span v-else> {{ props.item.price }} ₽</span>

                    </div>

                    <!-- <button @click="addToCart()" class="index-menu-card__button add-button--reverse">
                        <span class="index-menu-card__button_cross">+</span>
                        <span>Добавить</span>
                    </button> -->

                    <CommonAddButton
                        :item="currentProductInCart.item"
                        :product-type="'simple'"
                        is-small
                        @increment="increment()"
                        @decrement="decrement()"
                        @add="addToCart()"
                        class="index-menu-card__button add-button"
                        :button-label="'Добавить'"
                    />
                </div>
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

const { productInCart, cartItemsPrice } = storeToRefs(cart);

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    adress: {
        type: Object,
        default: () => ({}),
    }
})

const itemFreeLimit = computed(() => {
    return props.item?.free_limits?.sort((a, b) => a.order_value - b.order_value) ?? null ;
})

const freeItems = computed(() => {
    let maxFreeItem = { quantity: 0, price: 0 };
    for (let item of itemFreeLimit.value) {
        if (cartItemsPrice.value >= item.order_value && item.quantity > maxFreeItem.quantity) {
            maxFreeItem = item;
        }
    }
    return maxFreeItem;
});


const productImage = computed(() => {
    const image = props.item.images[0]
    return imageSize(image, 'small')
})

const productType = computed(() => {
  return props.item?.type
})

const currentProductInCart = computed(() => {
  if (productType.value === 'simple' || productType.value === 'supplements_options') {
    return productInCart.value(+props.item.id)
  }

  return {
    idx: null
  }
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

const isOrderingDisabled = computed(() => commonStore.getOrderDisability)

// Methods
const addToCart = () => {
    if (isOrderingDisabled.value) {
      commonStore.toggleShowPopupModal(true);
      return;
    }

    let freeItem = null;
    if (itemFreeLimit.value !== null) {
        for (let item of itemFreeLimit.value) {
            if (cartItemsPrice.value >= item.order_value && (!currentProductInCart.value || currentProductInCart.value.idx <= item.quantity)) {
                freeItem = item;
                break;
            }
        }
    }

    const itemToAdd = { ...props.item };
    if (freeItem) {
        itemToAdd.price = 0;
        itemToAdd.regular_price = 0;
        itemToAdd.free_limits = freeItems.value;
    }

    cart.addToCart(itemToAdd);
}
const increment = () => {
    cart.incrementItem(+currentProductInCart.value.idx);
}

const decrement = () => {
    cart.decrementItem(+currentProductInCart.value.idx)
}
</script>

<style lang="scss" scoped>
.add-button {
    ::v-deep(.counter__button) {
        padding: 6px;
    }
}

.index-menu-card__button {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 5px;

    position: absolute;
    right: 15px;
    top: 13px;

    max-width: 110px;
    width: 100%;
    height: 25px;

    padding: 0;

    @include text_normal;
    font-weight: 500;
    font-size: 14px;

    background: var(--grayBg);
    border: 2px solid transparent;
    border-radius: 14px;

    white-space: nowrap;

    transition: border-color 0.3s, background-color 0.3s;

    @include mq($bp-small) {
        padding: 0 20px;
    }

    &:hover:enabled,
    &.active {
        background: var(--white);
        border-color: var(--yellowDark);
    }

    &:disabled {
        cursor: not-allowed;
    }

    &_cross {
        font-size: 20px;
    }
}

.modal-cart-supplementItem {
    position: relative;

    display: flex;
    flex-direction: column;
    grid-gap: 16px;

    padding: 5px 10px 5px 5px;

    background: var(--white);
    border-radius: 20px;

    &__main {
        height: 40px;
        display: flex;
        grid-gap: 20px;
    }

    &__image {
        flex: 0 0 auto;

        width: 50px;
        height: 40px;

        border: 1px solid var(--grayBg);
        border-radius: 15px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
        }
    }

    &__content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 10px 0;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        @include text_small;
        font-weight: 400;
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

    &__price {
        display: flex;
        flex-direction: column;
        grid-gap: 4px;

        @include text_normal;
        font-weight: 400;
        font-size: 13px;
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