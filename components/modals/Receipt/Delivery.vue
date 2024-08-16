<template>
  <div
    v-if="!isAuth || !addresses.length"
    class="modal-receipt-delivery"
  >
    <div class="modal-receipt-delivery__main">
      <div class="modal-receipt-delivery__header">
        <p class="modal-receipt-delivery__title">
          Укажите адрес доставки
        </p>

        <!-- <p class="modal-receipt-delivery__location">
          <UIIcon name="location" />
          Москва
        </p> -->
      </div>

      <div class="modal-receipt-delivery-form">
        <div class="modal-receipt-delivery-form__header">
          <label
            for="address"
            class="modal-receipt-delivery-form__label"
          >
            Город, улица, дом
          </label>

          <!-- <p class="modal-receipt-delivery-form__navigate">
            <UIIcon
              name="navigate"
            />
            определить
          </p> -->
        </div>
        <div class="modal-receipt-delivery-form__lines">
          <div class="modal-receipt-delivery-form__line">
            <div class="modal-receipt-delivery-form-input">
              <input
                id="address"
                v-model="form.address"
                type="text"
                placeholder="Адрес"
                :class="[
                  'modal-receipt-delivery-form-input__area',
                  {
                    'modal-receipt-delivery-form-input__area--error' : addressError
                  }
                ]"
                @input="searchAddress"
                autocomplete="off"
              >
              <span
                v-if="addressError"
                class="modal-receipt-delivery-form-input__error"
              >
                Ваш адрес вне зоны доставки
              </span>

              <div
                v-if="isShowResults && results.length"
                class="modal-receipt-delivery-form-results"
              >
                <div
                  v-for="(item, i) in results"
                  :key="i"
                  class="modal-receipt-delivery-form-results__item"
                  @click="setAddress(item)"
                >
                  {{ item.address }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-receipt-delivery-form__line modal-receipt-delivery-form__line--cols">
            <UIInput
              v-model="form.flat"
              placeholder="Кв/офис"
              color="gray"
            />
            <UIInput
              v-model="form.entrance"
              placeholder="Подъезд"
              color="gray"
            />
            <UIInput
              v-model="form.floor"
              placeholder="Этаж"
              color="gray"
            />
            <UIInput
              v-model="form.number"
              placeholder="Домофон"
              color="gray"
            />
          </div>
          <div class="modal-receipt-delivery-form__line">
            <UITextarea
              v-model="form.comment"
              placeholder="Комментарий курьеру"
              color="gray"
              class="modal-receipt-delivery-form__textarea"
            />
          </div>
          <div class="add-new-address__block">
            <div class="add-new-address__line">
              <label
                  for="new_address"
                  class="add-new-address__label"
              >
                Дайте название адресу
              </label>
              <UIInput
                  v-model="form.name"
                  placeholder="Дом, офис"
                  color="gray"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-receipt-delivery__footer">
      <ModalsReceiptDeliveryInfo
        :is-error="addressError"
        :condition="condition"
      />

      <UIButton
        v-if="isAuth"
        :disabled="isButtonDisabled"
        color="yellow"
        class="modal-receipt-delivery__button"
        @click="submitAuth()"
      >
        Подтвердить
      </UIButton>
      <UIButton
          v-if="!isAuth"
          :disabled="isButtonDisabled"
          color="yellow"
          class="modal-receipt-delivery__button"
          @click="submitNoAuth()"
      >
        Подтвердить
      </UIButton>

    </div>
  </div>

  <div
    v-else
    class="modal-receipt-addresses"
  >
    <div class="modal-receipt-addresses__main">
      <p class="modal-receipt-addresses__title">
        Сохраненные адреса
      </p>

      <div
        v-if="addresses.length"
        class="modal-receipt-addresses__list"
      >
        <div
          v-for="item in addresses"
          :key="item.id"
          :class="[
            'modal-receipt-addresses-item modal-receipt-addresses__item',
            {
              'modal-receipt-addresses-item--active' : item.id === commonStore.selectedLocation?.id
            }
          ]"
          @click.prevent="selectAddress(item)"
        >
          <div class="modal-receipt-addresses-item__icon">
            <UIIcon name="metka" />
          </div>
          <div class="modal-receipt-addresses-item__block">
            <div class="modal-receipt-addresses-item__content">
              <p
                v-if="item.name"
                class="modal-receipt-addresses-item__name"
              >
                {{ item.name }}
              </p>

              <p class="modal-receipt-addresses-item__address">
                {{ item.address }}
              </p>
            </div>

            <button
              type="button"
              class="modal-receipt-addresses-item__edit"
              @click.prevent.stop="editAddress(item.id)"
            >
              <UIIcon name="pencil" />
            </button>
          </div>
        </div>
      </div>
      <p
        v-else
        class="modal-receipt-addresses__empty"
      >
        Нет добавленных адресов
      </p>
    </div>

    <div class="modal-receipt-addresses__footer">
      <UIButton
        color="yellow"
        class="modal-receipt-addresses__button"
        @click="addNewAddress()"
      >
        <UIIcon name="add" />
        Добавить новый адрес
      </UIButton>
    </div>
  </div>
