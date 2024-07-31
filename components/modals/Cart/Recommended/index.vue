<template>
    <div class="modal-product-recommended">
        <div class="modal-product-recommended__header">
            <p class="modal-product-recommended__title">
                Добавить к заказу?
            </p>

            <div class="modal-product-recommended__arrows">
                <div ref="prev" class="modal-product-recommended__arrow modal-product-recommended__arrow--prev">
                  <UIIcon name="arrow" />
                </div>

                <div ref="next" class="modal-product-recommended__arrow modal-product-recommended__arrow--next">
                  <UIIcon name="arrow" />
                </div>
            </div>  
        </div>

        <Swiper 
        :modules="[Navigation]" 
        :slides-per-view="'auto'" 
        :space-between="15" 
        :navigation="{
            prevEl: prev,
            nextEl: next,
        }" 
        class="modal-product-recommended__slider"
        >
          <SwiperSlide v-for="(item, i) in props.related" :key="i"
          class="modal-product-recommended__slide"
          >
          
              <ModalsCartRecommendedProduct
                :item="item" :adress="props.adress"
              />
          </SwiperSlide>
            
        </Swiper>
    </div>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common';

// const cart = useCartStore()
// const commonStore = useCommonStore()

const props = defineProps({
    related: {
        default: () => ([]),
        type: Array,
    },
    adress: {
        type: Object,
        default: () => ({}),
    }
})

const prev = ref(null);
const next = ref(null);
</script>

<style lang="scss" scoped>
.modal-product-recommended {
  margin-top: 20px;
  padding-bottom: 10px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--blackText);
    margin-bottom: 10px;
  }

  &__slider {
    margin: 0 -20px;
    padding: 0 20px;

    overflow: hidden;

    @include mq($bp-small) {
      margin: 0 -40px;
      padding: 0 30px;
    }
  }

  &__slide {
    width: auto;
  }

  &__arrows {
    display: flex;
    align-items: center;
    justify-content: space-between;

    grid-gap: 20px;

    z-index: 999;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 60px;

    width: 44px;
    height: 44px;

    background: var(--white);
    border-radius: 14px;

    &:hover {
      border: 2px solid var(--yellow);
    }

    cursor: pointer;

    @include mq($bp-small) {
      width: 40px;
      height: 40px;
    }

    @include maq($bp-small) {
      display: none;
    }

    &.swiper-button-disabled {
      display: none;
    }

    &--prev {
      left: 0;
      .ui-icon {
        transform: rotate(180deg);
      }
    }
    &--next {
      right: 0;
    }

    &.swiper-button-lock {
      display: none;
    }
  }
}
</style>