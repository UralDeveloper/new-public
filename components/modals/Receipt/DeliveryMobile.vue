<template>
  <CommonBottomSheet :isModalMap="true">
    <form v-if="(!isAuth || !addresses.length) && !addingAddress" class="modal-receipt-delivery-mobile-form"
      @submit.prevent="isAuth ? submitAuth() :submitNoAuth()">
      <label for="address" class="modal-receipt-delivery-mobile-form__label">
        Город, улица, дом
      </label>
      <div class="modal-receipt-delivery-mobile-form__line">
        <div class="modal-receipt-delivery-mobile-form-input">
          <input id="address" v-model="form.address" type="text" placeholder="Адрес" :class="[
    'modal-receipt-delivery-mobile-form-input__area',
    {
      'modal-receipt-delivery-mobile-form-input__area--error': addressError,
      'modal-receipt-delivery-mobile-form-input__area--opened': isShowResults && results.length
    }
  ]" @input="searchAddress" autocomplete="off">
          <span v-if="addressError" class="modal-receipt-delivery-mobile-form-input__error">
            Ваш адрес вне зоны доставки
          </span>

          <div v-if="isShowResults && results.length" class="modal-receipt-delivery-mobile-form-results">
            <div v-for="(item, i) in results" :key="i" class="modal-receipt-delivery-mobile-form-results__item"
              @click="setAddress(item)">
              {{ item.address }}
            </div>
          </div>
        </div>
      </div>
      <div class="modal-receipt-delivery-mobile-form__line modal-receipt-delivery-mobile-form__line--cols">
        <UIInput v-model="form.flat" placeholder="Кв/офис" color="gray" />
        <UIInput v-model="form.entrance" placeholder="Подъезд" color="gray" />
        <UIInput v-model="form.floor" placeholder="Этаж" color="gray" />
        <UIInput v-model="form.number" placeholder="Домофон" color="gray" />
      </div>
      <div class="modal-receipt-delivery-mobile-form__line">
        <UITextarea v-model="form.comment" placeholder="Комментарий курьеру" color="gray"
          class="modal-receipt-delivery-mobile-form__textarea" />
      </div>
      <hr>
      <UIButton type="submit" :disabled="isButtonDisabled" color="yellow"
        class="modal-receipt-delivery-mobile-form__button">
        Подтвердить
      </UIButton>
    </form>
    <form v-else-if="isAuth && addingAddress" class="modal-receipt-delivery-mobile-form adding"
      @submit.prevent="isAuth ? submitAuth() :submitNoAuth()">
      <label for="address" class="modal-receipt-delivery-mobile-form__label">
        Город, улица, дом
      </label>
      <div class="modal-receipt-delivery-mobile-form__line">
        <div class="modal-receipt-delivery-mobile-form-input">
          <input id="address" v-model="form.address" type="text" placeholder="Адрес" :class="[
    'modal-receipt-delivery-mobile-form-input__area',
    {
      'modal-receipt-delivery-mobile-form-input__area--error': addressError,
      'modal-receipt-delivery-mobile-form-input__area--opened': isShowResults && results.length
    }
  ]" @input="searchAddress" autocomplete="off">
          <span v-if="addressError" class="modal-receipt-delivery-mobile-form-input__error">
            Ваш адрес вне зоны доставки
          </span>

          <div v-if="isShowResults && results.length" class="modal-receipt-delivery-mobile-form-results">
            <div v-for="(item, i) in results" :key="i" class="modal-receipt-delivery-mobile-form-results__item"
              @click="setAddress(item)">
              {{ item.address }}
            </div>
          </div>
        </div>
      </div>
      <div class="modal-receipt-delivery-mobile-form__line modal-receipt-delivery-mobile-form__line--cols">
        <UIInput v-model="form.flat" placeholder="Кв/офис" color="gray" />
        <UIInput v-model="form.entrance" placeholder="Подъезд" color="gray" />
        <UIInput v-model="form.floor" placeholder="Этаж" color="gray" />
        <UIInput v-model="form.number" placeholder="Домофон" color="gray" />
      </div>
      <div class="modal-receipt-delivery-mobile-form__line">
        <UITextarea v-model="form.comment" placeholder="Комментарий курьеру" color="gray"
          class="modal-receipt-delivery-mobile-form__textarea" />
      </div>
      <hr>
      <UIButton type="submit" :disabled="isButtonDisabled" color="yellow"
        class="modal-receipt-delivery-mobile-form__button">
        Подтвердить
      </UIButton>
    </form>
    <div v-else class="modal-receipt-addresses">
      <div class="modal-receipt-addresses__main">
        <p class="modal-receipt-addresses__title">
          Сохраненные адреса
        </p>

        <div v-if="addresses.length" class="modal-receipt-addresses__list">
          <div v-for="item in addresses" :key="item.id" :class="[
    'modal-receipt-addresses-item modal-receipt-addresses__item',
    {
      'modal-receipt-addresses-item--active': item.id === commonStore.selectedLocation?.id
    }
  ]" @click.prevent="selectAddress(item)">
            <div class="modal-receipt-addresses-item__icon">
              <UIIcon name="metka" />
            </div>
            <div class="modal-receipt-addresses-item__block">
              <div class="modal-receipt-addresses-item__content">
                <p v-if="item.name" class="modal-receipt-addresses-item__name">
                  {{ item.name }}
                </p>

                <p class="modal-receipt-addresses-item__address">
                  {{ item.address }}
                </p>
              </div>

              <button type="button" class="modal-receipt-addresses-item__edit"
                @click.prevent.stop="editAddress(item.id)">
                <UIIcon name="pencil" />
              </button>
            </div>
          </div>
        </div>
        <p v-else class="modal-receipt-addresses__empty">
          Нет добавленных адресов
        </p>
      </div>

      <div class="modal-receipt-addresses__footer">
        <UIButton color="yellow" class="modal-receipt-addresses__button" @click="addNewAddress()">
          <UIIcon name="add" />
          Добавить новый адрес
        </UIButton>
      </div>
    </div>
  </CommonBottomSheet>
