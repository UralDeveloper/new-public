<template>
  <div :class="['page-order-address-block', { 'page-order-address-block--double' : deliveryType === 'delivery' }]">
    <div class="page-order-address-block__col">
      <p class="page-order-address-block__label">
        {{ label }}
      </p>

      <div class="page-order-address-block__box"
           @click.prevent="$emit('setNewDeliveryType')"
      >
        <div
          :class="[
            'page-order-address-block__icon',
            { 'page-order-address-block__icon--pickup' : deliveryType === 'pickup' }
          ]"
        >
          <UIIcon :name="deliveryType === 'delivery' ? 'location-filled' : deliveryType === 'pickup' ? 'pickup' : ''" />
        </div>

        <div class="page-order-address-block__content">
          <div class="page-order-address-block__info">
            <p class="page-order-address-block__address">
              {{ selectedLocation?.address || '' }}
            </p>
            <p class="page-order-address-block__name">
              {{ selectedLocation?.name || '' }}
            </p>
            <p
              v-if="selectedLocation?.working_time"
              class="page-order-address-block__time"
            >
              <UIIcon name="clock-filled" />
              {{ selectedLocation.working_time }}
            </p>
          </div>

          <UIIcon name="arrow" />
        </div>
      </div>
    </div>

    <div
      v-if="deliveryType === 'delivery'"
      class="page-order-address-block__col"
    >
      <p class="page-order-address-block__label">
        Доставка
      </p>

      <div class="page-order-address-block-delivery">
        <div class="page-order-address-block-delivery__icon">
          <UIIcon name="delivery" />
        </div>

        <div class="page-order-address-block-delivery__content">
          <div
            v-if="condition && showTime"
            class="page-order-address-block-delivery__line"
          >
            <p class="page-order-address-block-delivery__value">
              Доставка
            </p>
            <p class="page-order-address-block-delivery__value">
              {{ condition.time_deliv }} мин
            </p>
          </div>

          <div
            v-if="condition"
            class="page-order-address-block-delivery__line"
          >
            <p
              v-for="(item, i) in condition.sum"
              :key="i"
              :class="[
                'page-order-address-block-delivery__value',
                {
                  'page-order-address-block-delivery__value--green' : +item.deliv_price === 0
                }
              ]"
            >
              <template
                v-if="+item.deliv_price === 0"
              >
                Бесплатно от {{ item.min_sum_order }} ₽
              </template>
              <template v-else>
                <b>
                  {{ item.deliv_price }} ₽
                </b>
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

const props = defineProps({
  deliveryType: {
    type: String,
    default: 'delivery'
  }
})
// const emits = defineEmits(['submit'])
// console.log(emits);

const showTime = computed(() => {
  return commonStore.appSettings?.checkout_show_delivery_time ?? true;
})

const selectedLocation = computed(() => commonStore.selectedLocation)

const label = computed(() => {
  switch (props.deliveryType) {
    case 'delivery':
      return 'Адрес доставки'
    case 'pickup':
      return 'Адрес самовывоза'
    case 'lounge':
      return 'Адрес зала'
    default:
      return 'Адрес доставки'
  }
})

const condition = computed(() => {
  return commonStore.selectedLocation.zone
})
</script>

<style lang="scss" scoped>
.page-order-address-block {
  display: grid;
  grid-gap: 20px;

  &--double {
    @include mq($bp-medium) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__col {
    display: grid;
    grid-gap: 16px;
  }

  &__label {
    @include text_normal;
    font-weight: 500;
    color: var(--grayText);
  }

  &__box {
    display: flex;
    align-items: center;
    grid-gap: 16px;
    cursor: pointer;
    padding: 12px;

    background: var(--white);
    border-radius: 20px;
    border: 1px solid var(--grayText2);
  }

  &__icon {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    &--pickup {
      :deep(.ui-icon) svg path {
        fill: var(--green);
      }
    }
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 12px;
  }

  &__info {
    display: grid;
    grid-gap: 4px;
  }

  &__address {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__name {
    @include overflow-text;
    @include text_small;
    font-weight: 500;
    color: var(--grayText);
  }

  &__time {
    display: flex;
    align-items: center;
    grid-gap: 5px;

    @include text_mini;
    color: var(--grayText);
  }
}

.page-order-address-block-delivery {
  display: flex;
  align-items: center;
  grid-gap: 18px;

  padding: 6px 12px;

  background: var(--grayBg2);
  border-radius: 20px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 52px;
    height: 52px;

    background: var(--white);
    border-radius: 16px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 5px;
  }

  &__line {
    display: flex;
    align-items: center;
  }

  &__value {
    display: flex;
    align-items: center;

    @include text_small;
    font-weight: 500;

    b {
      font-weight: 600;
    }

    &:last-child {
      &:after {
        display: none;
      }
    }

    &:after {
      content: '';

      width: 3px;
      height: 3px;

      margin: 0 5px;

      background: var(--grayText);
      border-radius: 50%;

      opacity: 0.3;
    }

    &--green {
      color: var(--green);
    }

    &--red {
      @include text_mini;
      color: var(--red);
    }
  }
}
</style>