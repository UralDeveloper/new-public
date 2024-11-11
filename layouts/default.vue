<template>
    <div class="layout-default">
        <div>
            <LayoutHeader v-if="!routeName.toString().includes('delivery')" :extraClass="extraClassForHeader" /> 

            <slot />

            <LayoutFooter />
        </div>
        
        <LazyModalsList />
    </div>

</template>

<script setup lang="ts">
const route = useRoute();

const routeName = computed<string | symbol>(() => route?.name || "");

const extraClassForHeader = computed(() => {
    if (['menu', 'gallery', 'order', 'order-id', 'lk', 'lk', 'lk-favorite', 'lk-promocodes', 'lk-bonuses', 'lk-referals', 'lk-orders', 'lk-notifications', 'lk-game', 'lk-preferences'].includes(routeName.value.toString())) {
        return 'dark'
    }
})
</script>