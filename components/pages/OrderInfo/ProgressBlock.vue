<template>
  <template v-if="props.order.status === 'pending'">
    <div class="page-order-info-progress" :class="{'modal': props.isModal}">
      <div class="page-order-info-progress__cols pending-block">
        <div class="page-order-info-progress__col pending solo-pending">

          <div class="page-order-info-progress__bar">
            <div class="page-order-info-progress__bar-line" />
          </div>

          <div class="page-order-info-progress__status" v-if="!props.isModal">
            <UIIcon name="clock" />
            <span>Ожидает оплаты</span>
          </div>
        </div>

        <div class="pay-button-block" v-if="!props.isModal">
          <UIButton
              :to="Number.isFinite(userStore.selectedCard) ? `${props.order?.payment_url}&token=${userStore.selectedCard}` : props.order?.payment_url"
              color="yellow"
              class="page-lk__back"
              style="max-width: 400px;"
          >
            <UIIcon name="ruble" class="ruble-icon" />
              <span> Оплатить </span> 
              <CommonTimer v-if="timeCreated" :orderTime="timeCreated" :countdownSeconds="+commonStore.pending_order_cansel_time" />
          </UIButton>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div v-if="props.deliveryType === 'pickup'" class="page-order-info-progress" :class="{'modal': props.isModal}">
      <div class="page-order-info-progress__header" v-if="!props.isModal && props.order.status !== 'cancelled'">
        <p class="page-order-info-progress__date">
          Будет готов к выдаче {{ deliveryFinishTime }}
        </p>
      </div>

    <div class="page-order-info-progress__cols">
      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 1 }, {'current': statusId === 1}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status" v-if="!props.isModal">
          <UIIcon name="pencil" />
          <span v-if="statusId === 1 || !isMobileOrTablet">Заказ принят</span>
        </div>
      </div>

      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 2 }, {'current': statusId === 2}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status" v-if="!props.isModal">
          <UIIcon name="cooking" />
          <span v-if="statusId === 2 || !isMobileOrTablet">Готовится</span>
        </div>
      </div>

      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 3 }, {'current': statusId === 3}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status" v-if="!props.isModal">
          <UIIcon name="lounge" />
          <span v-if="statusId === 3 || !isMobileOrTablet">Готов к выдаче</span>
        </div>
      </div>

      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 4 }, {'current': statusId === 4}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status" v-if="props.order.status !== 'cancelled' && !props.isModal">
          <UIIcon name="pickup" />
          <span v-if="statusId === 4 || !isMobileOrTablet">Вручен</span>
        </div>
        <div class="page-order-info-progress__status" v-else-if="!props.isModal">
          <UIIcon name="close" />
          <span v-if="statusId === 4 || !isMobileOrTablet">Отменён</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="page-order-info-progress" :class="{'modal': props.isModal}">
    <div class="page-order-info-progress__header" v-if="!props.isModal && props.order.status !== 'cancelled'">
      <p class="page-order-info-progress__date">
        Будет доставлен к {{ deliveryFinishTime }}
      </p>
    </div>

    <div class="page-order-info-progress__cols">
      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 1 }, {'current': statusId === 1}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status" v-if="!props.isModal">
          <UIIcon name="pencil" />
           <span v-if="statusId === 1 || !isMobileOrTablet">Заказ принят</span>
        </div>
      </div>

      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 2 }, {'current': statusId === 2}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status" v-if="!props.isModal">
          <UIIcon name="cooking" />
           <span v-if="statusId === 2 || !isMobileOrTablet">Готовится</span>
        </div>
      </div>

      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 3 }, {'current': statusId === 3}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status" v-if="!props.isModal">
          <UIIcon name="lounge" />
           <span v-if="statusId === 3 || !isMobileOrTablet">Готов</span>
        </div>
      </div>

      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 4 }, {'current': statusId === 4}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status" v-if="props.deliveryType === 'flat_rate' && !props.isModal">
          <UIIcon name="delivery" />
          <span v-if="statusId === 4 || !isMobileOrTablet"> Курьер в пути</span>
        </div>
        <div class="page-order-info-progress__status" v-else-if="!props.isModal">
          <UIIcon name="delivery" />
           <span v-if="statusId === 4 || !isMobileOrTablet">Доставка</span>
        </div>
      </div>

      <div class="page-order-info-progress__col"
        :class="{ 'cancelled': props.order.status === 'cancelled' }, [props.order.status, { 'active': statusId >= 5 }, {'current': statusId === 5}]">
        <div class="page-order-info-progress__bar">
          <div class="page-order-info-progress__bar-line" />
        </div>
        <div class="page-order-info-progress__status"v-if="props.order.status !== 'cancelled' && !props.isModal">
          <UIIcon name="pickup" />
           <span v-if="statusId === 5 || !isMobileOrTablet">Вручен</span>
        </div>
        <div class="page-order-info-progress__status" v-else-if="!props.isModal">
          <UIIcon name="close" />
          <span>Отменён</span>
        </div>
      </div>
    </div>
  </div>
  </template>
  
</template>

<script setup>
const commonStore = useCommonStore();
const userStore = useUserStore();

