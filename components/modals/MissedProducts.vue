<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="close()"
  >
    <div class="modal-missed-products">
      <div class="modal-missed-products__header">
        <div class="modal-missed-products__header-line">
          <p class="modal-missed-products__title">
            Хотите изменить адрес?
          </p>

          <a
            href="#"
            rel="nofollow"
            class="modal-missed-products__close"
            @click.prevent="closeModal()"
          >
            <UIIcon name="close" />
          </a>
        </div>
        <p class="modal-missed-products__text">
          Данных товаров нет в наличии на новом адресе.
        </p>
      </div>

      <div class="modal-missed-products__main">
        <Swiper
          slides-per-view="auto"
          :spaceBetween="8"
          class="modal-missed-products__slider"
        >
          <SwiperSlide
            v-for="(item, i) in missedProducts"
            :key="i"
            class="modal-missed-products__slide"
          >
            <div class="modal-missed-products-product">
              <div class="modal-missed-products-product__image">
                <img
                  v-lazy-load
                  :data-src="item.image"
                  alt=""
                >
                <span class="modal-missed-products-product__label">
                  Нет в наличии
                </span>
              </div>
              <p class="modal-missed-products-product__name">
                {{ item.name }}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="modal-missed-products__buttons">
        <UIButton
          color="gray"
          class="modal-missed-products__button"
          @click="cancel()"
        >
          Отменить
        </UIButton>

        <UIButton
          color="yellow"
          class="modal-missed-products__button"
          @click="accept()"
        >
          Продолжить
        </UIButton>
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useCommonStore } from '@/store/common'
import { useCartStore } from '@/store/cart'

const commonStore = useCommonStore()
const cartStore = useCartStore()

const { missedProductsList } = storeToRefs(cartStore)

const emits = defineEmits(['accept'])

const isShow = ref(true)
const isAccept = ref(false)

// <!-- Computed -->
const missedProductsModal = computed(() => commonStore.missedProductsModal)

const missedProducts = computed(() => {
  if (!missedProductsModal.value) {
    return []
  }

  return missedProductsList.value(missedProductsModal.value.location.warehouse_id)
})

// <!-- Methods -->
const close = () => {
  commonStore.setMissedProductsModal(null)

  if (isAccept.value) {
    emits('accept')
  }
}

const closeModal = () => {
  isShow.value = false
}

const cancel = () => {
  closeModal()
}

const accept = () => {
  cartStore.removeMissedProductsFromCart(missedProductsModal.value.location.warehouse_id)

  commonStore.setDeliveryType(missedProductsModal.value.type)
  commonStore.setLocation(missedProductsModal.value.location)

  isAccept.value = true

  closeModal()
}
</script>

<style lang="scss" scoped>
@import 'swiper/css';

.modal-missed-products {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  grid-gap: 50px;

  padding: 20px;

  background: var(--white);

  @include mq($bp-small) {
    min-height: auto;
    max-width: 796px;

    padding: 50px 60px;

    border-radius: 40px;
  }

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: var(--blackText);
      }
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__header-line {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__title {
    @include text_large;
    font-weight: bold;
  }

  &__text {
    @include text_big;
    color: var(--black);
  }

  &__slide {
    width: 140px;
  }

  &__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
  }

  &__button {
    font-weight: 500;
  }
}

.modal-missed-products-product {
  display: flex;
  flex-direction: column;
  grid-gap: 8px;

  width: 100%;

  padding-bottom: 10px;

  &__image {
    position: relative;

    width: 100%;
    height: 140px;

    border-radius: 20px;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      background: rgba(0, 0, 0, 0.4);

      z-index: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__label {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    @include text_small;
    font-weight: 600;
    color: var(--white);

    z-index: 2;
  }

  &__name {
    @include text_small;
    font-weight: 600;

    text-align: center;

    @include overflow-text;
  }
}
</style>
