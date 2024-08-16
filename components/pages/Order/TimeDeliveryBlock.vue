<template>
  <div class="page-order-delivery-time">
    <p class="page-order__subtitle" v-if="deliveryType === 'delivery'">
      Выберите время доставки
    </p>
    <p class="page-order__subtitle" v-else>
      Выберите время получения
    </p>
    <!-- <div class="page-order-delivery-time__list"> -->
    <div class="page-order-delivery-time__list-wrap" v-if="commonStore.appSettings?.checkout_delivery_choose_only_date">
      <button
          v-for="(item, i) in deliveryDayList"
          :key="i"
          :class="['page-order-delivery-time__button', { 'active' : item.date === deliveryTime}]"
          @click.prevent="() => {getCartDiscounts(item)}"
      >
        {{ item.text }}
      </button>
      <!-- <button
          type="submit"
          class="page-order-delivery-time__button"
          @click.prevent="emits('showModal')"
      >
        Другая дата
      </button> -->
      <!-- </div> -->
    </div>
    <div class="page-order-delivery-time__list-wrap" v-else>
      <button
          v-for="(item, i) in deliveryTimes"
          :key="i"
          :class="['page-order-delivery-time__button', { 'active' : item.date === deliveryTime}]"
          @click.prevent="() => {getCartDiscounts(item)}"
      >
        {{ item.text }}
      </button>
      <button
          type="submit"
          class="page-order-delivery-time__button"
          @click.prevent="emits('showModal')"
      >
        Другое время
      </button>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "~/store/user";
import {useCommonStore} from "~/store/common";
import {useCartStore} from "~/store/cart";

const userStore = useUserStore()
const commonStore = useCommonStore()
const cartStore = useCartStore()
const config = useRuntimeConfig()

const emits = defineEmits(['submit'])
const deliveryTime = ref(null)
const deliveryTimes = ref(null)
const loadTime = computed(() => commonStore.loadDeliveryTime(config));
const selectedDeliveryTime = computed(() => commonStore.deliveryTime)
const deliveryTimeList = computed(() => commonStore.getDeliveryTimeList)

const deliveryType = computed(() => commonStore.deliveryType)

const deliveryDayList = ref([
  {
    text: 'Сегодня',
    date: getFormattedDate(0),
  },
  {
    text: 'Завтра',
    date: getFormattedDate(1),
  },
  {
    text: 'Послезавтра',
    date: getFormattedDate(2),
  },
]);

watch(() => deliveryTimeList.value, () => {
  deliveryTimes.value = deliveryTimeList.value;

  //значение по умолчанию
  if(deliveryTimeList.value)
    commonStore.setDeliveryTime(deliveryTimeList.value[0].date)
})
watch(() => loadTime.value, () => {
})
watch(() => selectedDeliveryTime.value, () => {
  deliveryTime.value = selectedDeliveryTime.value

})

const getCartDiscounts = (deliveryTime) => {
  commonStore.setDeliveryTime(deliveryTime.date)
  setTimeout(() => {
    cartStore.getDiscounts()
  }, 2000)
}

function getFormattedDate(offset) {
  // Создаем объект Date, который содержит текущие дату и время
  let date = new Date();
  
  // Устанавливаем новую дату с учетом смещения
  date.setDate(date.getDate() + offset);
  
  // Получаем год
  let year = date.getFullYear();
  
  // Получаем месяц (месяцы в JavaScript начинаются с 0, поэтому добавляем 1)
  let month = date.getMonth() + 1;
  
  // Получаем день месяца
  let day = date.getDate();
  
  // Форматируем месяц и день с ведущим нулем, если это необходимо
  if (month < 10) {
    month = '0' + month;
  }
  
  if (day < 10) {
    day = '0' + day;
  }
  
  // Формируем строку в формате YYYY-MM-DD
  return year + '-' + month + '-' + day;
}

