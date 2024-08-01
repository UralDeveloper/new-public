<template>
  <div class="modal-receipt-delivery-info">
    <div class="modal-receipt-delivery-info__icon">
      <UIIcon name="delivery" />
    </div>
    <div class="modal-receipt-delivery-info__content">
      <template v-if="isError">
        <div class="modal-receipt-delivery-info__line">
          <p class="modal-receipt-delivery-info__value">
            Невозможно определить стоимость доставки
          </p>
        </div>
        <div class="modal-receipt-delivery-info__line">
          <p class="modal-receipt-delivery-info__value modal-receipt-delivery-info__value--red">
            Выберите корректный адрес
          </p>
        </div>
      </template>
      <div
        v-else-if="!isError && !condition"
        class="modal-receipt-delivery-info__line"
      >
        <p class="modal-receipt-delivery-info__value">
          Укажите адрес доставки
        </p>
      </div>

      <template v-else>
        <div class="modal-receipt-delivery-info__line" v-if="showTime">
          <p class="modal-receipt-delivery-info__value">
            Доставка
          </p>
          <p class="modal-receipt-delivery-info__value">
            {{ condition.time_deliv }} мин
          </p>
        </div>

        <div class="modal-receipt-delivery-info__line">
          <p
            v-for="(item, i) in condition.sum"
            :key="i"
            :class="[
              'modal-receipt-delivery-info__value',
              {
                'modal-receipt-delivery-info__value--green' : +item.deliv_price === 0
              }
            ]"
          >
            <template
              v-if="+item.deliv_price === 0"
            >
              Бесплатно от {{ item.min_sum_order }} ₽
            </template>
            <template v-else>
              {{ item.deliv_price }} ₽
            </template>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const commonStore = useCommonStore();

const showTime = computed(() => commonStore.appSettings?.checkout_show_delivery_time ?? true)

defineProps({
  isError: {
    type: Boolean,
    default: false,
  },

  condition: {
    type: Object,
    default: null,
  },
})
</script>

<style lang="scss" scoped>

.modal-receipt-delivery-info {
  display: flex;
  align-items: center;
  grid-gap: 16px;

  padding: 12px 16px;

  border-radius: 20px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    background: var(--grayBg2);
    border-radius: 50%;
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