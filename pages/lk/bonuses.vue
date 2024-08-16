<template>
  <div class="page-lk-bonuses">
    <div class="page-lk-bonuses__block">
      <h2 class="page-lk-bonuses__title">
        Бонусная система
      </h2>

      <template v-if="!isLoading">
        <div class="page-lk-bonuses__buttons">
          <UIButton
            color="yellow"
            class="page-lk-bonuses__button"
            @click.prevent="isShowMyCardModal = true"
          >
            <UIIcon name="barcode" />
            Моя карта
          </UIButton>

          <button
            type="button"
            class="page-lk-bonuses-code"
            @click.prevent="copyCard()"
          >
            <span class="page-lk-bonuses-code__value">
              Карта № 293029303904
            </span>
            <span class="page-lk-bonuses-code__divider" />
            <span class="page-lk-bonuses-code__icon">
              <UIIcon name="copy" />
            </span>
          </button>
        </div>

        <div class="page-lk-bonuses__line">
          <div class="page-lk-bonuses-card">
            <p class="page-lk-bonuses-card__label">
              У Вас
            </p>
            <p class="page-lk-bonuses-card__value">
              <UIIcon name="bonuses" />
              <span>
                <b>
                  {{ balance.toLocaleString() }}
                </b>
                {{ declOfNum(balance, ['бонус', 'бонуса', 'бонусов']) }}
              </span>
            </p>
            <p class="page-lk-bonuses-card__text">
              1 бонус = 1 рубль
            </p>
          </div>

          <div class="page-lk-bonuses-lvl">
            <p class="page-lk-bonuses-lvl__label">
              У Вас
            </p>
            <p class="page-lk-bonuses-lvl__value">
              {{ capitalizeFirstLetter(currentLevel.name) }} 
            </p>

            <div class="page-lk-bonuses-lvl__progress">
              <div
                class="page-lk-bonuses-lvl__progress-bar"
                :style="`width: ${percentageToNextLevel}%`"
              />
              <div class="page-lk-bonuses-lvl__progress-values">
                <span>
                  {{ (+spentSum).toLocaleString() }} ₽
                </span>
                <span v-if="nextLevel">
                  {{ (+nextLevel.value).toLocaleString() }} ₽
                </span>
              </div>
            </div>

            <p class="page-lk-bonuses-lvl__text" v-if="nextLevel">
              Вам осталось купить на <span> {{ (nextLevel.value - spentSum).toLocaleString() }} ₽</span>, чтобы получить уровень {{ capitalizeFirstLetter(nextLevel.name) }}
            </p>
            <p class="page-lk-bonuses-lvl__text" v-else>
              Вы достигли максимального уровня.
            </p>
          </div>
        </div>
      </template>
    </div>

    <div v-if="isLoading" class="page-lk-bonuses__loader">
      <UILoader is-big />
    </div>

    <LazyModalsMyCard
      v-if="isShowMyCardModal"
      :qrCode="qrCode"
      @close="isShowMyCardModal = false"
    />
  </div>
</template>

<script setup>
import declOfNum from '@/utils/declOfNum'
import copyTextToClipboard from '@/utils/copyTextToClipboard'

import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'

const commonStore = useCommonStore()
const userStore = useUserStore()
const config = useRuntimeConfig();

const isShowMyCardModal = ref(false)
const isLoading = ref(false)
const balance = ref(0)
const qrCode = ref('');

const cashbackGauge = ref();

const spentSum = ref(0);

// <!-- Computed -->
const user = computed(() => userStore.user)

const currentLevel = computed(() => {
  return cashbackGauge.value.slice().reverse().find(level => spentSum.value >= level.value) || cashbackGauge.value[0];
});

const nextLevel = computed(() => {
  return cashbackGauge.value.find(level => spentSum.value < level.value) || null;
});

const amountToNextLevel = computed(() => {
  return nextLevel.value ? nextLevel.value.value - spentSum.value : 0;
});

const percentageToNextLevel = computed(() => {
  if (spentSum.value && nextLevel.value) {
    return ((+spentSum.value * 100) / +nextLevel.value.value)
  }
  if (!nextLevel.value) {
    return 100;
  }
  return 0;
});

// <!-- Methods -->
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string[0].toUpperCase() + string.slice(1);
}

const copyCard = async () => {
  try {
    await copyTextToClipboard('')

    commonStore.addNotification({
      type: 'copy',
      text: 'Карта скопирована',
      status: 'success',
    })
  } catch (e) {
    commonStore.addNotification({
      type: 'copy',
      text: 'Карта не скопирована',
      status: 'fail',
    })
  }
}

const getBalance = async () => {
  isLoading.value = true

  const data = await userStore.getBalance(config);

  isLoading.value = false

  const obj = data?.value || null

  if (obj) {
    cashbackGauge.value = obj.cashback_gauge;
    spentSum.value = obj.spent_sum || 0;
    balance.value = obj.points_balance
    qrCode.value = obj.qr_code;

    console.log(cashbackGauge.value);
    console.log(currentLevel.value);
  }
}

getBalance()
</script>

<style lang="scss" scoped>
.page-lk-bonuses {
  display: grid;
  grid-gap: 100px;

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: var(--black);
    }
  }

  &__block {
    display: grid;
    grid-gap: 40px;
  }

  &__buttons {
    display: flex;
    flex-direction: column-reverse;
    grid-gap: 14px;

    @include mq($bp-medium) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__button {
    font-weight: 500;
  }

  &__line {
    display: grid;
    grid-gap: 40px;

    @include mq($bp-medium) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 100px 0;
  }
}

.page-lk-bonuses-code {
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

  @include mq($bp-medium) {
    max-width: 270px;
  }

  &__value {
    flex: 1 1 auto;

    @include overflow-text;
    @include text_normal;
    font-weight: 600;
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

.page-lk-bonuses-card {
  display: flex;
  flex-direction: column;

  padding: 12px 20px;

  background: var(--white);
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  @include mq($bp-medium) {
    padding: 30px 40px;
  }

  &__label {
    margin-bottom: 6px;

    @include text_normal;
    font-weight: 600;
    color: var(--grayText);
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    :deep(.ui-icon) svg path {
      fill: var(--yellow);
    }

    span {
      display: flex;
      align-items: baseline;
      grid-gap: 8px;

      @include text_normal;
      font-weight: 600;

      b {
        @include text_large;
        font-weight: bold;
      }
    }
  }

  &__text {
    margin-top: 12px;

    @include text_small;
    font-weight: 600;
    color: var(--grayText);

    @include mq($bp-medium) {
      margin-top: 18px;
    }
  }
}

.page-lk-bonuses-lvl {
  display: flex;
  flex-direction: column;

  width: 100%;

  &__label {
    margin-bottom: 6px;

    @include text_normal;
    font-weight: 600;
    color: var(--grayText);
  }

  &__value {
    margin-bottom: 20px;

    @include text_large;
    font-weight: bold;
    color: var(--black);
  }

  &__progress {
    position: relative;

    width: 100%;
    height: 30px;

    background: var(--grayBg);
    border-radius: 50px;
    overflow: hidden;

    &-bar {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;

      background: var(--yellow);
    }

    &-values {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0 20px;

      @include text_mini;
      font-weight: 600;
      color: var(--black);
    }
  }

  &__text {
    max-width: 290px;

    margin-top: 12px;

    @include text_small;
    font-weight: 500;
    color: var(--grayText);

    span {
      color: var(--blackText);
    }
  }
}
</style>
