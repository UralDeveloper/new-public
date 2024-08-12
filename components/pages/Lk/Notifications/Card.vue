<template>
  <div class="lk-notifications-card">
    <div class="lk-notifications-card__header">
      <p class="lk-notifications-card__title">
        {{ props.item.title }}
      </p>

      <p class="lk-notifications-card__date">
        {{ formatDate(props.item.date_added) }}
      </p>
    </div>

    <p class="lk-notifications-card__text">
      {{ props.item.text }}
    </p>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  }
})
</script>

<style lang="scss" scoped>
.lk-notifications-card {
  display: grid;
  grid-gap: 16px;

  padding: 20px 40px;

  background: var(--grayBg2);
  border-radius: 30px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include text_big;
    font-weight: 600;
    color: var(--black);
  }

  &__date {
    @include text_mini;
    font-weight: 600;
    color: var(--grayText);
  }

  &__text {
    @include text_small;
    line-height: 16.8px;
    color: var(--black);
  }
}
</style>