</template>

<script setup>

const commonStore = useCommonStore()
const userStore = useUserStore()

const config = useRuntimeConfig();

const { isAuth } = storeToRefs(userStore)

const isSelectedResultAddress = ref(false);

const props = defineProps({
  deliveryCoords: {
    type: Array,
    default: null,
  },

  deliveryZone: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['close', 'setDeliveryCoords', 'addNewAddress'])

const form = reactive({
  address: '',
  flat: '',
  entrance: '',
  floor: '',
  number: '',
  comment: '',
  coords: null,
  city: '',
  shortAddress: '',
  country: '',
  province: '',
})
const results = ref([])
const isShowResults = ref(false)

watch(() => props.deliveryCoords, (data) => {
  if (data) {
    searchByCoords(data)
  }
})

// <!-- Computed -->
const addresses = computed(() => userStore.addresses)
const addressId = computed(() => commonStore.newAddress)

const addressError = computed(() => {
  if (props.deliveryCoords && !props.deliveryZone) {
    return true
  }

  return false
})

const condition = computed(() => {
  if (!props.deliveryZone) {
    return null
  }

  return commonStore.conditions.find(item => item.zone === props.deliveryZone)
})

const isButtonDisabled = computed(() => {
  if (!props.deliveryZone || !isSelectedResultAddress.value) {
    return true
  }

  return false
})

// <!-- Methods -->
const addNewAddress = () => {
  commonStore.toggleNewAddress(null)
}

const editAddress = (id) => {
  commonStore.toggleNewAddress(id)
}

const searchAddress = async () => {
  isSelectedResultAddress.value = false;
  
  isShowResults.value = true
  results.value = []

  if (ymaps) {
    const search = await ymaps.geocode(form.address)

    const geo = search.geoObjects.toArray();

    if (geo.length) {
      results.value = geo.map(item => {
        return {
          address: item.properties.get('text'),
          // city: obj.properties.get('description'),
          // shortAddress: obj.properties.get('name'),
          coords: item.geometry.getCoordinates()
        }
      })
    }
  }
}

const setAddress = (data) => {
  isShowResults.value = false

  const coords = data.coords

  form.address = data.address
  form.coords = coords

  isSelectedResultAddress.value = true;

  emits('setDeliveryCoords', coords)
}

const searchByCoords = async (coords) => {
  if (ymaps) {
    const search = await ymaps.geocode(coords)
    const obj = search.geoObjects.get(0)

    // $data.country = geo_obj.getCountry();
    // $data.city = geo_obj.getLocalities();
    // $data.street = geo_obj.getThoroughfare();
    // $data.premice = geo_obj.getPremise();
    // $data.AddressLine = geo_obj.getAddressLine();

    // рабочая тема
    const geocoderMetaData = obj.properties.get('metaDataProperty').GeocoderMetaData;
    const addressComponents = geocoderMetaData.Address.Components;

    let region = '';

    addressComponents.forEach(component => {
        if (component.kind === 'province') {
          region = component.name;
        }
    });

    form.address = obj.getAddressLine();
    form.country = obj.getCountry();
    form.city = obj.getLocalities();
    form.province = region;
    form.shortAddress = obj.properties.get('name');
    form.coords = coords;

    isSelectedResultAddress.value = true;
  }
}

const submitNoAuth = () => {
  userStore.setDeliveryForm(form)

  const obj = {
    ...form,
    name: '',
    warehouse_id: condition.value.warehouse_id,
    zone: condition.value
  }

  if (useChangeLocation('delivery', obj)) {
    emits('close')
  }
}

const submitAuth = () => {
  // if(!addressId.value)
  //   addressId.value = 0;

  //if (addressId.value !== null)
  {
    const addresses = userStore.addresses
    const newId = addresses[addresses.length - 1]?.id || null

    userStore.addAddress({
      id: newId ? newId + 1 : 0,
      ...form,
    })
  }
  //emits('close')
}

const selectAddress = (item) => {
  emits('setDeliveryCoords', item.coords)

  nextTick(() => {
    const obj = {
      ...item,
      warehouse_id: condition.value.warehouse_id,
      zone: condition.value
    }

    userStore.setDeliveryForm(obj)

    let requestBody = {
      coordinates: form.coords.map(String),
      short_address: form.shortAddress,
      country: form.country,
      city: form.city,
      street: form.shortAddress,
      apartment: form.flat,
      floor: form.floor,
      entrance: form.entrance,
      AddressLine: form.address,
      StockId: obj.warehouse_id.toLocaleString(),
      zoneId: obj.zone.zone,
      default: '',
    }

    if (useChangeLocation('delivery', obj)) {
      userStore.addAddressToDB(config, requestBody);
      emits('close')
    }
  })
}

const setDefault = () => {
  if (userStore.deliveryForm) {
    for (const key in userStore.deliveryForm) {
      form[key] = userStore.deliveryForm[key]
    }

    ymaps.ready(() => {
      setTimeout(() => {
        emits('setDeliveryCoords', form.coords)
      }, 1000)
    })
  }
}

setDefault()
</script>

<style lang="scss" scoped>
.modal-receipt-delivery {
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 30px;

  &__main {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__location {
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

  &__footer {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding-top: 4px;

    border-top: 1px solid var(--grayText2);
  }

  &__button {
    width: 100%;
    font-weight: 500;
  }
}

.modal-receipt-delivery-form {
  display: flex;
  flex-direction: column;
  grid-gap: 14px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include text_small;
    font-weight: 500;
  }

  &__label {
    color: var(--grayText);
  }

  &__navigate {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    cursor: pointer;

    .ui-icon {
      width: 18px;
      height: 18px;

      :deep svg path {
        fill: var(--orange);
      }
    }
  }

  &__lines {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    font-weight: 500;
  }

  &__line {
    &--cols  {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 18px;
    }
  }

  &__textarea {
    :deep textarea {
      height: 80px;
    }
  }
}

.modal-receipt-delivery-form-input {
  position: relative;
  width: 100%;

  &__area {
    width: 100%;
    height: 48px;

    padding: 12px 16px;

    @include text_normal;
    font-weight: 500;

    background: var(--grayBg);
    border: 1px solid var(--grayBg);
    border-radius: 14px;

    &::-webkit-input-placeholder {
      color: var(--grayText);
    }
    &:-moz-placeholder {
      color: var(--grayText);
      opacity:  1;
    }
    &::-moz-placeholder {
      color: var(--grayText);
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: var(--grayText);
    }
    &::-ms-input-placeholder {
      color: var(--grayText);
    }
    &::placeholder {
      color: var(--grayText);
    }

    &--error {
      border-color: var(--red);
    }
  }

  &__error {
    padding: 4px 0 0 16px;

    @include text_small;
    font-weight: 500;
    color: var(--red);
  }
}

.modal-receipt-delivery-form-results {
  position: absolute;
  z-index: 999;
  top: 48px;
  left: 0;
  right: 0;

  max-height: 250px;

  display: flex;
  flex-direction: column;

  background: var(--grayBg);
  border-radius: 0 0 14px 14px;

  overflow-y: auto;
  overflow-x: hidden;

  &__item {
    padding: 5px 10px;

    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background: var(--grayText);
    }
  }
}

.modal-receipt-addresses {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 20px;

  &__main {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    overflow: hidden;
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    overflow-y: auto;

    @include custom-scrollbar;
  }

  &__empty {
    @include text_normal;
    font-weight: 600;
    color: var(--grayText);
  }

  &__footer {
    flex: 0 0 auto;
  }

  &__button {
    width: 100%;
    font-weight: 500;
  }
}

.modal-receipt-addresses-item {
  display: grid;
  align-items: center;
  grid-template-columns: 40px 1fr;
  grid-gap: 16px;

  cursor: pointer;

  &--active {
    //.modal-receipt-addresses-item__block{
    //   border-color: red!important;
    //}
    .modal-receipt-addresses-item {
      &__icon {
        :deep(.ui-icon) svg path {
          fill: #383838;
        }
      }

      &__block {
        border-color: var(--yellowDark);
      }

      &__edit {
        :deep(.ui-icon) svg path {
          fill: var(--blackText3);
        }
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
  }

  &__block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 12px;

    padding: 12px 0;

    border-bottom: 1px solid var(--grayText2);
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
  }

  &__name {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__address {
    @include overflow-text;
    @include text_small;
    font-weight: 500;
    color: var(--grayText);
  }
}
</style>