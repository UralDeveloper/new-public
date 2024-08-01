import trimStr from '@/utils/trimStr'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    menuWidth: 0,
    scrollPosition: 0,
    isMobileOrTablet: false,
    isTablet: false,
    city: null,
    deliveryType: null, // 'pickup' | 'delivery' | 'lounge' | null
    popupType: null, // product | blog | category | url
    deliveryTime: null,
    deliveryTypes: [], // [{ label: '', type: '' }, ...,]
    footerInfoblock: null,

    // deliveryLocations: [],
    // pickupLocations: [],
    locations: null,
    mapCenter: null, // null | [] - точка центра карты
    conditions: [], // точки доставки
    zones: [], // зоны доставки
    dot_map_init: [], //центр карты
    pickups: [], // точки самовывоза
    lounges: [],
    selectedLocation: null, // выбранная локация
    contacts: [], //Контакты
    deliveryTimes: [], //время работы складов
    availableDeliveryTime: [], //доступное время работы
    deliveryTimeList: [], //доступное время работы
    disable_ordering: [], //склады где отключены заказы

    shipping_methods: [],

    isShowMobileMenu: false,
    isShowReceiptModal: false,
    newAddress: false, // false - hidden, null - visible and empty, { id } - visible and find address by id
    isShowAuthModal: false,
    isShowSettingsModal: false,
    isShowAcceptCityModal: false,
    isShowDeliveryTypeModal: false,
    isShowPopupModal: false,
    isShowAcceptModal: false,
    isShowFiltersModal: false,
    isShowOrderModal: false,
    isShowRateModal: false,
    isShowCategoriesModal: false,
    promoSettings: null,
    missedProductsModal: null, // null | { type, location }
    fragmentedCatalog: null,
    single_stock_mode: null,
    single_stock_id: null,

    colors: null,

    events: null,

    pending_order_cansel_time: null,

    activeProductModalSlide: 0,

    notifications: [],
    popups: [], // попапы
    oneTimePopups: null,
    shownOneTimePopups: null,
    slides: [], //Слайдер Баннеров
    slidesGallery: [], //Баннеры по складам
    slidesGallery1: [], // galery_1
    slidesGallery2: [], // galery_2
    categoriesMenuTitle: '',

    logoFabrics: [], //набор логотипов и фавиконов
    allSettings: [], //все настройки
    appSettings: [], //настройки приложения
    titleDescription: [], //набор title, descriptions
    menu: [], //набор title, descriptions
    facade: null,
    payment_methods: [],
    templates: {
      catalog_type: 'lending'
    },

    robot: null,
  }),

  actions: {
    async loadSettings ()  {
      console.log('Loading settings');

      const { data } = await useLazyAsyncData('data', () => $fetch('/api/wp-json/v1/all_settings'))
      const obj = data?.value || []
      watch(data, (newCount) => {
        // Because count might start out null, you won't have access
        // to its contents immediately, but you can watch it.
        console.log('---',data);
      })

      this.allSettings = obj

      this.logoFabrics = this.allSettings.logo
      this.titleDescription = this.allSettings?.seo
      this.robot = this.allSettings?.robots ? '' : 'noindex, nofollow'
      this.locations = this.allSettings?.locations || null;
      this.facade = this.allSettings?.facade
      this.colors = this.facade?.colors || null;
      this.appSettings = this.allSettings?.settings
      this.shipping_methods = this.allSettings?.shipping_methods || [],
      this.popups = this.allSettings?.popups
      this.disable_ordering = this.allSettings?.settings.app?.disable_ordering || [];
      this.payment_methods = this.allSettings?.payment_methods.filter(item => item.enabled)
      this.footerInfoblock = this.allSettings?.facade.footer_infoblock ?? null;
      this.fragmentedCatalog = this.allSettings?.settings.fragmented_stosks_json ?? null;
      this.single_stock_mode = this.allSettings?.settings.single_stock_mode ?? null;
      this.single_stock_id = this.allSettings?.settings.single_stock_id ?? null;
      this.map_self_position_icon = this.allSettings?.map?.map_self_position_icon ?? null;
      this.pending_order_cansel_time = this.allSettings?.settings?.pending_order_cansel_time ?? (60 * 30);

      console.log('Loading settings finished');
    },

    async getLogo ()  {
      //  const { data } = await useLazyAsyncData('logo', () => $fetch('/api/wp-json/v1/logo'))
      //  const obj = data?.value || []
      this.logoFabrics = this.allSettings.logo
    },

    async getMenu ()  {
      this.menu = this.allSettings.menu
    },

    async getPickups () {
      //const { data } = await useLazyAsyncData('methods', () => $fetch('/api/wp-json/systeminfo/v1/shipping_methods'))
      //const array = data?.value || []
      const array = this.allSettings?.shipping_methods || []
      this.deliveryTypes = []

      if (array.length) {
        array.forEach((item, i) => {
          if (item.id === 'flat_rate') {
            this.deliveryTypes.push({
              label: item.name,
              type: 'delivery'
            })
          } else if (item.id === 'local_pickup') {
            const pickups = item.pickup_locations

            if (pickups.length) {
              this.pickups = pickups
              this.deliveryTypes.push({
                label: item.name,
                type: 'pickup'
              })
            }
          } else if (item.id === 'wcso_booking') {
            const restaurants = item.restaurants

            if (restaurants.length) {
              this.lounges = restaurants
              this.deliveryTypes.push({
                label: item.name,
                type: 'lounge'
              })
            }
          }
        })
      }
    },

    async getDelivery () {
      // const data = await Promise.allSettled([
      //   useLazyAsyncData('delivery', () => $fetch('/api/wp-json/systeminfo/v1/delivery')),
      //   useLazyAsyncData('map', () => $fetch('/api/wp-json/system/map'))
      // ])
      //
      // const delivery = data[0]?.value?.data?.value || null
      // const zones = data[1]?.value?.data?.value || null

      const delivery = this.allSettings.delivery || null
      const zones = this.allSettings.map || null

      if (delivery) {
        this.conditions = delivery?.conditions || []
        //центр карты
        this.dot_map_init = delivery.dot_map_init.split(' ,')
        if(this.dot_map_init.length<2)
          this.dot_map_init = delivery.dot_map_init.split(',')
        if(this.dot_map_init.length<2)
          this.dot_map_init = delivery.dot_map_init.split(' ,')

        this.dot_map_init = [ this.dot_map_init[1], this.dot_map_init[0] ]

      }else {

      }

      if (zones) {
        const features = zones?.features || []

        this.zones = features.map(item => {
          if (item.geometry.type !== 'Polygon') {
            return false
          }
          //test
          //Расчет стоимости по дистации
          // if (item.geometry.type === 'Point' || item.geometry.type === 'Polygon') {
          //   //TODO fix map crash
          //   this.mapCenter = item.geometry.coordinates
          //   return false
          // }

          const options = {
            fillColor: item.properties.fill,
            fillOpacity: item.properties['fill-opacity'],
            strokeColor: item.properties.stroke,
            strokeOpacity: item.properties['stroke-opacity'],
            strokeWidth: item.properties['stroke-width'],
          }

          const zone = item.properties.description.split('#cid=')

          return {
            id: item.id.toString(),
            geometry: item.geometry,
            options,
            zone: zone && zone[1] || '',
          }
        })
        console.log("yes zones! \n")
        // console.log("zones arr: ",this.zones)
      }
      else {
        console.log("\not zones!\n")
      }
    },

    async getEvents () {
      const { data } = await useLazyAsyncData('events', () => $fetch('/api/wp-json/wp/v2/posts?_embed&categories=234'))

      const obj = data?.value || []

      if (obj) {
        this.events = obj;
      }
    },

    async getDeliveryTimes () {
      const obj = this.allSettings.delivery_work_time || []
      this.deliveryTimes = obj
    },


    async getBanners () {
      if(this.allSettings.banners){//баннеры из общего запроса
        const obj = this.allSettings?.banners || [];
        if (obj?.length)
        {
          //Banners
          this.slides = this.setSlides('desctop_slider', obj);

          //BannersGallery
          this.slidesGallery = this.setSlides('gallery', obj);

          this.slidesGallery1 = this.setSlides('gallery_1', obj);

          this.slidesGallery2 = this.setSlides('gallery_2', obj);
        }
      }
      else//баннеры из своего запроса
      {
        const {data} = await useLazyAsyncData('banners', () => $fetch('/api/banners-json'))
        const obj = data?.value || []
        if (obj?.length)
        {
          //Banners
          this.slides = this.setSlides('desctop_slider', obj);

          //BannersGallery
          this.slidesGallery = this.setSlides('gallery', obj);

          this.slidesGallery1 = this.setSlides('gallery_1', obj);
          
          this.slidesGallery2 = this.setSlides('gallery_2', obj);
        }
      }


    },
    
    // async getBannersGallery () {
    //   const { data } = await useLazyAsyncData('banners', () => $fetch('/api/banners-json'))
    //   const obj = data?.value || []
    //   if (obj.length) {
    //     this.slidesGallery = obj.filter(item => item.gallery === 'gallery')
    //   }
    // },

    async getTemplates() {
      try {
        const { data } = await useFetch('/api/wp-json/front/settings')
        this.templates = data.value

      } catch (error) {
        console.log(error);
      };
    },

    async getContacts () {
      // const { data } = await useLazyAsyncData('phone', () => $fetch('/api/wp-json/systeminfo/v1/contacts/all'))
      // const obj = data?.value || []
      const obj = this.allSettings.contacts
      if (obj) {
        this.contacts = obj
      }
    },

    async getPost(slug, config) {
      // const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wp/v2/posts?slug=${slug}`, {
      //   method: 'GET',
      // })
      try {
        const {data} = await useAsyncData(() => $fetch(`/api/wp-json/wp/v2/posts?slug=${slug}`))

        return data;

      } catch  (error)  {
        console.error(error);
      }
      
    },

    async getInfoPage(slug, config) {
      // const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`, {
      //   method: 'GET',
      // })

      try {
        const {data} = await useAsyncData( () => $fetch(`/api/wp-json/wp/v2/pages?slug=${slug}`))
        
        return data;

      } catch (error)  {
        console.error(error);
      }          
    },

/*
*     async getPost(slug, config) {
      const { data } = await useLazyAsyncData('data', () => $fetch(`/api/wp-json/wp/v2/posts?slug=${slug}`))
      // const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wp/v2/posts?slug=${slug}`, {
      //   method: 'GET',
      // })

      return data;
    },

    async getInfoPage(slug, config) {
      // const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`, {
      //   method: 'GET',
      // })
      const { data } = await useLazyAsyncData('data', () => $fetch(`/api/wp-json/wp/v2/pages?slug=${slug}`))

      return data;
    },
* */

    // TODO fix it
    async getInfoTitle () {
      // const { data } = await useLazyAsyncData('title', () => $fetch('/api/wp-json/'))
      // const obj = data?.value || []
      // if (obj) {
      //   this.titleDescription = obj
      // }
      this.titleDescription = this.allSettings?.seo
    },

    async loadDeliveryTime (config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/checkout/avaible_time?stock_id=${this.selectedLocation.warehouse_id}&shipping_method=${this.deliveryType}${this.deliveryType === 'delivery' ? ('&zone=' + this.selectedLocation.zone.zone) : ''}`)
      let times = data?.value || [];
      if(times) {
        // this.setAvailableDeliveryTime(times);
        // // console.error(data?.value?.start_list);
        // // console.error((data?.value?.start_list ||  []));
        // console.error(times.start_list);
        // this.setDeliveryTimeList(times.start_list);

        this.availableDeliveryTime = times;
        this.deliveryTimeList = times.start_list;

      }
    },
    addNotification (value) {
      this.notifications.push(value)

      setTimeout(() => {
        this.notifications.splice(0, 1)
      }, 2000)
    },

    setSlides(galleryType, obj) {      
      let slides = obj.filter(item => item.gallery === galleryType);

      slides = slides.map(item => {
        let link = '';

        switch (item.type) {
          case 'url':
            link = item?.url ? item?.url : '';
            break;
          case 'product':
            link = item?.product ? '/?product_id=' + item?.product : '';
            break;
          case 'category':
            link = item?.category ? '/catalog/' + item?.category : '';
            break;
          case 'text':
            link = '/information/post/' + item?.post?.post_slug;
            break;
          default:
            break;
        }

        item.link = link;
        return item;
      });

      return slides.filter(
        slide => ((!this.selectedLocation?.value?.warehouse_id && slide.skladall)
        || (slide.sklad.includes(this.selectedLocation?.value?.warehouse_id)))
        && slide.device.includes('site')
      );
    },

    setDeliveryType (value) {
      this.deliveryType = value
    },

    setPopupType (value) {
      this.popupType = value;
    },

    setLocation(value) {
      this.selectedLocation = value;
      if (this.oneTimePopups) return;
      this.oneTimePopups = this.allSettings?.popups?.filter(popup => popup.repeat_mode === "one-off")
    },

    setDeliveryTime (value) {
      this.deliveryTime = value
    },
    setAvailableDeliveryTime (value) {
      this.availableDeliveryTime = value
    },
    setDeliveryTimeList (value) {
      this.deliveryTimeList = value
    },
    toggleShowReceiptModal (value) {
      this.isShowReceiptModal = value
    },

    toggleNewAddress (value) {
      this.newAddress = value
    },

    toggleShowMobileMenu (value) {
      this.isShowMobileMenu = value;
    },

    toggleShowAuthModal (value) {
      this.isShowAuthModal = value
    },

    toggleShowSettingsModal (value) {
      this.isShowSettingsModal = value
    },

    toggleShowAcceptCityModal (value) {
      this.isShowAcceptCityModal = value
    },

    toggleShowDeliveryTypeModal (value) {
      this.isShowDeliveryTypeModal = value
    },

    toggleShowAcceptModal (value) {
      this.isShowAcceptModal = value
    },

    toggleShowPopupModal (value) {
      if (this.selectedLocation) {
        this.isShowPopupModal = value;
      }
    },

    toggleShowFiltersModal (value) {
      this.isShowFiltersModal = value;
    },

    toggleShowOrderModal (value) {
      this.isShowOrderModal = value;
    },

    toggleShowRateModal (value) {
      this.isShowRateModal = value;
    },

    toggleShowCategoriesModal (value) {
      this.isShowCategoriesModal = value;
    },

    setMissedProductsModal (value) {
      this.missedProductsModal = value
    },
    setPromoSettings (value) {
      this.promoSettings = value
    },
    setIsMobileOrTablet (value){
      this.isMobileOrTablet = value
    },
    containsElements (value) {
      if (value) {
        return value;
      }
      else {
        return null;
      }
    }
  },

  getters: {
    pageTitle: state => route => {
      switch (route.fullPath) {
        case '/order':
          return 'Оформление заказа'
        case '/lk':
          return 'Личная информация'
        case '/lk/favorite':
          return 'Избранное'
        case '/lk/promocodes':
          return 'Мои промокоды'
        case '/lk/bonuses':
          return 'Бонусная система'
        case '/lk/referals':
          return 'Реферальная система'
        case '/lk/preferences':
          return 'Предпочтения'
        case '/lk/orders':
          return 'История заказов'
        case '/lk/game':
          return 'Колесо фортуны'
        case '/lk/notifications':
          return 'История уведомлений'
        default:
          return ''
      }
    },

    getCurrentLocationCatalog: (state) => {
      return state.locations.find(location => 
        location.term_id === state.selectedLocation.warehouse_id
      );
    },

    getAvailableDeliveryTime: (state) => {
      return state.availableDeliveryTime
    },
    getDeliveryTime: (state) => {
      return state.deliveryTime
    },
    getDeliveryTimeList: (state) => {
      return state.deliveryTimeList
    },
    pickupLocations: (state) => {
      return (type) => {
        let arr = null
        if (type === 'pickup') {
          arr = state.pickups
        } else if (type === 'lounge') {
          arr = state.lounges
        }

        if (!!arr) {
          return arr.map(item => {
            //console.log(item);
            return {
              ...item,
              id: item.id.toString(),
              coordinates: trimStr(item.coord).split(',').reverse().map(item => item * 1)
            }
          })
        }
        return []
      }
    },
    getFacade: (state) => {
      return state.facade
    },
    getWorkTime: (state) => {

      const deliveryTimes = state.deliveryTimes?.delivery
      const currentDayIndex = new Date(-1).getDay();
      if(typeof(deliveryTimes) == 'undefined' || typeof(state.selectedLocation) == 'undefined')
        return '';

      if (state.selectedLocation) {
        const DelivStockWeekTimes =  deliveryTimes[state.selectedLocation?.warehouse_id]
        const around_clock = DelivStockWeekTimes?.around_clock
        const dats = DelivStockWeekTimes?.week ? DelivStockWeekTimes?.week[currentDayIndex] : null
        if(typeof(dats) == 'undefined' )
          return '';
        const workTime = around_clock ? 'Круглосуточно' : `c ${dats?.from} до ${dats?.to}`
  
        return workTime
      }
      else {
        return null;
      }
    },
    
    getPopupsInCurrentLocation: (state) => {
      let popups = [];    
      
      if (state.deliveryType == 'delivery') { // если доставка
        popups = state.popups.filter((popup) => 
        popup.sklad.includes(state.selectedLocation?.zone.sklad) &&
        popup.disable_ordering === false
        );
      }
      else if (state.deliveryType == 'pickup') { // если самовывоз
        popups = state.popups.filter((popup) => 
        popup.sklad.includes(state.selectedLocation?.warehouse_id) &&
        popup.disable_ordering === false
        );
      }
      
      // popups = state.popups.filter(popup => popup.disable_ordering === false); //for tests
      return state.containsElements(popups);
    },

    getOneTimePopups: (state) => {
      let popups = [];

      popups = state.popups.filter(popup => popup.repeat_mode === 'one-off');

      return state.containsElements(popups);
    },

    getShownOneTimePopups: (state) => {
      if(!state.oneTimePopups)
        return [];
      let shownOneTimePopups = state.oneTimePopups.filter(popup => popup.repeatable === true);

      return state.containsElements(shownOneTimePopups);
    },

    getOrderDisability: (state) => {
      return state.disable_ordering?.includes(state.selectedLocation?.warehouse_id);
    },

    getDisablePopup: (state) => {
      let temp = state.popups.find(popup => popup.disable_ordering === true)

      return state.containsElements(temp);
    },

    getPaymentMethods: (state) => {

      //фильтруем оплаты по типу доставки
      const shippingTypes = {
        "lounge": "restaurants",
        "pickup": "local_pickup",
        "delivery": "flat_rate",
      }
      const delivery_code = shippingTypes[state.deliveryType]
      let payments = state.payment_methods.filter(item => item.shipping_methods.includes(delivery_code) )

      //Фильтруем методы доставки по текущему складу
      if(state.appSettings?.payment?.payments_filtered_by_location){
        return payments.filter( item => item.warehouse_ids?.includes(state.selectedLocation.warehouse_id) )
      }

      return payments
    },

    getIsMobileOrTablet: (state) => {
      return state.isMobileOrTablet
    },

    getPhone: (state) => {
      if(!state.contacts)
        return '';

      let stock_phone = state.contacts?.phones?.find(item => item?.warehouse_id === state.selectedLocation?.warehouse_id);

      return  stock_phone ? stock_phone.phone : state.contacts.phone
    },
  },

  persist: {
    storage: persistedState.localStorage,
    paths: ['deliveryType', 'selectedLocation', 'promoSettings', 'oneTimePopups', 'fragmentedCatalog']
  },
})
