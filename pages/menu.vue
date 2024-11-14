<template>
    <div class="page-menu">

        <!-- Карточки меню -->
        <div class="menuCards">
            <div class="container-fluid">
                <div class="menuCards-wrapper menuCards-big">
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

<script setup lang="ts">
const commonStore = useCommonStore();

// const catalogStore = useCatalogStore();
// const { categories } = storeToRefs(catalogStore);

// const menu = computed(() => categories?.value?.find(item => +item.id === 210)?.subCategories);

const menu = computed(() => commonStore.restaurant?.restoran_menu_page?.menu)

</script>

<style scoped lang="scss">
.page-menu {
    margin-top: 170px;
}
</style>