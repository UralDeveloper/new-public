<template>

    <div class="firstScreen">
        <img :data-src="restaurant?.events_page?.image" alt="" class="bg-image" v-lazy-load :key="restaurant?.events_page?.image">
        <div class="container firstScreen-container">
            <div class="firstScreen-titleBlock firstScreen-titleBlock-centered">
                <h1>{{ restaurant?.events_page?.title }}</h1>
                <p>{{ restaurant?.events_page?.subtitle }}</p>
            </div>
        </div>
    </div>

    <div class="events" style="margin: 120px 0 140px;">
        <div class="container">
            <div class="events-wrapper">
                <PagesEventsCard v-for="event in events" :key="event.id" :item="event" @selected="selectedEvent=event" />
            </div>
        </div>
    </div>

    <LazyModalsEvent :item="selectedEvent" />
</template>

<script setup>
const commonStore = useCommonStore();

const { events, restaurant } = storeToRefs(commonStore);

const selectedEvent = ref(null);
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
</style>