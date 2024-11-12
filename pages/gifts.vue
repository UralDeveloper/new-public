<template>

<div class="firstScreen">
        <img :data-src="restaurant?.gifts_page?.image" alt="" class="bg-image" v-lazy-load :key="restaurant?.gifts_page?.image">
        <div class="container firstScreen-container">
            <div class="firstScreen-titleBlock">
                <h1>{{ restaurant?.gifts_page?.title }}</h1>
                <p>{{ restaurant?.gifts_page?.subtitle }}</p>
            </div>
        </div>
    </div>
    <div class="shortTextBlock">
        <div class="container shortTextBlock-container">
            <div class="shortTextBlock-text">
                <p>{{ restaurant?.gifts_page?.description }}</p>
            </div>
        </div>
    </div>
    <!-- Каталог товаров -->
    <div class="catalog" style="margin: 60px 0 140px;">
        <div class="container">
            <div class="titleBlock">
                <h2>Сертификаты</h2>
            </div>
            
            <CategoryBlock :category="gifts" :isShowTitle="false" />

            {{ console.log(gifts) }}
        </div>
    </div>
</template>

<script setup>
const catalogStore = useCatalogStore();
const commonStore = useCommonStore();

const { restaurant } = storeToRefs(commonStore);

const gifts = computed(() => catalogStore.filteredCatalog.find(item => +item.id === 209))
</script>

<style lang="scss" scoped>
.firstScreen {
    position: relative;
}
.bg-image {
    max-height: 95vh;
    width: 100%;
    position: absolute;
    z-index: -1;
    object-fit: cover;
}
.shortTextBlock-container {
    padding-top: 100px;
    padding-bottom: 100px;
}
</style>