const getDaysOfDelivery = async () => {
  const data = await useFetch(`${config.public.BASE_URL}/wp-json/wc/v3/order/delivery-times`)

  const response = data?.data?.value;


  if (response) {
    const dates = response[commonStore.selectedLocation?.warehouse_id];

    deliveryDayList.value = []

    dates.forEach(element => {
      deliveryDayList.value.push({
        text: element.date.label,
        date: element.date.label,
      })
    });

    commonStore.setDeliveryTime(deliveryDayList.value[0].date)
  }
}
onMounted(() => {
  if (commonStore.appSettings?.checkout_delivery_choose_only_date) {
    getDaysOfDelivery();
  }
})
</script>

<style lang="scss" scoped>
.page-order {
  padding: 10px 0 60px;

  @include mq($bp-medium) {
    padding: 60px 0;
  }

  &__box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    grid-gap: 40px;

    @include mq($bp-medium) {
      flex-direction: row;
      justify-content: space-around;
    }
  }

  &__section {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 60px;

    @include mq($bp-medium) {
      max-width: 767px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
  }

  &__block {
    display: grid;
    grid-gap: 20px;

    @include mq($bp-medium) {
      grid-gap: 24px;
    }
  }

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;

      @include h2;
      color: var(--black);
    }
  }

  &__subtitle {
    @include text_large;
    font-weight: 700;
  }

  &__row {
    display: grid;
    grid-gap: 40px;

    @include mq($bp-medium) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 60px;
    }
  }

  &__aside {
    width: 100%;

    @include mq($bp-medium) {
      flex: 0 0 432px;
    }
  }

  &__buttons {
    &.page-order__buttons {
      &--desktop {
        display: none;

        @include mq($bp-medium) {
          display: flex;
        }
      }

      &--mobile {
        display: flex;

        @include mq($bp-medium) {
          display: none;
        }
      }
    }
  }
}

.page-order-delivery-types {
  height: 58px;

  margin: 0 -20px;

  overflow: hidden;

  @include mq($bp-medium) {
    height: auto;
    margin: 0;
  }

  &__wrap {
    padding: 0 16px 20px;

    overflow: auto;

    @include mq($bp-medium) {
      padding: 0;
    }
  }

  &__list {
    display: grid;

    padding: 5px;

    background: var(--grayBg2);
    border-radius: 20px;

    &--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    &--3 {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.page-order-delivery-type {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  padding: 12px 15px;
  color: var(--grayText);
  font-weight: 600;

  background: none;
  border-radius: 14px;
  border: 0;

  transition: color 0.3s, background-color 0.3s;
  white-space: nowrap;

  &.active {
    color: var(--blackText);
    background: var(--yellow);
  }
}

.page-order-delivery-time {
  display: grid;
  grid-gap: 24px;

  &__list {
    height: 48px;
    margin: 0 -20px;
    overflow: hidden;
    @include mq($bp-medium) {
      margin: 0;
    }
  }

  &__list-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    grid-gap: 12px;
    padding: 0 10px 20px;
    overflow: auto;
    @include mq($bp-medium) {
      padding: 0 0 20px 0;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 12px 12px;
    @include text_normal;
    font-weight: 500;
    color: var(--blackText2);
    white-space: nowrap;
    background: var(--grayBg2);
    border: 1px solid var(--grayBg2);
    border-radius: 10px;
    transition: background-color 0.3s, border-color 0.3s;

    &.active {
      color: var(--blackText);
      background: var(--white);
      border-color: var(--yellow);
    }
  }
}

.page-order-time {
  display: grid;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__col {
    display: grid;
    grid-gap: 4px;
  }

  &__label {
    @include text_mini;
    color: var(--grayText);
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_large;
    font-weight: 700;

    :deep(.ui-icon) svg path {
      fill: var(--yellow);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 122px;
    height: 48px;

    @include text_normal;
    font-weight: 500;

    border: 2px solid var(--yellow);
    border-radius: 14px;
  }
}
</style>