<template>
  <CommonBottomSheet :isModalMap="true"
    :auto-height="!!selectedItem"
  >
    <div class="modal-receipt-pickup-mobile">
      <template
        v-if="!!selectedItem"
      >
        <div class="modal-receipt-pickup-mobile-item modal-receipt-pickup-mobile-item--selected active">
          <div class="modal-receipt-pickup-mobile-item__left">
            <UIIcon
              name="pickup"
              class="modal-receipt-pickup-mobile-item__icon"
            />
          </div>
          <div class="modal-receipt-pickup-mobile-item__content">
            <p class="modal-receipt-pickup-mobile-item__address">
              {{ selectedItem.address }}
            </p>
            <p class="modal-receipt-pickup-mobile-item__city">
              {{ selectedItem.name }}
            </p>
            <p class="modal-receipt-pickup-mobile-item__time"
              v-if="selectedItem.working_time"
            >
              <UIIcon name="clock-filled" />
              {{ selectedItem.working_time}}
            </p>
          </div>
          <button
            type="button"
            class="modal-receipt-pickup-mobile-item__close"
            @click.prevent="selectItem(null)"
          >
            <UIIcon name="close" />
          </button>
        </div>

        <UIButton
          color="yellow"
          class="modal-receipt-pickup-mobile__button"
          @click="submit()"
        >
          Заберу отсюда
        </UIButton>
      </template>
      <template v-else>
        <div class="modal-receipt-pickup-mobile__search modal-receipt-pickup-mobile-search">
          <UIIcon
            name="loop"
            class="modal-receipt-pickup-mobile-search__loop"
          />
          <UIInput
            v-model="search"
            placeholder="Поиск"
            class="modal-receipt-pickup-mobile-search__input"
          />
        </div>

        <div class="modal-receipt-pickup-mobile__items">
          <div
            v-for="(item, i) in filteredLocations"
            :key="i"
            :class="['modal-receipt-pickup-mobile-item', { 'active' : selectedItem?.id === item.id }]"
            @click="selectItem(item)"
          >
            <div class="modal-receipt-pickup-mobile-item__left">
              <UIIcon
                name="pickup"
                class="modal-receipt-pickup-mobile-item__icon"
              />
            </div>
            <div class="modal-receipt-pickup-mobile-item__content">
              <p class="modal-receipt-pickup-mobile-item__address">
                {{ item.address }}
              </p>
              <p class="modal-receipt-pickup-mobile-item__city">
                {{ item.name }}
              </p>
              <p class="modal-receipt-pickup-mobile-item__time">
                <UIIcon name="clock-filled" />
                {{ item.working_time}}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </CommonBottomSheet>
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
const selectedItem = ref(null)

watch(() => props.currentAddress, (data) => {
  selectedItem.value = data
})

// <!-- Computed -->
const filteredLocations = computed(() => {
  return pickupLocations.value(props.currentType).filter(item => {
    return item.address.toLowerCase().includes(search.value.toLowerCase())
  })
})

// <!-- Methods -->
const selectItem = (item) => {
  if (!item || selectedItem.value?.id === item.id) {
    selectedItem.value = null
  } else {
    selectedItem.value = item
  }

  emits('update', selectedItem.value)
}

const submit = () => {
  userStore.setDeliveryForm(null)

  if (useChangeLocation('pickup', props.currentAddress)) {
    emits('close')
  }
}

const setDefault = () => {
  selectedItem.value = props.currentAddress
}

setDefault()
</script>

<style lang="scss" scoped>
.modal-receipt-pickup-mobile {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  overflow-y: auto;

  &__items {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
  }

  &__button {
    flex: 0 0 auto;

    font-weight: 500;
  }
}

.modal-receipt-pickup-mobile-search {
  position: relative;

  &__loop {
    position: absolute;
    top: 12px;
    left: 16px;
  }

  &__input {
    ::v-deep input {
      padding-left: 52px;
    }
  }
}

.modal-receipt-pickup-mobile-item {
  display: grid;
  grid-template-columns: 40px 1fr;

  cursor: pointer;

  &--selected {
    grid-template-columns: 40px 1fr 36px;
  }

  &.active {
    .modal-receipt-pickup-mobile-item {
      &__icon {
        ::v-deep svg path {
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

    ::v-deep svg path {
      fill: var(--grayText2);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    padding: 12px 0 12px 16px;

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

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-left: 12px;

    border-bottom: 1px solid var(--yellowDark);

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: var(--blackText3);
      }
    }
  }
}
</style>