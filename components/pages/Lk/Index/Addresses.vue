<template>
  <div class="pages-lk-addresses">
    <div class="pages-lk-addresses__header">
      <p class="pages-lk-addresses__title">
        Сохраненные адреса
      </p>

      <UIButton
        color="yellow"
        class="pages-lk-addresses__button"
        @click="addNewAddress()"
      >
        <UIIcon name="add" />
        Добавить новый адрес
      </UIButton>
    </div>

    <div
      v-if="isLoading"
      class="pages-lk-addresses__loader"
    >
      <UILoader is-big />
    </div>

    <div
      v-else-if="!isLoading && addresses.length"
      class="pages-lk-addresses__list"
    >
      <div
        v-for="item in addresses"
        :key="item.id"
        class="pages-lk-address"
      >
        <div class="pages-lk-address__icon">
          <UIIcon name="metka" />
        </div>
        <div class="pages-lk-address__content">
          <div class="pages-lk-address__info">
            <p
              v-if="item.name"
              class="pages-lk-address__name"
            >
              {{ item.name }}
            </p>
            <p class="pages-lk-address__address">
              {{ item.address }}
            </p>
          </div>
          <button
            type="button"
            class="pages-lk-address__edit"
            @click.stop.prevent="editAddress(item.id)"
          >
            <UIIcon name="pencil" />
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="pages-lk-addresses__empty"
    >
      Нет добавленных адресов
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useCommonStore } from '@/store/common'

const userStore = useUserStore()
const commonStore = useCommonStore()

const isLoading = ref(false)

// <!-- Computed -->
const addresses = computed(() => userStore.addresses)

console.log(addresses.value);

// <!-- Methods -->
const addNewAddress = () => {
  commonStore.toggleNewAddress(null)
  commonStore.toggleShowReceiptModal(true)
}

const editAddress = (id) => {
  commonStore.toggleNewAddress(id)
  commonStore.toggleShowReceiptModal(true)
}
</script>

<style lang="scss" scoped>
.pages-lk-addresses {
  display: flex;
  flex-direction: column;
  grid-gap: 30px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include text_big;
    font-weight: 600;
  }

  &__button {
    display: none;

    @include mq($bp-medium) {
      display: flex;
      font-weight: 500;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 50px 0;
  }

  &__empty {
    @include text_normal;
    font-weight: 600;
    color: var(--grayText);
  }
}

.pages-lk-address {
  display: grid;
  align-items: center;
  grid-template-columns: 40px 1fr;
  grid-gap: 16px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    grid-gap: 12px;

    padding: 12px 0;

    border-bottom: 1px solid var(--grayText2);
  }

  &__info {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
  }

  &__name {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__address {
    @include overflow-text;
    @include text_small;
    font-weight: 500;
    color: var(--grayText);
  }
}
</style>