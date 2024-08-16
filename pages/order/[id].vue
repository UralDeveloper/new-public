<template>
  <div class="page-order-info">
    <div class="container">
      <div
        v-if="order"
        class="page-order-info__box"
      >
        <section class="page-order-info__section">
          <div class="page-order-info__content">
            <div class="page-order-info__header">
              <span class="page-order-info__icon pending" v-if="order.status == 'cancelled'">
                <UIIcon name="close" />
              </span>
              <span class="page-order-info__icon" v-else-if="order.status !== 'pending'">
                <UIIcon name="check" />
              </span>
              <span class="page-order-info__icon pending" v-else>
                <UIIcon name="clock" />
              </span>
              <div class="page-order-info__header-info">
                <h1 class="page-order-info__title" v-if="order.status == 'cancelled'">
                  Ваш заказ отменён
                </h1>
                <h1 class="page-order-info__title" v-else-if="order.status !== 'pending'">
                  Ваш заказ успешно оформлен
                </h1>
                <h1 class="page-order-info__title" v-else>
                  Ваш заказ ожидает оплаты
                </h1>
                <p class="page-order-info__order-number">
                  Заказ № {{ order.id }}
                </p>
              </div>
            </div>

            <PagesOrderInfoProgressBlock
              :order="order"
              :deliveryType="delivery_type"
            />

            <PagesOrderInfoAboutBlock
              :status="order.status_name"
              :info="order.shipping"
              @cancel="cancel"
              :order="order"
            />
          </div>

          <div class="page-order-info-buttons">
            <UIButton
              color="gray"
              class="page-order-info-buttons__button page-order-info-buttons__button--back"
              @click="navigateTo('/')"
            >
              <UIIcon
                name="arrow"
                class="page-order-info-buttons__arrow"
              />
              Вернуться в магазин
            </UIButton>
          </div>
        </section>

        <aside class="page-order-info__aside page-order-info-aside">
          <div class="page-order-info-steps page-order-info-aside__steps">
            <div class="page-order-info-step active">
              <div class="page-order-info-step__number">
                <UIIcon name="check" />
              </div>
              <p class="page-order-info-step__label">
                Корзина
              </p>
            </div>
            <div class="page-order-info-step active">
              <div class="page-order-info-step__number">
                <UIIcon name="check" />
              </div>
              <p class="page-order-info-step__label">
                Оформление заказа
              </p>
            </div>
            <div class="page-order-info-step active">
              <div class="page-order-info-step__number">
                3
              </div>
              <p class="page-order-info-step__label">
                Заказ принят
              </p>
            </div>
          </div>

          <PagesOrderInfoComposition
            :items="order.line_items"
            :order="order"
          />
        </aside>
      </div>
      <div
        v-else
        class="page-order-info__loader"
      >
      <UILoader is-big />
    </div>
    </div>
  </div>

  <LazyModalsAccept v-if="commonStore.isShowAcceptModal" 
  :title="`Заказ уже обработан`"
  :text="`Желаете отменить заказ?`" 
  @cancel="isShowCancelOrderModal = false"
  @close="isShowCancelOrderModal = false"
  @accept="acceptModal" 
  />
</template>

<script setup>
import {useCommonStore} from "~/store/common";
import {useUserStore} from "~/store/user";
import {navigateTo} from "#app/composables/router";
import show_error from "~/utils/show_error";
import { useNuxtApp } from '#app';

const config = useRuntimeConfig();

const route = useRoute()
const { id } = route.params
const catalogStore = useCatalogStore();
const commonStore = useCommonStore()
const userStore = useUserStore();
const allSettings = computed( () => commonStore.allSettings )

const { $pusher } = useNuxtApp();

const clientUrl = computed(() => {
  let temp = config.public.BASE_URL

  return temp.replace('https://', '');
})

const userId = ref();

const order = ref(null)

const delivery_name = ref('');

const delivery_key = ref('');

const delivery_type = ref('');

const timeCreated = ref('');

const isShowCancelOrderModal = ref(false);

