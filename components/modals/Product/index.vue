<template>
    <div class="modal modal-product fade" id="pie" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-product-preview">
                        <img :data-src="productImage" :key="product.id" v-lazy-load alt="">
                    </div>
                    <div class="modal-product-info">
                        <div class="modal-product-info-title">
                            <h3> {{ product.name }} </h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-product-info-description">
                            <p>{{ product.description }}</p>
                        </div>
                        <div class="productItem-footer" v-if="!isProductInCart">
                            <div class="productItem-price">
                                <span class="priceRub"> {{ product.price }} ₽</span>
                            </div>
                            <NuxtLink class="btn btn-primary" @click="addToCart">Заказать</NuxtLink>
                        </div>

                        <div class="productItem-footer" v-else>
                            <div class="productItem-price">
                                <span class="priceRub"> {{ product.price }} ₽</span>
                            </div>

                            <div class="counter-wrapper productItem-counter productItem">
                                <button @click="decrement" type="button"
                                    class="counter-minus btn btn-default btn-number productItem">-</button>

                                <input type="number" class="counter-value productItem" name="number" :value="count"
                                    id="numberOfGuests">

                                <button @click="increment" type="button"
                                    class="counter-plus btn btn-default btn-number productItem">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const catalogStore = useCatalogStore();
const cartStore = useCartStore();

const { selectedProduct, selectedProductId } = storeToRefs(catalogStore)

const { productInCart, cartItemsLength } = storeToRefs(cartStore)

const product = computed(() => selectedProduct?.value())

const productImage = computed(() => product?.value?.images[0])

const isProductInCart = computed(() => {
    return cartStore.cartItems.some(item => +item.id === +product.value.id)
})

const productType = computed(() => {
  return product.value?.type
})

const count = computed(() => {
    if (isProductInCart.value) {
       return productInCart.value(+product.value?.id).item.count;
    } else {
        return 0
    }
})

const currentProductInCart = computed(() => {
  if (productType.value === 'simple' || 'supplements') { //supplements - temp solution
    return productInCart.value(+product.value.id)
  }

  else if (productType.value === 'supplements' && product.value.acf.supplements) {
    let temp = product.value.acf.supplements.some(supplement => {
      return supplement.products && supplement.products.length > 0;
    })

    if (!temp) return productInCart.value(+product.value.id);
  }

  return {
    idx: null,
    item: null,
  }
})

const increment = () => {
    cartStore.incrementItem(currentProductInCart.value.idx)
}

const decrement = () => {
    cartStore.decrementItem(currentProductInCart.value.idx)
}

const addToCart = () => {
    cartStore.addToCart(product.value);
}
</script>

<style lang="scss" scoped>
.productItem-counter {
    display: flex;
    flex-direction: row;
    gap: 0px;
}
</style>