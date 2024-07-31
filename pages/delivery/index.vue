<template>
    <PagesIndexMenuCategories />

    <CommonActionsSwiper />

    <div class="catalog catalog-delivery">
        <CategoryBlock v-for="category in menu" :category="category" :key="category.id" />
    </div>

</template>

<script setup lang="ts">
const catalogStore = useCatalogStore();

const { categories } = storeToRefs(catalogStore);

const menu = computed(() => categories?.value?.find(item => +item.id === 210)?.subCategories);

</script>