<template>
    <div class="modal modal-product fade" id="events" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-product-preview">
                        <img :data-src="imageUrl" v-lazy-load :key="props.item?.id" alt="">
                    </div>
                    <div class="modal-product-info">
                        <div class="modal-product-info-title">
                            <h3>{{ props.item?.title.rendered }}</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-product-info-description">
                            <div class="eventStart">
                                <span> {{ formattedDate }} </span>
                                <span> {{ formattedTime }} </span>
                            </div>

                            <p>

                            </p>
                        </div>
                        <div class="modal-product-info-footer">
                            <div class="modal-product-info-footer-price">
                                <span class="priceRub">2400</span>
                            </div>
                            <button type="button" class="btn btn-primary btn-primary-nobg"
                                data-bs-dismiss="modal">Купить билет</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const imageUrl = computed(() => props.item?.jetpack_featured_media_url || '')

const formattedDate = computed(() => {
  const datetime = props.item?.date;
  if (!datetime) return '';
  
  const [datePart] = datetime.split('T');
  const [year, month, day] = datePart.split('-');
  return `${day}:${month}:${year}`;
});

const formattedTime = computed(() => {
  const datetime = props.item?.date;
  if (!datetime) return '';
  
  const [_, timePart] = datetime.split('T');
  const [hours, minutes] = timePart.split(':');
  return `${minutes}:${hours}`;
});
</script>