</template>

<script setup>

const commonStore = useCommonStore()
const userStore = useUserStore()

const config = useRuntimeConfig();

const addingAddress = ref(false)

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
  addingAddress.value = true
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

    addingAddress.value = false;
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
.modal-receipt-delivery-mobile-form {
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  font-weight: 500;

  hr {
    margin: 0 -20px;
    border-color: var(--grayBg);
  }

  &__label {
    @include text_small;
    font-weight: 500;
    color: var(--grayText);
  }

  &__line {
    &--cols {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 8px;
    }

    ::v-deep input,
    ::v-deep textarea {
      @include text_mini;

      @include mq($bp-super-small) {
        @include text_normal;
      }
    }
  }

  &__textarea {
    ::v-deep textarea {
      height: 80px;
    }
  }

  &__button {
    font-weight: 500;
  }
}

.modal-receipt-delivery-mobile-form-input {
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
      opacity: 1;
    }

    &::-moz-placeholder {
      color: var(--grayText);
      opacity: 1;
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

    &--opened {
      border-radius: 14px 14px 0 0;
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

.modal-receipt-delivery-mobile-form-results {
  position: absolute;
  z-index: 999;
  top: 48px;
  left: 0;
  right: 0;

  max-height: 250px;

  display: flex;
  flex-direction: column;
  grid-gap: 5px;

  background: var(--grayBg);
  border-radius: 0 0 14px 14px;

  overflow-y: auto;
  overflow-x: hidden;

  &__item {
    padding: 10px 16px;

    white-space: nowrap;
    cursor: pointer;

    @include text_mini;
    font-weight: 500;

    @include mq($bp-super-small) {
      @include text_normal;
    }

    &:hover {
      background: var(--grayText);
    }
  }
}

.modal-receipt-addresses {
  height: 80vh;

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
        ::v-deep(.ui-icon) svg path {
          fill: #383838;
        }
      }

      &__block {
        border-color: var(--yellowDark);
      }

      &__edit {
        ::v-deep(.ui-icon) svg path {
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