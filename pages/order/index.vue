<template>
  <main
    class="page-order"
    style="margin-top: 170px"
  >
    <div class="container">
      <div class="page-order__box">
        <section class="page-order__section">
          <div class="page-order__content">
            <div class="page-order__title-section">
              <a
                  href="#"
                  rel="nofollow"
                  class="page-order__go-back"
                  @click.prevent="router.go(-1)"
              >
                <UIIcon name="arrow" />
              </a>
              <h1 class="page-order__title">
                Оформление заказа
              </h1>
            </div>
            <div class="page-order__block">
              <div class="page-order-delivery-types">
                <div class="page-order-delivery-types__wrap">
                  <div :class="`page-order-delivery-types__list page-order-delivery-types__list--${deliveryTypes.length}`">
                    <button
                      v-for="(item, i) in deliveryTypes"
                      :key="i"
                      :class="['page-order-delivery-type', { 'active' : item.type === deliveryType }]"
                      @click="setNewDeliveryType(item.type)"
                    >
                      <UIIcon :name="item.type" />
                      {{ item.label }}
                    </button>
                  </div>
                </div>
              </div>

              <PagesOrderAddressBlock
                :delivery-type="deliveryType"
                @click="setNewDeliveryType(deliveryType)"
              />
            </div>

            <div v-if="!userStore.isAuth" class="mobile-menu-auth">
              <p class="mobile-menu-auth__title">
                Войдите в личный кабинет
              </p>
              <p class="mobile-menu-auth__description">
                Чтобы пользоваться бонусной системой и получать персональные предложения
              </p>
              <UIButton color="yellow" class="mobile-menu-auth__button"
                @click.prevent="commonStore.toggleShowAuthModal(true)">
                <UIIcon name="person" />
                Войти
              </UIButton>
            </div>

            <PagesOrderFormBlock
              v-model="userData"
            />

            <div class="page-order-delivery-time">
              <PagesOrderTimeDeliveryBlock
                :delivery-type="deliveryType"
                :available-delivery-time="availableDeliveryTime"
                @showModal="isShowTimeDeliveryModal = true"
              />
              <!-- <p class="page-order__subtitle">
                Выберите время доставки
              </p>
              <div class="page-order-delivery-time__list">
                <div class="page-order-delivery-time__list-wrap">
                  <button
                    v-for="(item, i) in deliveryTimes"
                    :key="i"
                    :class="['page-order-delivery-time__button', { 'active' : item === deliveryTime}]"
                    @click.prevent="() => {getCartDiscounts(item)}"
                  >
                    {{ item }}
                  </button>
                 
                </div>
              </div> -->
            </div>

            <div class="page-order__row">
              <PagesOrderPromocodeBlock />

              <PagesOrderBonusBlock
                v-if="isBonusesEnabled"
                @submit="isShowBonusesModal = true"
              />
            </div>

            <PagesOrderPaymentsBlock
              :payment-methods="paymentMethods"
              v-model="paymentMethod"
            />
          </div>

          <PagesOrderButtonsBlock
            :is-loading="isLoading"
            class="page-order__buttons page-order__buttons--desktop"
            @submit="order"
          />
        </section>

        <aside class="page-order__aside page-order-aside">
          <div class="page-order-steps page-order-aside__steps">
            <div class="page-order-step active">
              <div class="page-order-step__number">
                <UIIcon name="check" />
              </div>
              <p class="page-order-step__label">
                Корзина
              </p>
            </div>
            <div class="page-order-step active">
              <div class="page-order-step__number">
                2
              </div>
              <p class="page-order-step__label">
                Оформление заказа
              </p>
            </div>
            <div class="page-order-step">
              <div class="page-order-step__number">
                3
              </div>
              <p class="page-order-step__label">
                Заказ принят
              </p>
            </div>
          </div>

          <PagesOrderComposition />
        </aside>

        <PagesOrderButtonsBlock
          :is-loading="isLoading"
          class="page-order__buttons page-order__buttons--mobile"
          @submit="order"
        />
      </div>
    </div>
    <!-- <LazyModalsTimeDelivery
      v-if="isShowTimeDeliveryModal"
      @close="isShowTimeDeliveryModal = false"
    />
    <LazyModalsBonuses
      v-if="isShowBonusesModal"
      @close="isShowBonusesModal = false"
    />
    <LazyModalsCreditCards 
      v-if="isShiowCreditCardsModal" 
      :cards="userCards"
      @cancel="isShiowCreditCardsModal = false" 
      @accept="selectedCard = $event"
    /> -->
  </main>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'
