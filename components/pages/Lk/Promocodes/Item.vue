<template>
  <div class="pages-lk-promocodes-item">
    <div class="pages-lk-promocodes-item__col pages-lk-promocodes-item__col--number">
      <p class="pages-lk-promocodes-item__number">
        {{ number < 10 ? `0${number}` : number }}
      </p>
    </div>
    <div class="pages-lk-promocodes-item__col pages-lk-promocodes-item__col--code">
      <button
        type="button"
        class="pages-lk-promocodes-item-code"
        @click.prevent="copyCode(item.code)"
      >
        <span class="pages-lk-promocodes-item-code__value">
          {{ item.code }}
        </span>
        <span class="pages-lk-promocodes-item-code__divider" />
        <span class="pages-lk-promocodes-item-code__icon">
          <UIIcon name="copy" />
        </span>
      </button>
    </div>
    <div class="pages-lk-promocodes-item__col pages-lk-promocodes-item__col--text">
      <p class="pages-lk-promocodes-item__text">
        {{ item.title }}
      </p>
    </div>
    <div class="pages-lk-promocodes-item__col pages-lk-promocodes-item__col--qr">
      <button
        type="button"
        class="pages-lk-promocodes-item-qr"
        @click.prevent="emits('showQrCode')"
      >
        <UIIcon name="qr-code" />
        QR code
      </button>
    </div>
    <div class="pages-lk-promocodes-item__col pages-lk-promocodes-item__col--date">
      <p class="pages-lk-promocodes-item__date">
        {{ item.avaible_to ? '' : 'бессрочно' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import copyTextToClipboard from '@/utils/copyTextToClipboard'

import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

defineProps({
  number: {
    type: Number,
    default: 1,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['showQrCode'])

const copyCode = async (code: string) => {
  try {
    await copyTextToClipboard(code)

    commonStore.addNotification({
      type: 'copy',
      text: 'Промокод скопирован',
      status: 'success',
    })
  } catch (e) {
    commonStore.addNotification({
      type: 'copy',
      text: 'Промокод не скопирован',
      status: 'fail',
    })
  }
}
</script>

<style lang="scss" scoped>
.pages-lk-promocodes-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 20px 0;

  @include mq($bp-medium) {
    flex-wrap: nowrap;
  }

  &__col {
    flex: 0 0 auto;

    display: flex;
    align-items: center;

    &--number {
      display: none;

      @include mq($bp-medium) {
        flex: 0 0 40px;
        order: 0;

        display: flex;
      }
    }

    &--code {
      flex: 1 1 calc(100% - 153px);
      order: 0;
      
      @include mq($bp-medium) {
        flex: 0 0 183px;
        order: 1;
      }
    }

    &--text {
      flex: 1 1 100%;
      order: 2;

      @include mq($bp-medium) {
        flex: 1 1 auto;

        padding: 0 35px;
      }
    }

    &--qr {
      flex: 1 1 153px;
      order: 1;

      padding-left: 20px;

      @include mq($bp-medium) {
        flex: 0 0 133px;
        order: 3;

        padding-left: 0;
      }
    }

    &--date {
      flex: 1 1 100%;
      order: 3;
      
      @include mq($bp-medium) {
        flex: 0 0 99px;
        order: 4;

        justify-content: flex-end;
      }
    }
  }

  &__number {
    @include text_small;
    font-weight: 500;
    color: var(--grayText);
  }

  &__text {
    @include text_small;

    margin-top: 14px;
    padding-left: 16px;

    @include mq($bp-medium) {
      margin-top: 0;
      padding-left: 0;
    }
  }

  &__date {
    @include text_small;
    font-weight: 500;
    color: var(--grayText);

    margin-top: 4px;
    padding-left: 16px;

    @include mq($bp-medium) {
      margin-top: 0;
      padding-left: 0;

      color: var(--blackText);
    }
  }
}

.pages-lk-promocodes-item-code {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  grid-gap: 15px;

  width: 100%;
  height: 48px;

  padding: 0 15px 0 25px;

  background: var(--white);
  border-radius: 14px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  &__value {
    flex: 1 1 auto;

    @include overflow-text;
    @include text_normal;
    font-weight: 500;
  }

  &__divider {
    flex: 0 0 auto;
    width: 2px;
    height: 20px;

    background: rgba(0, 0, 0, 0.3);
  }

  &__icon {
    flex: 0 0 auto;
  }
}

.pages-lk-promocodes-item-qr {
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  padding: 8px 15px;

  @include text_normal;
  font-weight: 500;

  background: var(--grayBg);
  border-radius: 14px;
}
</style>