<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="close()"
  >
    <div class="modal-receipt">
      <a
        href="#"
        class="modal-receipt__close modal-receipt__close--pc"
        @click.prevent="closeModal()"
      >
        <UIIcon name="close" />
      </a>

      <transition
        mode="out-in"
        name="slide-right"
      >
        <ModalsReceiptAddNewAddress
          v-if="commonStore.newAddress !== false"
          :delivery-coords="deliveryCoords"
          :delivery-zone="deliveryZone"
          @setDeliveryCoords="deliveryCoords = $event"
          @close="closeModal()"
        />
        <div
          v-else
          class="modal-receipt__main"
        >
          <div class="modal-receipt-header">
            <p class="modal-receipt-header__title">
              Укажите адрес
            </p>

            <a
              href="#"
              class="modal-receipt__close modal-receipt__close--mobile"
              @click.prevent="closeModal()"
            >
              <UIIcon name="close" />
            </a>
          </div>

          <div :class="`modal-receipt__tabs modal-receipt__tabs--${deliveryTypes.length}`">
            <button
              v-for="(item, i) in deliveryTypes"
              :key="i"
              :class="['modal-receipt__tab modal-receipt-tab', { 'active' : currentType === item.type }]"
              @click.prevent="currentType = item.type"
            >
              <UIIcon :name="item.type" />
              {{ item.label }}
            </button>
          </div>

          <div class="modal-receipt__content">
            <transition
              name="fade"
              mode="out-in"
            >
              <ModalsReceiptDelivery
                v-if="currentType === 'delivery'"
                :delivery-coords="deliveryCoords"
                :delivery-zone="deliveryZone"
                @setDeliveryCoords="deliveryCoords = $event"
                @close="closeModal()"
              />
              <ModalsReceiptPickup
                v-else-if="currentType === 'pickup' || currentType === 'lounge'"
                :current-type="currentType"
                :current-address="currentAddress"
                @update="currentAddress = $event"
                @close="closeModal()"
              />
              <!-- <ModalsReceiptLounge
                v-else-if="currentType === 'lounge'"
              /> -->
            </transition>
          </div>
        </div>
      </transition>

      <ModalsReceiptMap
        :delivery-type="currentType"
        :current-address="currentAddress"
        :delivery-coords="deliveryCoords"
        @update="currentAddress = $event"
        @setDeliveryCoords="deliveryCoords = $event"
        @setDeliveryZone="deliveryZone = $event"
        class="modal-receipt__map"
      />

      <template v-if="commonStore.isMobileOrTablet">
        <ModalsReceiptDeliveryMobile
          v-if="currentType === 'delivery'"
          :delivery-coords="deliveryCoords"
          :delivery-zone="deliveryZone"
          @setDeliveryCoords="deliveryCoords = $event"
          @close="closeModal()"
        />
        <ModalsReceiptPickupMobile
          v-else-if="currentType === 'pickup' ||  currentType === 'lounge'"
          :current-type="currentType"
          :current-address="currentAddress"
          @update="currentAddress = $event"
          @close="closeModal()"
        />
      </template>
    </div>

    <LazyModalsMissedProducts
      v-if="isShowMissedProductsModal"
      @accept="closeModal()"
    />
  </ModalsOverlay>
</template>

<script setup>
import { useCommonStore } from '@/store/common'
import { useCalcDeliveryPrice } from '@/composables/useCalcDeliveryPrice';

const commonStore = useCommonStore()

const isShow = ref(true)
const currentType = ref(null)

const currentAddress = ref(null)

const deliveryCoords = ref(null)
const deliveryZone = ref(null)

watch(() => currentType.value, () => {
  deliveryCoords.value = null
})

// <!-- Computed -->
const deliveryType = computed(() => commonStore.deliveryType)
const deliveryTypes = computed(() => commonStore.deliveryTypes)
const selectedLocation = computed(() => commonStore.selectedLocation)
const isShowMissedProductsModal = computed(() => !!commonStore.missedProductsModal)

// <!-- Methods -->
const close = () => {
  commonStore.toggleNewAddress(false)
  commonStore.toggleShowReceiptModal(false)
}

const closeModal = () => {
  isShow.value = false
  useCalcDeliveryPrice();
}

const setDefault = () => {
  if (commonStore.newAddress !== false) {
    currentType.value = 'delivery'
  } else if (deliveryType.value) {
    currentType.value = deliveryType.value
  } else {
    currentType.value = deliveryTypes.value[0]?.type
  }

  if (selectedLocation.value && deliveryType.value === 'pickup') {
    currentAddress.value = selectedLocation.value
  }
}

setDefault()
</script>

<style lang="scss" scoped>
.modal-receipt {
  width: 100vw;
  height: 100vh;
  height: var(--app-height);

  display: flex;
  flex-direction: column;

  background: var(--white);
  overflow: hidden;

  @include mq($bp-small) {
    max-width: 1150px;
    height: 678px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);

    border-radius: 40px;
  }

  &__close {
    &--pc {
      display: none;

      @include mq($bp-small) {
        position: absolute;
        top: 50px;
        right: 60px;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 44px;
        height: 44px;

        background: var(--white);
        border-radius: 50%;

        z-index: 10;
      }
    }

    :deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: var(--blackText);
      }
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    padding: 20px;

    overflow: hidden;

    @include mq($bp-small) {
      grid-gap: 0;

      padding: 30px 60px;
    }

    @include maq($bp-medium) {
      padding: 30px;
    }

    @include maq($bp-small) {
      padding: 20px;
    }
  }

  &__map {
    flex: 1 1 auto;
  }

  &__tabs {
    flex: 0 0 auto;

    display: grid;
    align-items: center;

    padding: 5px;

    background: var(--grayBg2);
    border-radius: 20px;

    @include mq($bp-small) {
      margin-bottom: 30px;
    }

    &--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    &--3 {
      grid-template-columns: repeat(3, 1fr);

      max-width: 455px;
      overflow-x: auto;
      overflow-y: hidden;
    }
  }

  &__content {
    display: none;

    @include mq($bp-small) {
      display: block;

      flex: 1 1 auto;

      overflow: hidden;
    }
  }
}

.modal-receipt-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 5px;

  padding: 12px 5px;

  @include text_mini;
  text-wrap: nowrap;
  font-weight: 600;
  color: var(--grayText);

  border-radius: 14px;
  background-color: transparent;
  border: 0;

  transition: background-color 0.3s, color 0.3s;

  :deep(.ui-icon) svg {
    width: 15px;
    height: 15px;
  }

  @include mq($bp-super-small) {
    grid-gap: 10px;

    @include text_normal;
    font-weight: 600;

    :deep(.ui-icon) svg {
      width: 24px;
      height: 24px;
    }
  }

  @include mq($bp-small) {
    padding: 12px 15px;
  }

  &.active {
    color: var(--white);
    background-color: var(--yellowDark);

    :deep(.ui-icon) svg path {
      fill: var(--white);
    }
  }
}

.modal-receipt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include mq($bp-small) {
    display: none;
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }
}
</style>