import {useCalcDeliveryPrice} from "~/composables/useCalcDeliveryPrice";

const cartStore = useCartStore()
const catalogStore = useCatalogStore();
const commonStore = useCommonStore()
const userStore = useUserStore()
const config = useRuntimeConfig()
const router = useRouter()

// const deliveryTimes = [
//   //'Ближайшее время: 38 минут',
//   '14:30-15:00',
//   '15:00-15:30',
//   '15:30-16:00',
//   '16:00-16:30',
//   //'Другое время',
// ]

const isShiowCreditCardsModal = ref(false);

const isShowTimeDeliveryModal = ref(false)
const isShowBonusesModal = ref(false)
const isBonusesEnabled = computed(() => ( userStore.bonusActive ))
const isOrderingDisabled = computed(() => commonStore.getOrderDisability);
const isLoading = ref(false)
const allSettings = computed( () => commonStore.allSettings )
const id = ref();

const deliveryType = ref(null)

const delivery_name = ref('');

const delivery_key = ref('');

const deliveryTime = ref(null)
const user_name = useCookie('user_name')
const user_phone = useCookie('user_phone')
const user_comment = useCookie('user_comment')

const userData = reactive({
  name: user_name.value || '',
  nameError: '',
  phone: user_phone.value || '',
  phoneError: '',
  comment: user_comment.value || '',
})



//const paymentMethods = ref([])
const paymentMethod = ref(null)
const paymentMethods = computed( () => commonStore.getPaymentMethods )
// const paymentMethod = computed(() => paymentMethods.value[0]?.id)


const availableDeliveryTime = ref(null)
const selectedDeliveryTime = computed(() => commonStore.deliveryTime)

const userCards = ref(null);
const selectedCard = ref(null);

const showDeliveryPrice = ref(deliveryType.value === 'delivery' ? false : true);

const onlyItemsRegularPrice = computed(() => {
  let price = cartItemsRegularPrice.value
  
  if (commonStore.selectedLocation?.delivery_price > 0) {
    price -= commonStore.selectedLocation?.delivery_price
  }

  return price
})
const onlyItemsPrice = computed(() => cartStore.onlyItemsPrice)

// <!-- Computed -->
const deliveryTypes = computed(() => commonStore.deliveryTypes)
const user = computed(() => userStore.user)
const addresses = computed(() => userStore.addresses)
const selectedLocation = computed(() => commonStore.selectedLocation)
const currentDeliveryType = computed(() => commonStore.deliveryType)
const selectedPaymentMethod = computed(() => paymentMethods.value.find(item => item.id === paymentMethod.value))
const cartItemsPrice = computed(() => cartStore.cartItemsPrice)
const cartItemsRegularPrice = computed(() => cartStore.cartItemsRegularPrice)
const promocode = computed(() => cartStore.promocode)

// <!-- Watch -->
watch(() => userData.name, () => {
  userData.nameError = ''
  //localStorage.setItem('userData.name', userData.name);
  user_name.value = userData.name
})

watch(() => userData.phone, () => {
  userData.phoneError = ''
  user_phone.value = userData.phone
})

watch(() => userData.comment, () => {
  user_comment.value = userData.comment
})

watch(() => currentDeliveryType.value, () => {
  deliveryType.value = currentDeliveryType.value
})

watch(() => selectedCard.value, () => {
  if (selectedCard.value) {
    order();
  }
})

watch(() => cartStore.cartItemsPrice, () => {
  if (selectedLocation?.value?.zone && deliveryType.value === 'delivery') {
    const shouldShowDeliveryPrice = selectedLocation.value.zone.sum.some(item => 
      parseFloat(item.min_sum_order) <= parseFloat(cartStore.cartItemsPrice)
    );

    showDeliveryPrice.value = shouldShowDeliveryPrice;
  }
});

// Methods
const getCartDiscounts = (deliveryTime) => {
  commonStore.setDeliveryTime(deliveryTime)
    setTimeout(() => {
      cartStore.getDiscounts()
    }, 2000)
}

