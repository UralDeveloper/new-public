<template>
  <div class="modal-receipt-pickup">
    <div class="modal-receipt-pickup__header">
      <div class="modal-receipt-pickup__search modal-receipt-pickup-search">
        <UIIcon
          name="loop"
          class="modal-receipt-pickup-search__loop"
        />
        <UIInput
          v-model="search"
          placeholder="Поиск"
          class="modal-receipt-pickup-search__input"
        />
      </div>

      <!-- <p class="modal-receipt-pickup__location">
        <UIIcon name="location" />
        Москва
      </p> -->
    </div>

    <div class="modal-receipt-pickup__main">
      <div
        v-for="(item, i) in filteredLocations"
        :key="i"
        :class="['modal-receipt-pickup-item', { 'active' : currentAddress?.id === item.id }]"
        @click="currentAddress?.id === item.id ? emits('update', null) : emits('update', item)"
      >
        <div class="modal-receipt-pickup-item__left">
          <UIIcon
            name="pickup"
            class="modal-receipt-pickup-item__icon"
          />
        </div>
        <div class="modal-receipt-pickup-item__content">
          <p class="modal-receipt-pickup-item__address">
            {{ item.address }}
          </p>
          <p class="modal-receipt-pickup-item__city">
            {{ item.name }}
          </p>
          <p class="modal-receipt-pickup-item__time">
            <UIIcon name="clock-filled" />
            {{ item.working_time}}
          </p>
        </div>
      </div>
    </div>

    <div class="modal-receipt-pickup__footer">
      <UIButton
        :disabled="!currentAddress"
        color="yellow"
        class="modal-receipt-pickup__button"
        @click="submit()"
      >
        Подтвердить
      </UIButton>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'

const commonStore = useCommonStore()
const userStore = useUserStore()
const { pickupLocations } = storeToRefs(commonStore)

const props = defineProps({
  currentAddress: {
    type: undefined,
    default: null,
  },
  currentType: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['close', 'update'])

const search = ref('')

// <!-- Computed -->
// const pickupLocations = computed(() => {
//   return commonStore.pickupLocations(props.currentType)
// })

const filteredLocations = computed(() => {
  return pickupLocations.value(props.currentType).filter(item => {
    return item.address.toLowerCase().includes(search.value.toLowerCase())
  })
})

watch(() => filteredLocations, () => {
  console.log('!!!!!!!')
  alert()
})
const submit = () => {
  userStore.setDeliveryForm(null)

  if (useChangeLocation('pickup', props.currentAddress)) {
    emits('close')
  }
}
</script>

<style lang="scss" scoped>
.modal-receipt-pickup {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  grid-gap: 20px;

  &__header {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 20px;
  }

  &__search {
    flex: 1 1 auto;
  }

  &__location {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_mini;
    font-weight: 600;
    color: var(--grayText);

    cursor: pointer;

    .ui-icon {
      width: 20px;
      height: 20px;

      :deep svg path {
        fill: var(--grayText);
      }
    }
  }

  &__main {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    padding-right: 20px;

    overflow-y: auto;

    @include custom-scrollbar;
  }

  &__footer {
    flex: 0 0 auto;
  }

  &__button {
    width: 100%;
    font-weight: 500;
  }
}

.modal-receipt-pickup-search {
  position: relative;

  &__loop {
    position: absolute;
    top: 12px;
    left: 16px;
  }

  &__input {
    :deep input {
      padding-left: 52px;
    }
  }
}

.modal-receipt-pickup-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-gap: 16px;

  cursor: pointer;

  &.active {
    .modal-receipt-pickup-item {
      &__icon {
        :deep svg path {
          fill: var(--green);
        }
      }

      &__content {
        border-color: var(--yellowDark);
      }
    }
  }

  &__left {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 24px;
    height: 24px;

    :deep svg path {
      fill: var(--grayText2);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    padding: 12px 0;

    border-bottom: 1px solid var(--grayText2);
  }

  &__address {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__city {
    @include overflow-text;
    @include text_small;
    font-weight: 500;
    color: var(--grayText);
  }

  &__time {
    display: flex;
    align-items: center;
    grid-gap: 5px;

    @include text_mini;
    color: var(--grayText);
  }
}
</style>