<template>

    <div class="firstScreen" style="background-image: url(assets/img/remove/bg_gifts.jpeg);">
        <div class="container firstScreen-container">
            <div class="firstScreen-titleBlock">
                <h1>Идеально для подарка</h1>
                <p>Подарочные сертификаты в ресторан Public </p>
            </div>
        </div>
    </div>
    <div class="shortTextBlock">
        <div class="container shortTextBlock-container">
            <div class="shortTextBlock-text">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
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

const gifts = computed(() => catalogStore.filteredCatalog.find(item => +item.id === 209))
</script>