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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. </p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. </p>
                        </div>
                        <div class="modal-product-info-footer">
                            <div class="modal-product-info-footer-message">Заказ возможен не менее, чем за сутки</div>
                            <div class="modal-product-info-footer-price">
                                <span class="priceRub">{{ product.price }} ₽</span>
                            </div>
                            <button type="button" class="btn btn-primary btn-primary-nobg" data-bs-toggle="modal"
                                data-bs-target="#orderOfTheCake" data-bs-dismiss="modal">Заказать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const catalogStore = useCatalogStore();

const { selectedProduct, selectedProductId } = storeToRefs(catalogStore)

const product = computed(() => selectedProduct.value())

const productImage = computed(() => product.value.images[0])

console.log(product.value);
</script>