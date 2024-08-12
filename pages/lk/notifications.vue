<template>
  <div class="page-lk-notifications">
    <h2 class="page-lk-notifications__title">
      История уведомлений
    </h2>

    <div class="page-lk-notifications__box" v-if="!isLoading">
      <div class="page-lk-notifications__block"
      v-for="(group, index) in groupedHistory"
      :key="index"
      >
        <div class="page-lk-notifications__header">
          {{ formatDate(group[0].date_added) }}
        </div>
        <div class="page-lk-notifications__list">
          <PagesLkNotificationsCard
            v-for="(card, index) in group" :key="index"
            :item="card"
          />
        </div>
      </div>
    </div>
    <div
      v-else
      class="page-lk-notifications__loader"
    >
      <UILoader is-big />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const config = useRuntimeConfig();

const groupedHistory = ref([]);

const isLoading = ref(false)

onMounted(() => {
  getHistory();
})

async function getHistory() {
  isLoading.value = true;

  let history = await userStore.getHistory(userStore.token, config);

  if (history) {
    const groupedData = history.value.reduce((acc, obj) => {
    const key = obj.date_added.split(' ')[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
    }, {});
    
    isLoading.value = false;
  
    groupedHistory.value = Object.values(groupedData) || [];
  }

}
</script>

<style lang="scss" scoped>
.page-lk-notifications {
  display: grid;
  grid-gap: 40px;

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: var(--black);
    }
  }

  &__box {
    display: grid;
    grid-gap: 12px;

    @include mq($bp-medium) {
      grid-gap: 16px;
    }
  }

  &__block {
    display: grid;
    grid-gap: 10px;
  }

  &__header {
    padding: 10px 0;

    @include text_normal;
    font-weight: 600;
    color: var(--grayText);
    text-align: center;

    @include mq($bp-medium) {
      @include text_big;
      font-weight: 600;
    }
  }

  &__list {
    display: grid;
    grid-gap: 16px;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 100px 0;
  }
}
</style>
