<template>
    <div class="container">
        <div class="titleBlock" v-if="isShowTitle">
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
    },
    isShowTitle: {
        type: Boolean,
        default: true,
    }
})
</script>

<style lang="scss" scoped>
// .catalog-wrapper {
//     @include maq($bp-small) {
//         grid-template-columns: repeat(2, 1fr);
//     }
// }
</style>