//Пересмотр цены доставки
useCalcDeliveryPrice()
//Пересмотр цены доставки при смене метода доставки
watch(() => selectedLocation.value, () => {
  useCalcDeliveryPrice()
})
const order = async () => {
  if (isOrderingDisabled.value) {
    commonStore.toggleShowPopupModal(true);
    return;
  }
  if (isLoading.value) {
    return false
  }

  if (!userData.name) {
    userData.nameError = 'Введите имя'
    return false
  }
  if (!userData.phone) {
    userData.phoneError = 'Введите телефон'
    return false
  }
  if (userData.phone.length !== 18) {
    userData.phoneError = 'Невалидный номер телефона'
    return false
  }

  let obj = {
    promo: promocode.value ? promocode.value.value : null,

    set_paid: false,

    status: selectedPaymentMethod.value?.id.indexOf('cod') !== -1 ? 'processing' : 'pending',

    // environment_information: {
    //   platform: platform.os.family,
    //   app_version: platform.os.version,
    //   build_number: platform.os.architecture
    // },

    payment_method: selectedPaymentMethod.value?.id,
    payment_method_title: selectedPaymentMethod.value?.title,

    billing: {
      first_name: userData.name,
      phone: userData.phone,
      country: 'RU',
      address_1: selectedLocation.value.shortAddress || selectedLocation.value.address,
      city: selectedLocation.value.city ? selectedLocation.value.city[0] : '',
      state: selectedLocation.value.province,
      warehouse_id: selectedLocation.value.warehouse_id
    },

    shipping: {
      first_name: userData.name,
      phone: userData.phone,
      country: 'RU',
      address_1: selectedLocation.value.shortAddress || selectedLocation.value.address,
      city: selectedLocation.value.city ? selectedLocation.value.city[0] : '',
      state: selectedLocation.value.province,
      warehouse_id: selectedLocation.value.warehouse_id
    },

    customer_note: userData.comment,
  }

  obj.coupon_lines = []

  if (cartStore.promocode) {
    obj.coupon_lines.push({
      'amount': cartStore.promocode?.amount,
      'code': cartStore.promocode?.value,
      'discount_type': cartStore.promocode?.type,
    })
  }

  if (cartStore.appliedAutoCoupons?.length > 0) {
    let appliedAutoCoupons = {
      'amount': cartStore.appliedAutoCoupons[0]?.amount,
      'code': cartStore.appliedAutoCoupons[0]?.name,
      'discount_type': cartStore.appliedAutoCoupons[0]?.discountType,
    }

    obj.coupon_lines.push(appliedAutoCoupons)
  }

  obj.line_items = []

  cartStore.cartItems.forEach((item, i) => {
    obj.line_items.push({
      product_id: item.id,
      quantity: item.count * +item.add_to_basket_once,
      type: 'main',
    })

    if (item?.supplements?.length) {
      item.supplements.forEach(supplement => {
        obj.line_items.push({
          product_id: supplement.id,
          quantity: supplement.count * +item.add_to_basket_once,
          type: 'ingredient',
          parent_id: item.id,
          cart_item_index: i,
        })
      })
    }
  })

  const bonuses = 0

  // if (this.$root.cartData.coupons.length != 0) {
  //   let coupons = []
  //   for(var code in this.$root.cartData.coupons) {
  //     let el = this.$root.cartData.coupons[code]
  //     let couponItem = {
  //       amount: el.value,
  //       code: el.code,
  //       discount_type: el.type
  //     }

  //     coupons.push(couponItem)
  //     if (el.total) bonuses += el.total;
  //   }

  //   data.coupon_lines = coupons;
  // }
  obj.bonuses = bonuses

  const consumer_key = config.public.CONSUMER_KEY
  const consumer_secret = config.public.CONSUMER_SECRET

  let query = {
    consumer_key,
    consumer_secret
  }

  if (user.value) {
    obj.customer_id = user.value.id
    query.customer = user.value.id
  }

  obj.shipping_lines = [
      {
        "method_id": selectedLocation.value?.delivery_code,
        "method_title": selectedLocation.value?.delivery_name,
        "total": `${selectedLocation.value?.delivery_price}`,
        'pickup_point': deliveryType.value === 'delivery' ? '' : `${selectedLocation.value?.address}`
      }
  ]

  obj.meta_data = [
    {
      "key": "billing_entrance",
      "value": selectedLocation.value?.entrance
    },
    {
      "key": "billing_enter_code",
      "value": selectedLocation.value?.number
    },
    {
      "key": "billing_flat",
      "value": selectedLocation.value?.flat
    },
    {
      "key": "billing_floor",
      "value": selectedLocation.value?.floor
    },
    {
      "key": "platform",
      "value": platform()
    },
    {
      "key": "billing_gatetimecheckout",
      "value": selectedDeliveryTime.value
    },
    {
      "key": "_billing_gatetimecheckout",
      "value": selectedDeliveryTime.value
    },
    {
      "key": "must_be_delivered",
      "value": selectedDeliveryTime.value
    },
    {
      "key": "lat",
      "value":  selectedLocation.value?.coords ? selectedLocation.value?.coords[1] : null
    },
    {
      "key": "long",
      "value": selectedLocation.value?.coords ? selectedLocation.value?.coords[0] : null
    },
    {
      "key": "stock_id",
      "value": selectedLocation.value.warehouse_id
    },
    {
      "key": "order_meta_source",
      "value": "front"
    },
    {
      "key": "entrance",
      "value": selectedLocation.value?.entrance
    },
    {
      "key": "enter_code",
      "value": selectedLocation.value?.number
    },
    {
      "key": "flat",
      "value": selectedLocation.value?.flat
    },
    {
      "key": "floor",
      "value": selectedLocation.value?.floor
    }
  ]
  // console.log('*******selectedLocation.value---', selectedLocation.value);
  // console.log('*******make order addresses', addresses);
  console.log('*******make order ---obj order---', obj);

  if (userCards.value && !selectedCard.value && (paymentMethod.value === 'wc_cloudpayments_gateway' || paymentMethod.value === 'paykeeper')) {
    isShiowCreditCardsModal.value = true;
  }
  else {
    console.log('here');
    query = new URLSearchParams(query).toString()
  
    isLoading.value = true
  
    const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/v3/orders`, {
      method: 'post',
      query,
      body: obj
    })
  // console.log('---make order---', data);
    isLoading.value = false
  
    const response = data?.value || null

    if (response) {
      isLoading.value = true;
      
      cartStore.clearCart()
      cartStore.setPromocode(null)
      id.value = response.id
      
      if (paymentMethod.value === 'wc_cloudpayments_gateway' || paymentMethod.value === 'paykeeper') {
        getOrder();
      }
      else {
        navigateTo(`/order/${response.id}`)
      }
  
    }
  }
}

const getOrder = async () => {
  if (!id.value) {
    return navigateTo('/')
  }

  const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/v3/orders/${id.value}`)


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
      let deliveryType = delivery_key === 'flat_rate' ? 'delivery' : 'pickup'
      data.value.status_name = allSettings.value?.order_status_map[deliveryType][data.value.status] || data.value.status
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

        window.history.replaceState(null, '', `/order/${response.id}`);

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
  }

  console.log('*****statusMap', allSettings.value?.order_status_map);
  console.log('*****response', response);

  order.value = response

  try {
    delivery_name.value = order.value?.shipping_lines.length ? order.value?.shipping_lines[0]['method_title'] : ''

    delivery_key.value = order.value?.shipping_lines.length ? order.value?.shipping_lines[0]['method_id'] : '';

    deliveryType.value = delivery_key.value === 'flat_rate' ? 'delivery' : 'pickup';
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

  catalogStore.updateActiveOrder(order.value)
}


