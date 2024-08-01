<template>
    <div class="layout-default">
        <div>
            <LayoutHeader v-if="!routeName.toString().includes('delivery')" :extraClass="extraClassForHeader"></LayoutHeader>  

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
    if (['menu', 'gallery', 'order', 'order-id'].includes(routeName.value.toString())) {
        return 'dark'
    }
})
</script>