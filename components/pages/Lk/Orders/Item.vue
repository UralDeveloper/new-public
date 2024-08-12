<template>
  <div class="pages-lk-orders-item" @click="click">
    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--number">
      <p class="pages-lk-orders-item__number">
        № {{ props.item.id }}
      </p>
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--status">
      <div class="pages-lk-orders-item-status"
        :class="props.item.status">
        {{ status }}
      </div>
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--date">
      <p class="pages-lk-orders-item__date">
        {{ formattedTime }}
      </p>
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--images">
      <div class="pages-lk-orders-item__images">
        <div v-for="item in props.item.line_items.slice(0, 3)" :key="item.id" class="pages-lk-orders-item__image">
          <img :src="item.image.src" alt="">
        </div>
      </div>
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--price">
      <CommonPriceBlock :price="+props.item.total" />
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--actions">
      <div class="pages-lk-orders-item__actions">
        <UIButton color="gray" class="pages-lk-orders-item__more" @click="click">
          Подробнее
        </UIButton>

        <!-- <button
          class="pages-lk-orders-item__button pages-lk-orders-item__button--cancel"
        >
          <UIIcon name="close" />
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common';
import { useUserStore } from '@/store/user';
import { useCatalogStore } from '@/store/catalog';

const userStore = useUserStore();

const commonStore = useCommonStore();

const allSettings = computed(() => commonStore.allSettings);

const delivery_key = ref('');

const delivery_type = ref('');

const status = ref('');

const formattedTime = ref('');

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['reloadOrders'])

onMounted(() => {
  try {
    delivery_key.value = props.item?.shipping_lines.length ? props.item?.shipping_lines[0]['method_id'] : '';

    delivery_type.value = delivery_key.value === 'flat_rate' ? 'delivery' : 'pickup';

    status.value = allSettings.value?.order_status_map[delivery_type.value][props.item.status] || allSettings.value?.order_statuses_all[props.item.status] || props.item.status;
  }
  catch (err) {
    console.error('*****Get order error', err)
  }

  let date = new Date(props.item.date_created);
  let year = String(date.getFullYear()).slice(-2);
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');

  // Формирование новой строки времени
  formattedTime.value = `${day}.${month}.${year}, ${hours}:${minutes}`;
})

const click = () => {
  userStore.currentOrder = props.item;
  commonStore.toggleShowOrderModal(true);
}
</script>

<style lang="scss" scoped>
.pages-lk-orders-item {
  display: grid;
  grid-template-columns: 118px 1fr 1fr;
  align-items: center;
  grid-gap: 20px;

  padding: 20px 0;

  @include mq($bp-medium) {
    display: flex;
    justify-content: space-between;
  }

  &:hover {
    cursor: pointer;
    background: #F5F4F2;
  }

  &__col {
    flex: 0 0 auto;

    display: flex;
    align-items: center;

    &--number {
      flex: 0 0 70px;
    }

    &--status {
      flex: 0 0 120px;

      @include mq($bp-medium) {
        justify-content: center;
      }
    }

    &--date {
      flex: 0 0 135px;
    }

    &--images {
      flex: 0 0 118px;
    }

    &--price {
      flex: 0 0 100px;

      padding-left: 10px;

      @include mq($bp-medium) {
        padding-left: 0;
      }
    }

    &--actions {
      flex: 0 0 192px;
    }
  }

  &__number {
    width: 94px;

    padding: 8px 0;

    @include text_mini;
    font-weight: 600;
    font-size: 15px;
    color: var(--black);
    text-align: center;

    background: var(--grayBg2);
    border-radius: 12px;

    @include mq($bp-medium) {
      width: auto;

      padding: 0;

      background: none;
    }
  }

  &__date {
    @include text_mini;
    font-size: 15px;
    color: var(--black);
    text-align: center;
  }

  &__images {
    display: flex;
    align-items: center;
  }

  &__image {
    width: 50px;
    height: 50px;

    margin-left: -16px;

    background: var(--grayBg);
    border: 1px solid var(--grayBg);
    border-radius: 10px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

    overflow: hidden;

    &:first-child {
      margin-left: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 10px;
  }

  &__more {
    height: 34px;
    padding: 12px 10px;

    @include text_mini;
    font-weight: 500;

    @include mq($bp-medium) {
      padding: 12px 15px;

      @include text_normal;
      font-weight: 500;
    }
  }

  &__button {
    width: 56px;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: none;
    border: 2px solid transparent;
    border-radius: 14px;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: var(--blackText3);
      }
    }

    &--cancel {
      border-color: var(--red);
    }

    &--repeat {
      border-color: var(--yellow);
    }
  }

}

.pages-lk-orders-item-status {
  display: flex;
  align-items: center;
  grid-gap: 6px;

  padding: 4px 12px;

  @include extra_small;
  font-weight: 600;
  
  border-radius: 16px;


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

/* 
  "pickup": {
      "pending": "Ожидание оплаты",
      "processing": "Обработка",
      "making": "Изготавливается",
      "done": "Готов",
      "wait-stock": "Ожидает выдачи",
      "wc-completed": "Выполнен"
  },
  "delivery": {
      "pending": "Ожидание оплаты",
      "processing": "Обработка",
      "making": "Изготавливается",
      "done": "Готов",
      "kurier": "Курьер выехал",
      "completed": "Выполнен",
      "cancelled": "Отменён"
  }
*/
</style>