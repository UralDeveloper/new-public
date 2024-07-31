<template>
  <div class="page-order-info-about" :class="props.styleClass">
    <p class="page-order-info-about__title">
      Информация о заказе
    </p>

    <div class="page-order-info-about__rows">
      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Статус
        </p>

        <div class="page-order-info-about__value">
          <div class="page-order-info-about-status"
          :class="props.order.status">
            <UIIcon name="clock" class="clock-icon" v-if="props.order.status === 'pending'" />
           <span> {{ currentStatus }} </span>
          </div>
        </div>

        <button class="page-order-info-about__cancel" v-if="props.order.status === 'pending' || props.order.status === 'processing'"
          @click="click">
          <UIIcon name="close" />
          <span>Отменить</span>
        </button>
      </div>

      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Дата / время
        </p>

        <div class="page-order-info-about__value">
            {{ order?.billing_gatetimecheckout}}
        </div>
      </div>

      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Способ получения
        </p>

        <div class="page-order-info-about__value">
          {{order.delivery_name}}
        </div>
      </div>

      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Адрес
        </p>

        <div class="page-order-info-about__value">
          {{ info.address_1 || '--' }}
        </div>
      </div>

      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Комментарий
        </p>
         {{order.customer_note}}
        <div class="page-order-info-about__value page-order-info-about__value--comment">

          <!-- Комментарий, который оставил пользователь при заказе. Комментарий, который оставил пользователь при заказе -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    default: '',
  },
  styleClass: {
    type: String,
    default: '',
  },

  info: {
    type: Object,
    default: () => ({}),
  },
  order: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['cancel']);

const currentStatus = computed(() => {
  // if (props.status === 'pending') {
  //   return 'В ожидании'
  // }
  return props.status
})

function click() {
  emits('cancel');
}
</script>

<style lang="scss" scoped>
::v-deep(.clock-icon) svg path {
  fill: $red !important;
}
.page-order-info-about {
  display: flex;
  flex-direction: column;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: var(--black);
  }

  &__rows {
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__label {
    flex: 0 0 175px;

    @include text_small;
    font-weight: 500;
    color: var(--grayText);

    @include maq($bp-super-small) {
      flex: 0 0 155px;
    }
  }

  &__value {
    @include overflow-text;
    @include text_small;
    font-weight: 600;

    &--comment {
      @include text_mini;
      font-weight: 400;
      white-space: normal;
    }
  }

  &__cancel {
    display: flex;
    align-items: center;
    grid-gap: 4px;

    margin-left: 30px;

    padding: 0;

    @include text_normal;
    font-size: 14px;
    font-weight: 500;
    color: var(--grayText);

    background: none;
    border: 0;

    @include maq($bp-super-small) {
      margin-left: 5px;
      font-size: 12px;
    }

    ::v-deep(.ui-icon) svg {
      width: 20px;
      height: 20px;

      @include maq($bp-super-small) {
        width: 15px;
        height: 15px;
      }

      path {
        fill: var(--grayText);
      }
    }
  }
}

.page-order-info-about-status {
  display: flex;
  align-items: center;
  grid-gap: 6px;

  padding: 4px 12px;

  @include extra_small;
  font-weight: 600;
  color: #F2A32C;

  background: #FFF9DF;
  border-radius: 16px;

  ::v-deep(.ui-icon) svg {
    width: 12px;
    height: 12px;

    path {
      fill: #F2A32C;
    }
  }

  &.processing {
    color: #50ADCA;
    background: #B6EDFF;
  }
  &.pending {
    color: #EC2525;
    background: #FFC2C2;
  }
  &.making {
    color: #F2A32C;
    background: #FFF9DF;
  }
  &.done {
    color: #FF8C21;
    background: #FFF9DF;
  }
  &.kurier {
    color: #AD00FF;
    background: #EEBDFF;
  }
  &.wc-completed, &.completed {
    color: #089B43;
    background: #E4F3D9;
  }
  &.cancelled {
    color: #EC2525;
    background: #FFEFE5;
  }
  &.wait-stock {
    color: #969696;
    background: #D9D9D9;
  }
}
</style>