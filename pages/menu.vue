<template>
    <div class="page-menu">

        <!-- Карточки меню -->
        <div class="menuCards">
            <div class="container-fluid">
                <div class="menuCards-wrapper">
                    <PagesMenuCardItem 
                    v-for="item in menu"
                    :key="item"
                    :item="item"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
const catalogStore = useCatalogStore();

const { categories } = storeToRefs(catalogStore);

const menu = categories?.value?.find(item => +item.id === 210)?.subCategories;

</script>

<style scoped lang="scss">
.page-menu {
    margin-top: 170px;
}
</style>