// const checkAvailable = () => {
//   if (!selectedLocation.value || !cartItemsLength) {
//     return navigateTo('/')
//   }
// }

// const getPaymentMethods = async () => {
//   const { data } = await useFetch('/api/wp-json/systeminfo/v1/payment_methods')
//
//   const methods = data?.value || []
//   paymentMethods.value = methods.filter(item => item.enabled)
//
//   if (methods.length) {
//     paymentMethod.value = methods[0]?.id
//   }
// }
//TODO refactor this
const getPaymentMethods = async () => {
  let methods = commonStore.getPaymentMethods
  if(methods) {
    paymentMethods.value = methods
    if (methods.length) {
      paymentMethod.value = methods[0]?.id
    }
  }
}

const getUserCards = async () => {
  try {
    const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/saved_tokens`, {
      query: {
        user_id: user.value.id || user.value.ID,
        consumer_key: config.public.CONSUMER_KEY,
        consumer_secret: config.public.CONSUMER_SECRET,
      }
    })

    userCards.value = data.value;

    console.log(userCards.value);

  } catch (e) { console.log(e); }
}

getUserCards()

// const getDeliveryTime = async () => { selectedLocation.value.warehouse_id
//   const { data } = await useFetch('/api/wp-json/checkout/avaible_time?stock_id=119&shipping_method=delivery')
//   let times = data?.value || [];
//   if(times){
//     availableDeliveryTime.value = times
//   }
//   // commonStore.setAvailableDeliveryTime(times);
//   // // console.error(data?.value?.start_list);
//   // // console.error((data?.value?.start_list || []));
//   // console.error(times.start_list);
//   // commonStore.setDeliveryTimeList(times.start_list);
// }

const setUserData = () => {
  if (user.value) {
    userData.name = user.value.display_name
    userData.phone = user.value.phone
  }
}

const setDeliveryType = () => {
  if (currentDeliveryType.value) {
    deliveryType.value = currentDeliveryType.value
  } else {
    deliveryType.value = deliveryTypes.value[0]?.type
  }
}

//Меняем способ доставки
const setNewDeliveryType = (value) => {
  deliveryType.value = value
  // currentDeliveryType.value = value
  // commonStore.setDeliveryType(deliveryType.value)
  // commonStore.setLocation(null)
  commonStore.toggleShowReceiptModal(true)

}

// checkAvailable()
setDeliveryType()
setUserData()
// userStore.getUserBonuses(config)
getPaymentMethods()
//selectedLocation.value = getDeliveryPrice(selectedLocation)
// isBonusesEnabled.value = userStore.bonusActive
</script>

<style lang="scss" scoped>
svg{
  transform: rotate(180deg);
}

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
    @include maq($bp-medium) {
      width: 100%;
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

  &__title-section{
    margin-top: 15px;
    display: flex;
    gap: 5px;
    align-items: center;

  }



  &__title {
    display: none;

    @include mq($bp-small) {
      display: block;
      @include h2;
      color: var(--black);
    }

    @include maq($bp-small) {
      display: block;
      @include text_large;
      font-weight: 900;
      color: var(--black);
    }

  }

  &__go-back {
    display: none;

    @include maq($bp-medium) {
      display: block;
      transform: rotate(180deg);
    }

    @include maq($bp-small) {
      display: block;
      transform: rotate(180deg);
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
    }
  }
}

.page-order-delivery-type {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 5px;

  padding: 12px 5px;

  @include text_mini;
  font-weight: 600;
  color: var(--grayText);

  border-radius: 14px;
  background-color: transparent;
  border: 0;

  transition: background-color 0.3s, color 0.3s;

  ::v-deep(.ui-icon) svg {
    width: 15px;
    height: 15px;
  }

  @include mq($bp-super-small) {
    grid-gap: 10px;

    @include text_normal;
    font-weight: 600;

    ::v-deep(.ui-icon) svg {
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

    ::v-deep(.ui-icon) svg path {
      fill: var(--white);
    }
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
    align-items: center;
    grid-gap: 12px;

    padding: 0 16px 20px;

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

// Aside
.page-order-aside {
  display: flex;
  flex-direction: column;

  &__steps {
    &.page-order-aside__steps {
      display: none;
      
      @include mq($bp-medium) {
        display: flex;

        margin-bottom: 60px;
      }
    }
  }
}

.page-order-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 33px;
}

.page-order-step {
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

    .page-order-step {
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

.mobile-menu-auth {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 20px 30px;

  @include mq($bp-medium) {
    // display: none;
  }

  background: var(--grayBg2);
  border-radius: 20px;

  &__title {
    margin-bottom: 6px;

    @include text_big;
    font-weight: 600;
  }

  &__description {
    margin-bottom: 16px;

    @include text_small;
    font-weight: 500;
  }

  &__button {
    font-weight: 500;
  }
}
</style>
