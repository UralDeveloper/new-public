<template>

    <div class="page-gallery" style="margin: 180px 0 0;">
        <div class="container gallery-container">
            <div class="gallery-wrapper" v-for="(block, idx) in shownBlocks" :key="idx">
                <div v-if="idx <= shownBlocksLength" class="galleryItem swiper-slide" v-for="(image, index) in block" :key="index">
                    <picture>
                        <source :srcset="image" type="image/webp" :key="index"><img
                            data-fancybox="gallery" :data-src="imageSize(image, 'large')" alt="" v-lazy-load :key="index">
                    </picture>
                </div>
            </div>
            <button class="show-more btn btn-primary" @click="showMore()" v-if="shownBlocksLength + 1 < shownBlocks?.length">
                Показать еще
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="#262523">
                    <mask id="mask0_472_4805" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25"
                        height="24">
                        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_472_4805)">
                        <path
                            d="M11.75 12.75H6.75C6.5375 12.75 6.35938 12.6781 6.21563 12.5343C6.07188 12.3904 6 12.2122 6 11.9997C6 11.7871 6.07188 11.609 6.21563 11.4654C6.35938 11.3218 6.5375 11.25 6.75 11.25H11.75V6.25C11.75 6.0375 11.8219 5.85938 11.9657 5.71563C12.1095 5.57188 12.2877 5.5 12.5003 5.5C12.7129 5.5 12.891 5.57188 13.0346 5.71563C13.1782 5.85938 13.2499 6.0375 13.2499 6.25V11.25H18.25C18.4625 11.25 18.6406 11.3219 18.7843 11.4657C18.9281 11.6095 19 11.7877 19 12.0003C19 12.2129 18.9281 12.391 18.7843 12.5346C18.6406 12.6782 18.4625 12.75 18.25 12.75H13.2499V17.75C13.2499 17.9625 13.178 18.1406 13.0342 18.2843C12.8904 18.4281 12.7122 18.5 12.4997 18.5C12.2871 18.5 12.109 18.4281 11.9654 18.2843C11.8218 18.1406 11.75 17.9625 11.75 17.75V12.75Z" />
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
const gallery = ref([]);
const shownBlocks = ref([])
const shownBlocksLength = ref(0);

const getGallery = async () => {
    const data = await $fetch('/api/wp-json/systeminfo/v1/gallery/31483');

    if (data) {
        gallery.value = data.images;

        shownBlocks.value = splitArrayIntoChunks(gallery.value);
    }
}

const showMore = () => {
    shownBlocksLength.value++;
}

function splitArrayIntoChunks(array, chunkSize = 9) {
  return array.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!result[chunkIndex]) result[chunkIndex] = []; // создаем новый подмассив
    result[chunkIndex].push(item);
    return result;
  }, []);
}

onMounted(() => {
    getGallery();
})
</script>

<style lang="scss" scoped>
.gallery-container {
    gap: 10px;
}
.show-more {
    margin-top: 50px;
}
</style>