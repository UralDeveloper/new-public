<template>
    <PagesIndexMenuCategories />

    <CommonActionsSwiper />

    <div class="catalog catalog-delivery">
        <CategoryBlock :category="currentCategory" />
    </div>

</template>

<script setup lang="ts">
const catalogStore = useCatalogStore();
const route = useRoute();

const id = computed(() => route.params.id);

const { categories } = storeToRefs(catalogStore);

const menu = computed(() => categories?.value?.find(item => +item.id === 210)?.subCategories);

const currentCategory = computed(() => menu.value.find(cat => +cat.id === +id.value));
</script>