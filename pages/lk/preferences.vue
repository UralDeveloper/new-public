<template>
  <div class="page-lk-preferences">
    <div class="page-lk-preferences__header">
      <h2 class="page-lk-preferences__title">
        Предпочтения
      </h2>
      <p class="page-lk-preferences__text">
        Пожалуйста, укажите ваши предпочтения в продуктах, чтобы мы могли подготовить для вас наиболее подходящие предложения.
      </p>
    </div>

    <div class="page-lk-preferences__content">
      <div class="page-lk-preferences-list page-lk-preferences__list">
        <div class="page-lk-preferences-list__item">
          <div class="page-lk-preferences-list__value">
            <img src="@/assets/img/products/broccoli.png" alt="">
            Я вегетарианец
          </div>
          <UISwitcher />
        </div>
        <div class="page-lk-preferences-list__item">
          <div class="page-lk-preferences-list__value">
            <img src="@/assets/img/products/garlic.png" alt="">
            Не ем чеснок
          </div>
          <UISwitcher />
        </div>
        <div class="page-lk-preferences-list__item">
          <div class="page-lk-preferences-list__value">
            <img src="@/assets/img/products/onion.png" alt="">
            Не ем лук
          </div>
          <UISwitcher />
        </div>
        <div class="page-lk-preferences-list__item">
          <div class="page-lk-preferences-list__value">
            <img src="@/assets/img/products/hot-pepper.png" alt="">
            Нельзя острое
          </div>
          <UISwitcher />
        </div>
      </div>

      <form
        class="page-lk-preferences-form page-lk-preferences__form"
        @submit.prevent="onSubmit()"
      >
        <p class="page-lk-preferences-form__label">
          Комментарий
        </p>
        <UITextarea
          color="white"
          placeholder="Укажите, что не попало в наш список?"
          class="page-lk-preferences-form__input"
        />
        <UIButton
          type="submit"
          color="yellow-light"
          class="page-lk-preferences-form__button"
        >
          Cохранить
        </UIButton>
      </form>
    </div>
  </div>
</template>

<script setup>
const onSubmit = () => {}
</script>

<style lang="scss" scoped>
.page-lk-preferences {
  display: grid;
  grid-gap: 40px;

  &__header {
    display: grid;
    grid-gap: 16px;
  }

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: var(--black);
    }
  }

  &__text {
    max-width: 462px;

    @include text_small;
    font-weight: 500;
    color: var(--black);
  }

  &__content {
    display: grid;
    grid-gap: 40px;

    @include mq($bp-medium) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
    }
  }
}

.page-lk-preferences-list {
  @include mq($bp-medium) {
    padding: 30px 40px;

    background: var(--white);
    border-radius: 20px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 16px 0;

    border-bottom: 1px solid var(--grayBg);
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 16px;

    @include text_small;
    font-weight: 600;
    color: var(--black);
  }
}

.page-lk-preferences-form {
  display: grid;
  grid-gap: 20px;

  &__label {
    @include text_big;
    font-weight: 600;
    color: var(--grayText);
  }

  &__input {
    ::v-deep textarea {
      height: 160px;
      padding: 20px;
      font-weight: 500;
    }
  }

  &__button {
    width: 113px;
  }
}
</style>
