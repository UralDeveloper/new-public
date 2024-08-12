<template>
  <div class="page-lk-promocodes">
    <h2 class="page-lk-promocodes__title">
      Мои промокоды
    </h2>

    <div
      v-if="!isLoading"
      class="page-lk-promocodes-list"
    >
      <PagesLkPromocodesItem
        v-for="(item, i) in promocodes"
        :key="i"
        :number="i + 1"
        :item="item"
        class="page-lk-promocodes-list__item"
        @show-qr-code="isShowQrCodeModal = true"
      />
    </div>
    <div
      v-else
      class="page-lk-promocodes__loader"
    >
      <UILoader is-big />
    </div>

    <LazyModalsQrCode
      v-if="isShowQrCodeModal"
      @close="isShowQrCodeModal = false"
    />
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const config = useRuntimeConfig();

const isLoading = ref(false)
const promocodes = ref([])
const isShowQrCodeModal = ref(false)

// <!-- Computed -->
const user = computed(() => userStore.user)

// <!-- Methods -->
const getPromocodes = async () => {
  isLoading.value = true

  const data = await userStore.getPromocodes(config);

  isLoading.value = false

  promocodes.value = data?.value || []
}

getPromocodes()
</script>

<style lang="scss" scoped>
.page-lk-promocodes {
  display: grid;
  grid-gap: 20px;

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;

      @include text_large;
      font-weight: 700;
      color: var(--black);
    }
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 100px 0;
  }
}

.page-lk-promocodes-list {
  display: flex;
  flex-direction: column;

  &__item {
    border-bottom: 1px solid var(--grayBg);
  }
}
</style>