const getOrder = async () => {
  if (!id) {
    return navigateTo('/')
  }

  const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/v3/orders/${id}`)


  const response = data?.value || null

  if(data?.value){
    let billing_gatetimecheckout = ''
    let local_pickup_name = ''
    let delivery_key = ''
    let delivery_name = ''
    let new_user_register_token = ''



    data.value?.meta_data.map(item => {
      if(item.key === 'billing_gatetimecheckout')
        billing_gatetimecheckout = item.value;
      if(item.key === 'must_be_delivered')
        billing_gatetimecheckout = item.value;
      if(item.key === 'local_pickup_name')
        local_pickup_name = item.value;
      if(item.key === 'new_user_register_token')
        new_user_register_token = item.value;

      return item;
    });

    //если в закезе прищел токен, авторизовываем пользователя
    
    // UPD сказали выпилить эту логику
    // if(new_user_register_token){
    //   const userStore = useUserStore()
    //   await userStore.getUser(new_user_register_token, config)
    // }


    try {
      delivery_name = data.value?.shipping_lines.length ? data.value?.shipping_lines[0]['method_title'] : ''
      delivery_key = data.value?.shipping_lines.length ? data.value?.shipping_lines[0]['method_id'] : ''
      let delivery_type = delivery_key === 'flat_rate' ? 'delivery' : 'pickup'
      data.value.status_name = allSettings.value?.order_status_map[delivery_type][data.value.status] || allSettings.value?.order_statuses_all[data.value.status] || data.value.status
    }
    catch (err) {

      console.error('*****Get order error', err)

    }

    data.value.billing_gatetimecheckout = billing_gatetimecheckout
    data.value.local_pickup_name = local_pickup_name
    data.value.delivery_key = delivery_key
    data.value.delivery_name = delivery_name

    let isVisitedPaymentPage = catalogStore?.visitsToPaymentPage?.find(item => +item.id === +data.value?.id)?.visited ?? false;

    //автоматический переход на онлайн оплату
    try {
      if(response.status==='pending' && response.payment_url && !isVisitedPaymentPage) {

        catalogStore.visitsToPaymentPage.push({
          id: data.value?.id,
          visited: true,
        })

        if (Number.isFinite(userStore.selectedCard)) {
          window.location = `${response.payment_url}&token=${userStore.selectedCard}`;
        }
        else {
          window.location = response.payment_url
        }
      }
    } catch (e) {
      console.error(e)
    }
  }else{
    show_error(404);
  }

  console.log('*****statusMap', allSettings.value?.order_status_map);
  console.log('*****response', response);

  order.value = response

  try {
    delivery_name.value = order.value?.shipping_lines.length ? order.value?.shipping_lines[0]['method_title'] : ''

    delivery_key.value = order.value?.shipping_lines.length ? order.value?.shipping_lines[0]['method_id'] : '';

    delivery_type.value = delivery_key.value === 'flat_rate' ? 'delivery' : 'pickup';
  }
  catch (err) {
    console.error('*****Get order error', err)
  }

  if (userStore.user) {
    userId.value = userStore.user?.id || userStore.user?.ID;
  }
  else {
    userId.value = order.value.customer_id;
  }

  if ($pusher && $pusher !== undefined) {
    const channel = $pusher.subscribe(`${clientUrl.value}_client_${userId.value}_chanel`);
    
    channel.bind('UpdateOrderEvent', function (data) {
      order.value = null;
      getOrder();
    });
  }

  const datetimeString = order.value?.date_created;

  const dateTime = new Date(datetimeString);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const hoursAndMinutes = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  timeCreated.value = hoursAndMinutes;

  let isOrderAdded = catalogStore.activeOrders.some(item => +item.id === +order.value.id);

  if (!isOrderAdded) {
    catalogStore.addActiveOrder(order.value)
  }
  else {
    catalogStore.updateActiveOrder(order.value)
  }
}

function cancel() {
  isShowCancelOrderModal.value = true;
  commonStore.toggleShowAcceptModal(true);
}

const acceptModal = async () => {
  if (isShowCancelOrderModal.value) {
      const config = useRuntimeConfig();

      const obj = {
          order_id: order.value.id,
          status: 'cancelled',
          token: userStore.token
      }

      const data = await $fetch(`${config.public.BASE_URL}/wp-json/customer/order/status`, {
          method: "POST",
          body: obj
      })  
      // order.status.value = 'cancelled'

      closeModal();
  }
}

getOrder()
</script>

<style lang="scss" scoped>
:deep(.ruble-icon) svg path {
  fill: $white;
}
.page-order-info {
  margin-top: 170px;
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

  &__header {
    display: flex;
    align-items: flex-start;
    grid-gap: 20px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    background: var(--green);
    border-radius: 50%;

    &.pending {
      background: $red;
    }

    :deep(.ui-icon) svg path {
      fill: var(--white);
    }

    @include maq($bp-small) {
      height: 35px;
      width: 35px;

      :deep(.ui-icon) svg {
        width: 35px;
        height: 35px;   
        
      }
      :deep(.ui-icon) svg path {
        width: 35px;
        height: 35px;   
        
      }
      :deep(.ui-icon) svg mask {
        width: 35px;
        height: 35px;   
        
      }
    }

    @include maq(420px) {
      height: 30px;
      width: 30px;

      :deep(.ui-icon) svg {
        width: 30px;
        height: 30px;   
        
      }
      :deep(.ui-icon) svg path {
        width: 30px;
        height: 30px;   
        
      }
      :deep(.ui-icon) svg mask {
        width: 30px;
        height: 30px;   
        
      }
    }
  }

  &__header-info {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }

  &__title {
    @include h2;
    color: var(--black);
  }

  &__order-number {
    @include text_large;
    font-weight: 700;
    color: var(--grayText);
  }

  &__aside {
    width: 100%;

    @include mq($bp-medium) {
      flex: 0 0 432px;
    }
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 100px 0;
  }
}

// Aside
.page-order-info-aside {
  display: flex;
  flex-direction: column;

  &__steps {
    &.page-order-info-aside__steps {
      display: none;
      
      @include mq($bp-medium) {
        display: flex;

        margin-bottom: 60px;
      }
    }
  }
}

.page-order-info-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 33px;
}

.page-order-info-step {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 6px;

  color: var(--grayText);

  &:before {
    content: '';
    position: absolute;
    top: 24px;
    right: calc(50% + 24px);

    width: 120px;

    border: 1px dashed var(--grayText);
  }

  &:first-child {
    &:before {
      display: none;
    }
  }

  &.active {
    color: var(--black);

    &:before {
      border-style: solid;
    }

    .page-order-info-step {
      &__number {
        border-color: var(--black);
      }
    }
  }

  &__number {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    @include text_large;
    font-weight: 700;

    background: var(--white);
    border: 1px solid var(--grayText);
    border-radius: 50%;
    z-index: 1;
  }
  
  &__label {
    @include text_mini;
    font-weight: 600;
  }
}

.page-order-info-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__button {
    font-weight: 500;
  }

  &__arrow {
    transform: rotate(180deg);
  }
}
</style>