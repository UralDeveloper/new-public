<template>
    <div class="menuCardItem">
        <img 
        :data-src="props.item.img" 
        alt="" 
        v-lazy-load 
        :key="props.item.id"
        >
        <NuxtLink :to="`/delivery/${props.item.id}`">
            <span> {{ props.item.name }} </span>
        </NuxtLink>
        <!-- <div class="subtitle">
            <div class="subtitle-item">
                <span>Пн-Пт</span>
                <span>9:00-11:00</span>
            </div>
            <div class="subtitle-item">
                <span>Сб-Вс</span>
                <span>10:00-12:00</span>
            </div>
        </div> -->
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => {},
    }
})

</script>