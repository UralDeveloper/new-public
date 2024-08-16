<template>
  <nav
    :class="['lk-navigation', { 'lk-navigation--mobile-menu' : isMobileMenu }]"
  >
    <ul class="lk-navigation__list">
      <li
        v-for="(item, i) in filteredMenu"
        :key="i"
        class="lk-navigation__item"
        
      >
        <NuxtLink
          :class="['lk-navigation-link lk-navigation__link', { 'active' : route.fullPath === item.link }]"
          @click.prevent="goTo(item.link)"
        >
          <span class="lk-navigation-link__value">
            <UIIcon
              :name="item.icon"
              class="lk-navigation-link__icon"
            />
            {{ item.label }}
          </span>
          <UIIcon
            name="arrow"
            class="lk-navigation-link__arrow"
          />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const commonStore = useCommonStore();

defineProps({
  isMobileMenu: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['click'])
const route = useRoute()

const menu = [
  { label: 'Личная информация', link: '/lk', icon: 'person', isShow: true },

  { label: 'Избранное', link: '/lk/favorite', icon: 'heart', isShow: true },

  { label: 'Доступные купоны', link: '/lk/promocodes', icon: 'gift', isShow: true },

  { label: 'Бонусная система', link: '/lk/bonuses', icon: 'bonuses', 
  isShow: commonStore?.allSettings?.bonus_status || false },

  { label: 'Реферальная система', link: '/lk/referals', icon: 'referals', 
  isShow: commonStore?.allSettings?.referal_promo_status || false },

  { label: 'Предпочтения', link: '/lk/preferences', icon: 'preferences', 
  isShow: commonStore?.allSettings?.preferences_status || false },

  { label: 'История заказов', link: '/lk/orders', icon: 'orders', isShow: true },

  { label: 'Колесо фортуны', link: '/lk/game', icon: 'wheel', 
  isShow: commonStore?.allSettings?.wheel_status || false },

  { label: 'История уведомлений', link: '/lk/notifications', icon: 'notifications', isShow: true },
]

const filteredMenu = computed(() => {
  return menu.filter(item => item.isShow === true)
})

const goTo = (link) => {
  navigateTo(link)
  emits('click')
}
</script>

<style lang="scss" scoped>
.lk-navigation {
  padding: 20px 40px;

  background: var(--white);
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  &--mobile-menu {
    padding: 0;

    background: none;
    box-shadow: none;

    .lk-navigation-link__arrow {
      display: none;
    }
  }

  &__list {
    display: grid;
    list-style: none;
    grid-gap: 16px;
  }
}

.lk-navigation-link {
  display: flex;
  align-items: center;
  justify-content: space-between;

  text-decoration: none;

  color: var(--blackText);

  padding-left: 25px;
  padding-top: 10px;
  padding-bottom: 25px;

  @include text_big;
  font-weight: 600;

  border-bottom: 1px solid var(--grayText2);

  transition: border-color 0.3s;

  &:hover {
    border-color: var(--orange);
  }

  &.active {
    border-color: var(--orange);

    .lk-navigation-link {
      &__icon {
        :deep svg path {
          fill: var(--orange);
        }
      }

      &__arrow {
        transform: rotate(180deg);

        :deep svg path {
          fill: var(--blackText);
        }
      }
    }
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 16px;
  }

  &__icon {
    :deep svg path {
      fill: var(--grayText2);
    }
  }

  &__label {
    display: flex;
    align-items: center;
    grid-gap: 8px;
  }

  &__arrow {
    transition: transform 0.3s;

    :deep svg path {
      fill: var(--grayText2);
    }
  }
}
</style>