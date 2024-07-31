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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation
                </span>
            </div>
            <!-- <div class="productItem-footer">
                <div class="productItem-price">
                    <span class="priceRub">2000</span>/ кг
                </div>
                <div class="counter-wrapper productItem-counter">
                    <button type="button" class="counter-minus btn btn-default btn-number">-</button>
                    <input type="number" class="counter-value" name="number" value="1" id="numberOfGuests">
                    <button type="button" class="counter-plus btn btn-default btn-number">+</button>
                </div>
            </div> -->
            <div class="productItem-footer">
                <div class="productItem-price">
                    <span class="priceRub"> {{ props.product.price }} ₽</span> 
                </div>
                <NuxtLink data-bs-toggle="modal" data-bs-target="#pie" class="btn btn-primary">Заказать</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const catalogStore = useCatalogStore();

const props = defineProps({
    product: {
        type: Object,
        default: () => { },
    }
})

const productImage = computed(() => props.product.images[0])

const openProduct = () => {
    catalogStore.setProduct(props.product.id)
}
</script>