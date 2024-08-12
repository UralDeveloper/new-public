<template>
    <div class="productItem" @click="openProduct">
        <div class="productItem-preview">
            <NuxtLink data-bs-toggle="modal" data-bs-target="#pie">
                <img :data-src="productImage" :key="props.product.id" v-lazy-load alt="">
            </NuxtLink>
        </div>
        <div class="productItem-content">
            <div class="productItem-info">
                <h4><NuxtLink data-bs-toggle="modal" data-bs-target="#pie">
                    {{ props.product?.name }}
                </NuxtLink></h4>
                <span>
                    {{ props.product?.description }}
                </span>
            </div>

            <div class="productItem-footer" v-if="!isProductInCart">
                <div class="productItem-price">
                    <span class="priceRub"> {{ props.product.price }} ₽</span> 
                </div>
                <NuxtLink class="btn btn-primary" @click="addToCart">Заказать</NuxtLink>
            </div>

            <div class="productItem-footer" v-else>
                <div class="productItem-price">
                    <span class="priceRub"> {{ props.product.price }} ₽</span> 
                </div>

                <div class="counter-wrapper productItem-counter">
                    <button @click="decrement" type="button" class="counter-minus btn btn-default btn-number">-</button>

                    <input type="number" class="counter-value" 
                    name="number" 
                    :value="count" 
                    id="numberOfGuests">

                    <button @click="increment" type="button" class="counter-plus btn btn-default btn-number">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const catalogStore = useCatalogStore();
const cartStore = useCartStore();

const { productInCart, cartItemsLength } = storeToRefs(cartStore)

const props = defineProps({
    product: {
        type: Object,
        default: () => { },
    }
})

const isProductInCart = computed(() => {
    return cartStore.cartItems.some(item => +item.id === +props.product.id)
})

const count = computed(() => {
    if (isProductInCart.value) {
       return productInCart.value(+props.product.id).item.count;
    } else {
        return 0
    }
})

const productType = computed(() => {
  return props.product?.type
})

const currentProductInCart = computed(() => {
  if (productType.value === 'simple' || 'supplements') { //supplements - temp solution
    return productInCart.value(+props.product.id)
  }

  else if (productType.value === 'supplements' && props.product.acf.supplements) {
    let temp = props.product.acf.supplements.some(supplement => {
      return supplement.products && supplement.products.length > 0;
    })

    if (!temp) return productInCart.value(+props.product.id);
  }

  return {
    idx: null,
    item: null,
  }
})

const productImage = computed(() => props.product.images[0])

const openProduct = () => {
    catalogStore.setProduct(props.product.id)
}

const addToCart = () => {
    cartStore.addToCart(props.product);
}

const increment = () => {
    cartStore.incrementItem(currentProductInCart.value.idx)
}

const decrement = () => {
    cartStore.decrementItem(currentProductInCart.value.idx)
}
</script>