<template>

    <div class="firstScreen" style="background-image: url(assets/img/remove/bg_events.jpeg);">
        <div class="container firstScreen-container">
            <div class="firstScreen-titleBlock firstScreen-titleBlock-centered">
                <h1>Мероприятия</h1>
                <p>Невероятно нежные десерты от шеф-повора Public</p>
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

const { events } = storeToRefs(commonStore)

const selectedEvent = ref(null);
</script>