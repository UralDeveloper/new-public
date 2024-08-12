<template>
  <div class="page-lk-orders">
    <h2 class="page-lk-orders__title">
      Мои заказы
    </h2>

    <div
      v-if="!isLoading"
      class="page-lk-orders-list"
    >
      <PagesLkOrdersItem
        v-for="(item, i) in orders"
        :key="i"
        :item="item"
        class="page-lk-orders-list__item"
        @reloadOrders="getOrders"
      />
    </div>
    <div
      v-else
      class="page-lk-orders__loader"
    >
      <UILoader is-big />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useCommonStore } from '@/store/common';
import { useNuxtApp } from '#app';

const userStore = useUserStore();
const commonStore = useCommonStore();
const config = useRuntimeConfig();

const { $pusher } = useNuxtApp();

const clientUrl = computed(() => {
  let temp = config.public.BASE_URL

  return temp.replace('https://', '');
})

const userId = computed(() => {
    if (userStore.user) {
        return userStore.user?.id || userStore.user?.ID;
    }
    else {
        return props.order.customer_id;
    }
})

const isLoading = ref(false);
const orders = ref([]);

// Computed
const user = computed(() => userStore.user)

onMounted(() => {
  const channel = $pusher.subscribe(`${clientUrl.value}_client_${userId.value}_chanel`);
  
  channel.bind('UpdateOrderEvent', function (data) {
    getOrders();
  });
})

// Methods
const getOrders = async () => {
  isLoading.value = true

  const data = await userStore.getOrders(config);

  isLoading.value = false

  orders.value = data?.value || []
}

getOrders()
</script>

<style lang="scss" scoped>
.page-lk-orders {
  display: grid;
  grid-gap: 20px;

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: var(--black);
    }
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 100px 0;
  }
}

.page-lk-orders-list {
  display: flex;
  flex-direction: column;

  &__item {
    border-bottom: 1px solid var(--grayText2);
  }
}
</style>

