<template>
    <div class="menuCardItem">
        <img 
        :data-src="props.item?.image?.url" 
        alt="" 
        v-lazy-load 
        :key="props.item?.id"
        >
        <a :href="`${props.item?.file?.link}`" target="_blank">
            <span> {{ props.item?.name }} </span>
        </a>
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

onMounted(() => {
    // console.log(props.item);
})

</script>