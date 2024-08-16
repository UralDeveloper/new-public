<template>
  <ModalsOverlay
      :is-show="isShow"
      position="left"
      :offset="0"
      name="discount"
      @close="chooseDiscountStore.toggleChooseDiscountModal(false)"
      >
    <div class="modal-discount">
      <div
          v-if="discountItemsLength"
          class="modal-discount__main"
      >
        
        <div class="modal-discount__header">
          <div class="modal-discount__top">
            <p class="modal-discount__header__title">Вам доступны скидки и подарки</p>
            <p class="modal-discount__header__description">Чтобы воспользоваться, выберите 1 из {{ discountCount }} вариантов</p>
          </div>

          <a
            href="#"
            class="modal-discount__close"
            @click.prevent="closeModal()"
          >
            <UIIcon name="close-black" />
        </a>
        </div>
        <div class="modal-discount__content">
          <ModalsChooseDiscountItem
              v-for="(item, i) in discountItems"
              :key="i"
              :item="item"
          />
        </div>
        <div class="modal-discount__footer">
          <UIButton
              color="yellow"
              :class="[
                'modal-discount-apply-btn',
                isOnlyDiscount ? `disabled` : 'enabled',
              ]"
              :disabled="isOnlyDiscount"
              @click="submit()"
          >Подтвердить
          </UIButton>
        </div>
      </div>
    </div>
  </ModalsOverlay>
</template>
<script setup>
import { useChooseDiscountStore } from '@/store/choose_discount'
import { useCommonStore } from '@/store/common'

const chooseDiscountStore = useChooseDiscountStore()
const commonStore = useCommonStore()
const { discountItems, discountItemsLength } = storeToRefs(chooseDiscountStore)
const isShow = ref(true)

const discountCount = computed(() => {
  return discountItemsLength
})
const closeModal = () => {
  isShow.value = false
}
const isOnlyDiscount = computed(() => {
  return discountItemsLength === 1
})
const submit = () => {
  console.log("submit")
  chooseDiscountStore.applyDiscount()
  closeModal()
}
</script>
<style scoped lang="scss">
.modal-discount-apply-btn {
  font-weight: 600;
  &.disabled {
    opacity: 0.5;
  }
}
.modal-discount {
  position: relative;
  border-radius: 40px 40px 40px 40px;
  width: 100vw;
  max-width: 512px;
  height: 75vh;
  display: flex;
  flex-direction: column;

  background: var(--grayBg);
  @include mq(0, $bp-small) {
    height: 100vh !important;
    overflow-y: scroll;
  }
  @include mq($bp-small) {
    border-radius: 40px 40px 40px 40px;
  }

  &--empty {
    justify-content: center;
  }

  &__close {
    :deep(.ui-icon) svg {
        width: 24px;
        height: 24px;

        path {
            fill: var(--grayText);
        }
    }
  }

  &__title {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_large;
    font-weight: 700;

    @include mq($bp-small) {
      @include h2;
    }

    span {
      transform: rotate(180deg);

      @include mq($bp-small) {
        display: none;
      }
    }
  }

  &__main {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__header {
    flex: 0 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-gap: 12px;

    padding: 20px;

    background: var(--white);
    border-bottom: 1px solid var(--grayText2);
    border-radius: 40px 40px 0px 0px;
    &__title {
      @include text_large;
      font-weight: 700;
      //font-size: 24px;
      //font-weight: bold;
    }
    &__description {
      @include text_small;
      //font-size: 14px;
      font-weight: bold;
    }
    @include mq($bp-small) {
      padding: 40px 35px;

      //border-radius: 40px 40px 40px 40px;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }

  &__clear {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    @include text_normal;
    font-weight: 500;
    color: var(--grayText);

    :deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: var(--grayText);
      }
    }
  }

  &__count {
    display: none;

    @include mq($bp-small) {
      display: block;

      @include text_big;
      font-weight: 600;

      span {
        color: var(--orange);
      }
    }
  }

  &__content {
    flex: 1 1 auto;
    background: white;
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    padding: 20px;



    @include mq($bp-small) {
      padding: 28px 40px;
    }
  }

  &__footer {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding: 20px;

    background: var(--white);
    border-top: 1px solid var(--grayText2);
    border-radius: 0px 0px 40px 40px;

    @include mq($bp-small) {
      grid-gap: 20px;

      padding: 20px 40px 40px;

      //border-radius: 40px 40px 40px 40px;
    }
  }
}
</style>