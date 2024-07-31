<template>
    <div class="container">
        <div class="titleBlock">
            <h3> {{ props.category?.name }} </h3>
        </div>
        <div class="catalog-wrapper">
            <CommonProductCard v-for="product in props.category?.products" :key="product.id" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    category: {
        type: Object,
        default: () => {},
    }
})
</script>