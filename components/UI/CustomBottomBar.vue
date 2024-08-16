<template>
  <div class="bottom-bar" :class="[{ 'active-bar': isCart }, {'active-order': activeOrdersCount > 0}]">
    <div class="bottom_bar__main">
      <div class="bottom_panel" :class="{ 'full-panel': isCart }">
        <transition name="slide-top" mode="out-in">
          <button
            v-if="isCart"
            class="mini-cart"
            @click.prevent="cartStore.toggleShowCartModal(true)"
          >
            <span class="mini-cart__side">
              <UIIcon name="cart" class="mini-cart__icon mini-cart__icon--cart" />
              {{ cartStore.cartItemsPrice.toLocaleString() }} ₽
            </span>
  
            <span class="mini-cart__count">
              {{ isCart }}
            </span>
          </button>
          <CommonCartNotifications v-else class="bottom-bar__notifications" />
        </transition>
      </div>
      <div class="menu-btn" @click="openBurgerCatMenu">
        <UIIcon name="menu" :filled="true" />
      </div>
    </div>
  </div>
  <CommonCartNotifications v-if="isCart" class="bottom-bar__notifications" :class="{'bottom-bar__notifications--cart': isCart}" />
</template>

<script setup>

const cartStore = useCartStore();
const commonStore = useCommonStore();
const catalogStore = useCatalogStore();

const activeOrdersCount = computed(() => catalogStore.activeOrders?.length)

const isCart = computed(() => cartStore.cartItemsLength);

const openBurgerCatMenu = () => {
  commonStore.categoriesMenuTitle = 'Меню'
  commonStore.toggleShowCategoriesModal(true);
}

</script>

<style lang="scss" scoped>

.bottom_bar__main {
  @include flex-space;
}
.bottom-bar {
  position: fixed;
  right: 20px;
  bottom: 20px;

  &.active-order {
    bottom: 80px;
  }

  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  z-index: 100;
  pointer-events: none;

  &__notifications {
    position: fixed;
    bottom: 25px;

    width: 80% !important;

    padding-left: 20px;

    &--cart {
      bottom: 90px;
  
      padding-left: 20px;
      padding-right: 20px;
  
      max-width: 760px !important;
      width: 100% !important;
    }

    z-index: 999;
    
    @include mq($bp-small) {
      display: none;
    }
  }

  &.active-bar {
    width: calc(100% - 40px);
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  @include mq($bp-medium) {
    display: none;
  }

  &__to-top {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    padding: 10px;

    background: var(--white);
    border-radius: 50%;
    box-shadow: 0px -2px 80px 0px rgba(0, 0, 0, 0.2);
    pointer-events: auto;

    .ui-icon {
      transform: rotate(-90deg);
    }
  }
}

.mini-cart {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 10px;
  flex-grow: 1;

  padding: 7px 7px 7px 20px;

  pointer-events: auto;

  &__side {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    @include text_normal;
    font-weight: 600;
    color: var(--white);

    &--delivery {
      color: var(--grayText);
    }
  }

  &__icon {
    &--cart {
      :deep svg path {
        stroke: var(--yellow);
      }
    }

    &--delivery {
      :deep svg path {
        fill: var(--grayText);
      }
    }
  }

  &__count {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 40px;
    height: 40px;

    @include text_small;
    line-height: 18.2px;
    font-weight: 600;
    color: var(--white);

    background: #383838;
    border-radius: 10px;
  }
}

.bottom_panel {
  @include flex-space;
  background: var(--blackText3);
  box-shadow: 0px -2px 80px 0px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  &.full-panel {
    max-width: calc(100% - 60px );
    flex-grow: 1;
  }
}

.menu-btn {
  padding: 15px;
  pointer-events: all;
    background: var(--blackText3);
  box-shadow: 0px -2px 80px 0px rgba(0, 0, 0, 0.2);
    border-radius: 14px;
  :deep svg path {
    fill: var(--white);
  }
}
</style>