const isMobileOrTablet = computed(() => commonStore.isMobileOrTablet)
const showTime = computed(() => commonStore.appSettings?.checkout_show_delivery_time ?? true)

const timeCreated = ref('')

const props = defineProps({
  order: {
    type: Object,
    default: {},
  },
  deliveryType: {
    type: String,
    default: ''
  },
  isModal: {
    type: Boolean,
    default: false,
  }
})

console.log(props.order);

const statusId = computed(() => {
  switch (props.order.status) {
    case 'processing':
      return 1;

    case 'making':
      return 2;

    case 'done':
      return 3;

    case 'wait-stock':
      return 3;
      
    case 'kurier':
      return 4;

    case 'wc-completed':
      return 4;

    case 'completed':
      return 5;

    default:
      return 0;
  }
})

onMounted(() => {
  const datetimeString = props.order?.date_created;

  const dateTime = new Date(datetimeString);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const hoursAndMinutes = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  timeCreated.value = hoursAndMinutes;
  console.log(timeCreated.value);
})

const deliveryFinishTime = computed(() => {
  if (showTime.value) {
    return (props.order.meta_data.find(data => data.key === 'must_be_delivered')?.value)?.split(' ')[1] || '';
  }
  else {
    return (props.order.meta_data.find(data => data.key === 'must_be_delivered')?.value)
  }
})

</script>

<style lang="scss" scoped>
.ruble-icon {
  :deep svg g path {
    fill: black;
  }
}
.pay-button-block {
  flex: 1;
  display: flex; 
  justify-content: end; 
  margin-top: -20px; 
  margin-left: 15px;

  
  @include maq($bp-super-small) {
    margin: auto;
    margin-top: 20px;

    & > a {
      padding-left: 40px;
      padding-right: 40px;
    }
  }
}
.page-order-info-progress {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  &.modal {
    margin-top: 10px;
    grid-gap: 12px;

    max-width: 288px;

    @include maq($bp-small) {
      margin-top: 5px;
      max-width: none;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__date {
    @include text_normal;
    font-weight: 600;
    color: var(--grayText);
  }

  &__cancel {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    padding: 0;

    @include text_normal;
    font-weight: 500;
    color: var(--grayText);

    background: none;
    border: 0;

    :deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: var(--grayText);
      }
    }
  }

  &__cols {
    display: flex;
    align-items: flex-start;
    grid-gap: 8px;

    @include maq($bp-super-small) {
      max-width: 400px;
      overflow-x: auto;
      overflow-y: hidden;
    }
    @include maq(450px) {
      max-width: 380px;
    }
    @include maq(430px) {
      max-width: 360px;
    }
    @include maq(410px) {
      max-width: 340px;
    }
    @include maq(380px) {
      max-width: 320px;
    }
    @include maq(350px) {
      max-width: 300px;
    }

    &.pending-block {
      @include maq($bp-super-small) {
        flex-direction: column;
        width: 100%;
      }
    }

  }

  &__col {
    flex: 1;

    display: flex;
    flex-direction: column;
    grid-gap: 8px;

    &.done {
      .page-order-info-progress {
        &__bar-line {
          width: 100%;
        }
      }
    }

    &.d-none {
      display: none;
    }

    &.flex-4 {
      flex: 4;
    }

    &.solo-pending {
      @include maq($bp-super-small) {
        width: 100%;
      }
    }

    &.pending {
      .page-order-info-progress__bar {
        color: #EC2525;
        background: #FFC2C2;
      }
    }

    &.cancelled {
      .page-order-info-progress__bar {
        background: #EC2525;
      }
    }

    &.current {
      flex: 1.5;
    }

    &.active {
      .page-order-info-progress__bar {
        background: #49BA40 !important;
      }

      &.processing {
        .page-order-info-progress__bar {
          background: #50ADCA !important;
        }
      }
      &.pending {
        .page-order-info-progress__bar {
          background: #EC2525 !important;
        }
      }
      &.making {
        .page-order-info-progress__bar {
          background: #F2A32C !important;
        }
      }
      &.done {
        .page-order-info-progress__bar {
          background: #FF8C21 !important;
        }
      }
      &.kurier {
        .page-order-info-progress__bar {
          background: #AD00FF !important;
        }
      }
      &.wc-completed, &.completed {
        .page-order-info-progress__bar {
          background: #089B43 !important;
        }
      }
      &.cancelled {
        .page-order-info-progress__bar {
          background: #EC2525 !important;
        }
      }
      &.wait-stock {
        .page-order-info-progress__bar {
          background: #969696 !important;
        }
      }

      .page-order-info-progress {
        &__status {
          color: var(--blackText);

          :deep(.ui-icon) svg path {
            fill: #1C1B1F;
          }
        }
      }
    }
  }

  &__bar {
    position: relative;
    width: 100%;
    height: 4px;

    background: var(--greenLight);
    border-radius: 8px;
    overflow: hidden;
  }

  &__bar-line {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    background: var(--green);
  }

  &__status {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    @include text_small;
    font-weight: 600;
    color: var(--grayText);

    :deep(.ui-icon) svg {
      width: 20px;
      height: 20px;

      path {
        fill: var(--grayText);
      }
    }
  }
}
</style>