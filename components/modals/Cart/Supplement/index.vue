<template>
    <div v-if="props.supplements?.length > 0" class="modal-product-supplements">
        <h3 class="modal-product-supplements__title">Дополнительно</h3>

        <div class="modal-product-supplements__box">
            <ModalsCartSupplementProduct v-for="(item, i) in props.supplements" :key="i" :item="item"
                :adress="props.adress" />
        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    supplements: {
        default: () => ([]),
        type: Array,
    },
    adress: {
        type: Object,
        default: () => ({}),
    }
})

</script>

<style lang="scss" scoped>
.modal-product-supplements {

    &__title {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 16px;
    }

    &__box {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
</style>