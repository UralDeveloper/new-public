<template>
  <div :class="['lk-user-block', { 'lk-user-block--mobile-menu' : isMobileMenu }]">
    <div class="lk-user-block__info">
      <div class="lk-user-block__image">
        {{ user.display_name[0].toUpperCase() }}
      </div>
      <p class="lk-user-block__name">
        {{ user?.display_name }}
      </p>
    </div>

    <button
      class="lk-user-block__button"
      @click.prevent="logout()"
    >
      <UIIcon name="logout" />
      Выйти
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

defineProps({
  isMobileMenu: {
    type: Boolean,
    default: false,
  },
})

const user = computed(() => userStore.user)

const logout = () => {
  navigateTo('/')

  userStore.setToken(null)
  userStore.setUser(null)
}
</script>

<style lang="scss" scoped>
.lk-user-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 20px;

  padding: 20px 30px;

  @include text_normal;

  background: var(--grayBg2);
  border-radius: 20px;

  &--mobile-menu {
    background: var(--white);
  }

  &__info {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-gap: 12px;
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    @include text_large;
    font-weight: 700;
    color: var(--blue);

    background: var(--white);
    border: 2px solid var(--blue);
    border-radius: 50%;
  }

  &__name {
    @include overflow-text;
    font-weight: 600;
  }

  &__button {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    
    font-weight: 500;

    color: var(--grayText);
  }
}
</style>