<template>
  <div id="yandex-map" />
</template>

<script setup lang="ts">
const commonStore = useCommonStore()
const { pickupLocations } = storeToRefs(commonStore)

const props = defineProps({
  deliveryType: {
    type: String,
    default: 'delivery',
  },
  currentAddress: {
    type: undefined,
    default: null,
  },
  deliveryCoords: {
    type: Array,
    default: null,
  },
})

const emits = defineEmits(['update', 'setDeliveryCoords', 'setDeliveryZone'])

const map = shallowRef(null)
const collection = shallowRef(null)
const mapZoom = 12
const deliveryMarker = shallowRef(null)
const currentMarker = ref(null)

const mapCenter = computed(() => commonStore.mapCenter)
const zones = computed(() => commonStore.zones)
const dot_map_init = computed(() => commonStore.dot_map_init)

const positionPlane = computed(() => commonStore.isMobileOrTablet 
  ? { bottom: 200, right: 20 } 
  : { bottom: 50, right: 60 }
)

watch(() => props.deliveryType, () => {
  if (props.deliveryType !== 'delivery') {
    const element = document.querySelector('.ymaps-2-1-79-controls__control');
    element.style.display = 'none';
  }
  else {
    const element = document.querySelector('.ymaps-2-1-79-controls__control');
    element.style.display = 'block';
  }

  setMarkers()
})

watch(() => props.currentAddress, (data) => {
  if (data) {
    goToMarker(data)
  } else {
    setCenter('pickup')
  }
})

watch(() => props.deliveryCoords, (data) => {
  if (data) {
    console.log('here');
    deliveryMarker.value.geometry.setCoordinates(data)
    map.value.setCenter(data, 16, { duration: 1000 })

    collection.value.each(item => {
      if (!item.geometry || item?.geometry?.getType() == 'Point') return

      if (item.geometry.contains(data)) {
        const zone = item.options.get('iconImageHref')
        emits('setDeliveryZone', zone)
      }
    })
  }
})

const onMapClick = (e, zone) => {
  if (props.deliveryType === 'delivery') {
    const coords = e.get('coords')
    deliveryMarker.value.geometry.setCoordinates(coords)
    emits('setDeliveryCoords', coords)
    emits('setDeliveryZone', zone)
  }
}

const goToMarker = (item) => {
  map.value.setCenter(item.coordinates, 17, { duration: 400 })
}

const setMarkers = () => {
  map.value.geoObjects.removeAll()

  if (props.deliveryType === 'delivery') {
    collection.value = new ymaps.GeoObjectCollection({})

    zones.value.forEach(item => {
      const polygon = new ymaps.GeoObject({
        geometry: item.geometry,
      }, {
        ...item.options,
        iconImageHref: item.zone
      })

      polygon.events.add(['click'], (e) => {
        const zone = item.zone
        onMapClick(e, zone)
      })

      collection.value.add(polygon)
    })
    map.value.geoObjects.add(collection.value)

    const initialCoords = props.deliveryCoords || (mapCenter.value ? mapCenter.value : dot_map_init.value)

    deliveryMarker.value = new ymaps.Placemark(initialCoords, {
      balloonContent: 'Ваше местоположение'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/assets/img/marker-delivery.svg',
      iconImageSize: [50, 50],
      iconImageOffset: [-25, -45]
    })

    map.value.geoObjects.add(deliveryMarker.value)
    map.value.setCenter(initialCoords, 16)

    setCenter('delivery')
  } else if (props.deliveryType === 'pickup' || props.deliveryType === 'lounge') {
    pickupLocations.value(props.deliveryType).forEach(item => {
      const placemark = new ymaps.Placemark(item.coordinates, {}, {
        iconLayout: 'default#image',
        iconImageHref: '/assets/img/marker-pickup.svg',
        iconImageSize: [50, 50],
        iconImageOffset: [-25, -45]
      })
      placemark.events.add(['click'], () => {
        emits('update', item)
      })
      map.value.geoObjects.add(placemark)
    })

    setCenter('pickup')
  }
}

const setCenter = (type) => {
  if (type === 'pickup') {
    map.value.setBounds(map.value.geoObjects.getBounds(), { checkZoomRange: true })
  } else if (type === 'delivery') {
    map.value.setCenter(mapCenter.value ? mapCenter.value : dot_map_init.value, mapZoom)
  }
}

const ymapsInit = () => {
  ymaps.ready(() => {
    map.value = new ymaps.Map('yandex-map', {
      center: mapCenter.value ? mapCenter.value : dot_map_init.value,
      zoom: mapZoom,
      controls: ['zoomControl'],
    })

    map.value.events.add(['click'], (e) => {
      const zone = null
      onMapClick(e, zone)
    })

    setMarkers()

    const customGeolocationControl = createCustomGeolocationControl()
    map.value.controls.add(customGeolocationControl)

    nextTick(() => {
      if (props.deliveryType !== 'delivery') {
        const element = document.querySelector('.ymaps-2-1-79-controls__control')
        element.style.display = 'none'
      }
    })
  })
}

const createCustomGeolocationControl = () => {
  const control = new ymaps.control.Button({
    data: {
      image: '/assets/img/plane.jpg', // путь к вашей картинке
      title: 'Определить местоположение',
    },
    options: {
      layout: ymaps.templateLayoutFactory.createClass(`
        <div title="{{ data.title }}" style="
          width: 42px; 
          height: 42px; 
          cursor: pointer; 
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          border-radius: 50%;
        ">
          <div style="
            width: 36px;
            height: 36px;
            background-image: url({{ data.image }}); 
            background-size: cover;
            background-position: center; 
            background-repeat: no-repeat;
            border-radius: 50%;
          "></div>
        </div>
      `),
      maxWidth: [42, 42, 42],
      position: positionPlane.value
    },
  })

  control.events.add('click', () => {
    ymaps.geolocation.get().then((result) => {
      const userCoordinates = result.geoObjects.get(0).geometry.getCoordinates()

      // Добавление маркера в местоположение пользователя
      if (deliveryMarker.value) {
        deliveryMarker.value.geometry.setCoordinates(userCoordinates)
      } else {
        deliveryMarker.value = new ymaps.Placemark(userCoordinates, {
          balloonContent: 'Ваше местоположение'
        }, {
          iconLayout: 'default#image',
          iconImageHref: '/assets/img/marker-delivery.svg',
          iconImageSize: [50, 50],
          iconImageOffset: [-25, -45]
        })
        map.value.geoObjects.add(deliveryMarker.value)
      }

      // Передача координат куда-то, например, в родительский компонент
      emits('setDeliveryCoords', userCoordinates)

      // Проверка принадлежности зоны
      collection.value.each((item) => {
        if (!item.geometry || item.geometry.getType() === 'Point') return

        if (item.geometry.contains(userCoordinates)) {
          const zone = item.options.get('iconImageHref')
          emits('setDeliveryZone', zone)
        }
      })

      map.value.setCenter(userCoordinates, 16) // 16 - уровень масштабирования
    })
  })

  return control
}

ymapsInit()
</script>

<style lang="scss" scoped>
.modal-receipt-map {
  width: 100%;
  height: 100%;

  border-radius: 0 40px 40px 0;
  overflow: hidden;
}

.modal-receipt-map-popup {
  position: absolute;

  left: 0;
  top: calc(100% + 8px);

  width: 260px;

  display: grid;
  grid-gap: 6px;

  padding: 10px 25px;

  background: var(--white);
  border-radius: 20px;

  &__title {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
    color: var(--black);
  }

  &__address {
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