<template>
  <div class="page-lk-favorite">
    <h2 class="page-lk-favorite__title">
      Вам понравилось
    </h2>

    <div class="page-lk-favorite__list">
      <CommonProductCard
        v-for="item in favorites"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'

const catalogStore = useCatalogStore()

const favorites = computed(() => {
  return catalogStore.favoriteProducts
})
</script>

<style lang="scss" scoped>
.page-lk-favorite {
  display: grid;
  grid-gap: 32px;

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: var(--black);
    }
  }

  &__list {
    display: grid;
    grid-gap: 40px 17px;

    @include mq($bp-super-small) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
