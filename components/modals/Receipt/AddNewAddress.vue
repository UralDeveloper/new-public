<template>
  <div class="add-new-address">
    <div class="add-new-address__header">
      <button
        type="button"
        class="add-new-address__back"
        @click.prevent="back()"
      >
        <UIIcon name="arrow" />
      </button>

      <p class="add-new-address__title">
        Добавьте новый адрес
      </p>
    </div>

    <div class="add-new-address__main">
      <div class="add-new-address__block">
        <div class="add-new-address__line">
          <label
            for="new_address"
            class="add-new-address__label"
          >
            Город, улица, дом
          </label>
          <div class="add-new-address-input">
            <input
              id="new_address"
              v-model="form.address"
              type="text"
              placeholder="Адрес"
              :class="[
                'add-new-address-input__area',
                {
                  'add-new-address-input__area--error' : addressError
                }
              ]"
              @input="searchAddress"
            >
            <span
              v-if="addressError"
              class="add-new-address-input__error"
            >
              Ваш адрес вне зоны доставки
            </span>

            <div
              v-if="isShowResults && results.length"
              class="add-new-address-results"
            >
              <div
                v-for="(item, i) in results"
                :key="i"
                class="add-new-address-results__item"
                @click="setAddress(item)"
              >
                {{ item.address }}
              </div>
            </div>
          </div>
        </div>

        <div class="add-new-address__lines">
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

        <div class="add-new-address__line">
          <UITextarea
            v-model="form.comment"
            placeholder="Комментарий курьеру"
            color="gray"
            class="add-new-address__textarea"
          />
        </div>
      </div>

      <div class="add-new-address__block">
        <div class="add-new-address__line">
          <label
            for="new_address"
            class="add-new-address__label"
          >
            Укажите название адреса
          </label>
          <UIInput
            v-model="form.name"
            placeholder="Название адреса"
            color="gray"
          />
        </div>
      </div>
    </div>

    <div class="add-new-address__footer">
      <ModalsReceiptDeliveryInfo
        :is-error="addressError"
        :condition="condition"
      />

      <UIButton
        color="yellow"
        class="add-new-address__button"
        :disabled="isButtonDisabled"
        :is-loading="isLoading"
        @click="submit()"
      >
        {{ addressId && addressId.value !== null ? 'Изменить' : 'Сохранить' }}
      </UIButton>
    </div>
  </div>
</template>

<script setup>

const userStore = useUserStore()
const commonStore = useCommonStore()

const config = useRuntimeConfig();

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

const emits = defineEmits(['setDeliveryCoords', 'close'])

const form = reactive({
  address: '',
  flat: '',
  entrance: '',
  floor: '',
  number: '',
  comment: '',
  name: '',
  coords: null,
  city: '',
  shortAddress: '',
  country: '',
  province: '',
})
const results = ref([])
const isShowResults = ref(false)
const isLoading = ref(false)

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
const back = () => {
  commonStore.toggleNewAddress(false)
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

const submit = () => {
  const addresses = userStore.addresses

  if (addressId.value !== null) {
    userStore.editAddress({
      id: addressId.value,
      ...form,
    })
  } else {

    const newId = typeof(addresses[addresses.length - 1]?.id) !== "undefined" ? addresses[addresses.length - 1]?.id : null
    userStore.addAddress({
      id: newId !==null ? newId + 1 : 0,
      ...form,
    })
  }

  //делаем адрес активным
  if(typeof( addresses[addresses.length - 1])!== "undefined")
    selectAddress(addresses[addresses.length - 1]);

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
  console.log('****', addresses.value)
  if (addressId.value !== null && addresses.value.length) {
    const isset = addresses.value.find(item => item.id === addressId.value)

    if (isset) {
      for (let key in form) {
        form[key] = isset[key]
      }

      ymaps.ready(() => {
        setTimeout(() => {
          emits('setDeliveryCoords', isset.coords)
        }, 1000)
      })
    }
  }
}

setDefault()
</script>

<style lang="scss" scoped>
.add-new-address {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 30px;

  padding: 30px 60px;

  &__header {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    grid-gap: 10px;
  }

  &__back {
    transform: rotate(180deg);
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__main {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 30px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }

  &__line {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }

  &__lines {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 18px;
  }

  &__label {
    @include text_small;
    font-weight: 500;
    color: var(--grayText);
  }

  &__textarea {
    font-weight: 500;

    ::v-deep textarea {
      height: 80px;
    }
  }

  &__footer {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding-top: 4px;

    border-top: 1px solid var(--grayText2);
  }

  &__button {
    font-weight: 500;
  }
}

.add-new-address-input {
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

.add-new-address-results {
  position: absolute;
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
</style>