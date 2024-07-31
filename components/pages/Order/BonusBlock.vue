<template>
  <div class="page-order-bonus">
    <p class="page-order-bonus__title">
      Списать бонусы
    </p>

    <!--Бонусы еще не использовались-->
    <div
        class="page-order-bonus__box"
        v-if="!getUserUsedBonuses"
    >
      <div class="page-order-bonus__col">
        <p class="page-order-bonus__label">
          Ваш бонусный баланс:
        </p>
        <p class="page-order-bonus__value">
          {{ getUserBonus }}
          <UIIcon name="bonuses" />
        </p>
      </div>

      <button
          type="submit"
          class="page-order-bonus__button"
          @click.prevent="emits('submit')"
      >
        Списать бонусы
      </button>
    </div>

    <!--Пользователь использовал бонусы-->
    <div
        class="page-order-bonus__box"
        v-if="getUserUsedBonuses"
    >
      <div class="page-order-bonus__col">
        <p class="page-order-bonus__label">
          На данный заказ будет списано:
        </p>
        <p class="page-order-bonus__value">
          {{ getUserUsedBonuses }}
          <UIIcon name="bonuses" />
        </p>
      </div>

      <UIButton
          color="gray"
          class="page-order-buttons__button page-order-buttons__button--back"
          @click="canselBonuses()"
      >
        Отменить
      </UIButton>
    </div>
  </div>


</template>

<script setup>
import {useUserStore} from "~/store/user";
import {useCartStore} from "~/store/cart";
const userStore = useUserStore()
const cartStore = useCartStore()
const bonusBalance = ref(0)
const emits = defineEmits(['submit'])
const getUserBonus = computed(() => userStore.getUserBonus)
const getUserUsedBonuses = computed(() => userStore.getUserUsedBonuses)

//Отмена бонусов
const canselBonuses = () => {
  cartStore.setBonus(0)
  userStore.setAppliedBonus(0)

}

watch(() => getUserBonus.value, () => {
  bonusBalance.value = getUserBonus.value
})

</script>

<style lang="scss" scoped>
.page-order-bonus {
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

    ::v-deep(.ui-icon) svg path {
      fill: var(--yellow);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 166px;
    height: 48px;

    @include text_normal;
    font-weight: 500;

    border: 2px solid var(--yellow);
    border-radius: 14px;
  }
}
</style>