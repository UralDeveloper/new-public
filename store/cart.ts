import {useCommonStore} from '@/store/common'
import {useUserStore} from '@/store/user'
import { useChooseDiscountStore } from '@/store/choose_discount'
import getDate from '@/utils/getDate'

interface Dictionary<Type> {
  [key: string]: Type;
}
interface State {
  cart: cartItem[]
  promocode: Promocode | null
  isShowCartModal: boolean
  discountBlock: DiscountBlock | null
  isShowDiscountBlock: boolean,
  discountProducts: discountProductType[]
  discountCount: number | null,
  bonusesApplied: number,
  appliedAutoCoupons: autoCouponItem[],
  defaultImages: Dictionary<string>
  isGetDiscountInProcess: boolean,
  needGetDiscountRestart: boolean,
  needOpenChooseDiscountModal: boolean,
  needApplyPromocode: boolean,
  timeout: boolean,
  onlyItemsPrice: number | null,
}
interface autoCouponItem {
  id: number
  name: string
  amount: number,
  discountType: string,
}
interface discountProductType {
  id: number | null,
  idx: number | null
}
interface cartItem {
  id: number
  name: string
  price: number
  regular_price: number
  image: string
  count: number
  countable: boolean
  measure_unit: string
  portion_nat_size: number
  add_to_basket_once: number
  supplements: Supplement[]
  variation_id: number | null
  variation_data: Variation[] | null
  locations: number[]
  free_limits: [] | null
  url: string | null
}

interface DiscountBlock {
  header: string,
  description: string,
  buttonColor: string,
  buttonText: string,
  image: string
}
interface Supplement {
  id: number
  name: string
  price: number
  count: number,
  image: string
}
interface Variation {
  attributes: Attribute
  description: string
  id: number
  image: string
  in_stock: boolean
  regular_price: number
  price: number
}
interface Attribute{
  id: number
  name: string
  option: string
}
interface Promocode {
  value: string
  type: string
  amount: number
}

export const useCartStore = defineStore('cartStore', {
  state: (): State => ({
    cart: [],
    promocode: null,
    isShowCartModal: false,
    discountBlock: null,
    isShowDiscountBlock: false,
    discountProducts: [],
    discountCount: null,
    bonusesApplied: 0,
    appliedAutoCoupons: [],
    defaultImages: {
      giftImg: '/images/gift_cart.jpg',
      promoPercent: '/images/icon-sale.svg',
      promoFixed: '/images/ruble.svg',
    },
    isGetDiscountInProcess: false,
    needGetDiscountRestart: false,
    needOpenChooseDiscountModal: false,
    needApplyPromocode: false,
    timeout: false,
    onlyItemsPrice: null,
  }),

  actions: {
    addToCart (item, isDiscount: boolean = false) {
      // console.log('+++++addToCart', item)
      // console.error('+++++addToCart', item.variations_data)
      const commonStore = useCommonStore()
      const discountStore = useChooseDiscountStore();
      // if (!commonStore.deliveryType) {
      //   commonStore.toggleShowDeliveryTypeModal(true)
      //   return false
      // } 
      if (!commonStore.selectedLocation) {
        commonStore.toggleShowReceiptModal(true)
        return false
      }

      this.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        regular_price: item.regular_price || item.price,
        image: item?.images ? item?.images[0] : null,
        count: 1,
        countable: item.countable,
        measure_unit: item.measure_unit,
        portion_nat_size: item.portion_nat_size,
        add_to_basket_once: item.add_to_basket_once || 1,
        supplements: item?.supplements || [],
        variation_id: +item?.variation_id || null,
        variation_data: item?.variations_data || null,
        locations: item?.locations?.map(item => item.id),
        free_limits: item?.free_limits || null,
        url: item?.url || null,
      })
      commonStore.addNotification({
        type: 'cart',
        text: 'Товар добавлен в корзину',
        status: 'success'
      })
      if (!isDiscount && discountStore.selectedDiscount?.length == 0) {
        this.lazyDiscounts()
      }
      else {
        this.getOnlyCoupons(true);
      }
    },

    async getDiscounts () {
      console.log('getDiscounts Start', this.isGetDiscountInProcess )
      //Чтобы избежать нескольких одновременных запросов
      if (this.isGetDiscountInProcess) {
        // if (! this.needGetDiscountRestart) {
        //   this.needGetDiscountRestart = true
        // }
        return
      }
      this.isGetDiscountInProcess = true

      const commonStore = useCommonStore()
      const commonStoreRefs = storeToRefs(commonStore)
      const userStore = useUserStore()
      //const userStoreRefs = storeToRefs(userStore)
      const user = userStore?.user
      const deliveryType = commonStoreRefs?.deliveryType//.value
      const deliveryTime = commonStoreRefs?.deliveryTime
      const selectedLocation = commonStoreRefs?.selectedLocation

      const cartItems = this.cartItems;
      var cartItemsObj: {[k: string]: any} = {};
      const cartItemsNew = cartItems.map(item => {
        //const variation_id = ! item.variation_id ? "_0" : `_${item.variation_id}`
        //let product_code = `${item.id}`;//${variation_id}`;
        cartItemsObj[item.id] = {
          product: {
            id: item.id,//`${item.id}`,
            name: item.name
          },
          quantity: item.count  * +item.add_to_basket_once,
          variation: item.variation_id ? item.variation_id : 0,
          variation_data: item.variation_data || null,
          price: item.price * item.add_to_basket_once
        }
        let result_obj = {
          [item.id/*product_code*/]: {
            product: {
              id: item.id,
              name: item.name
            },
            quantity: item.count * +item.add_to_basket_once,
            variation: item.variation_id === null ? 0 : item.variation_id,
            price: item.price * item.add_to_basket_once
          }
        }
        return result_obj
      });

      //console.log('****cartItemsObj', cartItemsObj)
      // for (var i = 0; i < cartItemsNew.length; ++i) {
      //   const item_key = Object.keys(cartItemsNew[i])[0]// as const
      //   cartItemsObj[`${item_key}`] = cartItemsNew[i][item_key]
      // }
      // console.log("delivery type: ",deliveryType)
      // console.log("cartItemsObj:",cartItemsObj)
      let body_obj: Record<string, any>/*{[k: string]: any}*/ = {
        cart_total: this.cartItemsRegularPrice,
        delivery_type: deliveryType.value === 'pickup'? 'local_pickup': deliveryType.value,
        customer_id: user?.id,// === null ? "" : userId,
        cart_items: cartItemsObj,//cartItemsNew,//
        take_date: getDate(),
      }
      if (deliveryTime.value) {
        const deliveryTimeArr = deliveryTime.value.split("-");
        body_obj.time_from = deliveryTimeArr[0]
        body_obj.time_to = deliveryTimeArr[1]
      }
      if (selectedLocation.value) {
        body_obj.meta_data = [
          {
            key: "stock_id",
            value: selectedLocation.value.warehouse_id
          }
        ]
      }
      // console.log("data object: ",body_obj)
      // console.log("data object stringified", JSON.stringify(body_obj))
      //console.log("data object DEstringified:",JSON.parse(JSON.stringify(body_obj)))
      const config = useRuntimeConfig()
      const {data, error} = await useFetch(`${config.public.BASE_URL}/wp-json/wc/v3/coupons/autoapply`, {
        method: "POST",
        body: body_obj,
      })/*await useLazyAsyncData(
          'coupons',
          () => $fetch('/api/wp-json/wc/v3/coupons/autoapply', {
              method: "POST",
              body: body_obj,
          })
      )*/
      console.log("response error: ",error)
      const discountItems: any | null = data?.value || []
      const chooseDiscountStore = useChooseDiscountStore()
      chooseDiscountStore.clearDiscounts()
      this.discountBlock = null

      if (discountItems && (discountItems?.couponsList?.length > 0 || discountItems?.stocksList?.length > 0)) {
        /*************/
        //auto_coupons_summing  : true - автокупоны могут складываться, false - не могут.
        //"coupons_and_auto_coupons_summing" true: выбрать подарок и ввести ручной промокод. false:  так же появляется выбор. Либо ручной либо другие подарки
        //app_use_bon_with_auto_promo
        const promoSettings = commonStore.promoSettings || await this.getPromoSettings()
        if(!commonStore.promoSettings)
          commonStore.setPromoSettings(promoSettings)

        //if (promoSettings.auto_coupons_summing)  true - автокупоны могут складываться, false - не могут
        //if (promoSettings.coupons_and_auto_coupons_summing) true: выбрать подарок и ввести ручной промокод. false:  так же появляется выбор. Либо ручной либо другие подарки
        //if (promoSettings.app_use_bon_with_auto_promo) sum bonus with auto promo
        /****************/

        const couponsLength = discountItems?.couponsList.length
        //const stocksLength = discountItems?.stocksList.length
        const discountCount1 = couponsLength// + stocksLength
        this.discountCount = discountCount1
        if (couponsLength > 0) {
          discountItems?.couponsList.forEach((coupon) => {
            let productData = coupon?._wc_free_gift_coupon_data_mod[0]
            if (productData === undefined || productData === null) {
              productData = null
            } else {
              productData = {
                id: productData.product_id,
                variationId: productData.variation_id,
                quantity: productData.quantity
              }
            }
            chooseDiscountStore.addDiscount({
              id: coupon.id,
              name: coupon.code,
              image: coupon.image,
              amount: coupon.amount,
              description: coupon.description,
              discountType: coupon.discount_type,
              isSelected: false,
              product: productData
            })
          })
          if (couponsLength === 1) {
            if (promoSettings.coupons_and_auto_coupons_summing) {
              chooseDiscountStore.setSelectedDiscountValue(chooseDiscountStore.discountItems[0].id, true)
              chooseDiscountStore.applyDiscount()
            }
            else {
              if (!this.promocode) {
                chooseDiscountStore.setSelectedDiscountValue(chooseDiscountStore.discountItems[0].id, true)
                chooseDiscountStore.applyDiscount()
              }
              else {
                chooseDiscountStore.addDiscount({
                  id: Date.now(),
                  name: this.promocode.value,
                  image: this.promocode.type === 'percent' ? this.defaultImages.promoPercent : this.defaultImages.promoFixed,
                  amount: this.promocode.amount,
                  description: "Скидка " + this.promocode.amount + (this.promocode.type === 'percent' ? '%' : 'р'),
                  discountType: this.promocode.type,
                  isSelected: false,
                  product: null
                }, true)
                chooseDiscountStore.clearSelected()
                this.discountBlock = {
                  header: "Вам доступны скидка или подарок!",
                  description: "Вам доступны " + discountCount1 + " скидки или подарка. Выберите 1 из предложенных вариантов",
                  buttonColor: "yellow",//"#ffce00",
                  buttonText: "Выбрать",
                  image: this.defaultImages.giftImg
                }
                if (this.isShowCartModal && chooseDiscountStore.selectedDiscount?.length == 0 && this.discountProducts.length == 0) { 
                  chooseDiscountStore.toggleChooseDiscountModal(true, 'cart')
                }
                else {
                  this.needOpenChooseDiscountModal = true
                }
              }
            }
          }
          else {
            this.discountBlock = {
              header: "Вам доступны скидка или подарок!",
              description: "Вам доступны " + discountCount1 + " скидки или подарка. Выберите 1 из предложенных вариантов",
              buttonColor: "yellow",//"#ffce00",
              buttonText: "Выбрать",
              image: this.defaultImages.giftImg
            }
            if (promoSettings.coupons_and_auto_coupons_summing) {
              if (promoSettings.auto_coupons_summing) {
                //Делаем все selected
                chooseDiscountStore.discountItems.forEach((discount) => {
                  chooseDiscountStore.setSelectedDiscountValue(discount.id, true, true)
                })
                chooseDiscountStore.applyDiscount()
              }
              else {
                if (this.isShowCartModal && chooseDiscountStore.selectedDiscount?.length == 0 && this.discountProducts.length == 0) {
                  chooseDiscountStore.toggleChooseDiscountModal(true, 'cart')
                }
                else {
                  this.needOpenChooseDiscountModal = true
                }
              }
            }
            else {
              if (this.promocode) {
                chooseDiscountStore.addDiscount({
                  id: Date.now(),
                  name: this.promocode.value,
                  image: this.promocode.type === 'percent' ? this.defaultImages.promoPercent : this.defaultImages.promoFixed,
                  amount: this.promocode.amount,
                  description: "Скидка " + this.promocode.amount + (this.promocode.type === 'percent' ? '%' : 'р'),
                  discountType: this.promocode.type,
                  isSelected: false,
                  product: null
                }, true)
                chooseDiscountStore.clearSelected()
              }
              if (promoSettings.auto_coupons_summing) {
                // chooseDiscountStore.discountItems.forEach((discount) => {
                //   chooseDiscountStore.setSelectedDiscountValue(discount.id, true, true)
                // })
                //Изменить на выбор между ВСЕМИ автокупонами и промокодом (Если он есть)

                if (this.isShowCartModal && chooseDiscountStore.selectedDiscount?.length == 0 && this.discountProducts.length == 0) {
                  console.log('here');
                  chooseDiscountStore.toggleChooseDiscountModal(true, 'cart')
                }
                else {
                  this.needOpenChooseDiscountModal = true
                }
              }
              else {
                if (this.isShowCartModal && chooseDiscountStore.selectedDiscount?.length == 0 && this.discountProducts.length == 0) {
                  chooseDiscountStore.toggleChooseDiscountModal(true, 'cart')
                }
                else {
                  this.needOpenChooseDiscountModal = true
                }
              }
            }
          }

          //this.toggleShowDiscountBlock(true)
        }
        console.log("response: ", discountItems)

      }else{//автокупонов не пришло чистим список купонов
        chooseDiscountStore.clearAll()
        chooseDiscountStore.clearDiscounts()
        if (this.getDiscountProducts.length > 0) {
          this.getDiscountProducts.forEach((item) => {
            this.removeFromCart(item.idx, true)
            this.removeDiscountProduct(item.id)
          })
        }
      }

      this.isGetDiscountInProcess = false
      if (this.needGetDiscountRestart) {
        this.needGetDiscountRestart = false
        await this.getDiscounts()
      }
    },

    lazyDiscounts () {
      clearTimeout(this.timeout)
      this.timeout =  setTimeout(() => {
        this.getDiscounts()
      }, 2000)
    },

    async getPromoSettings() {
      const config = useRuntimeConfig()
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/systeminfo/v1/coupons/seettings`)
      return data?.value
    },

    incrementItem (idx: number) {
      const catalogStore = useCatalogStore();
      const discountStore = useChooseDiscountStore();
      const commonStore = useCommonStore()

      const supplementsInCatalog = catalogStore.catalog?.find(item => item.name.toLowerCase() === 'допы')?.products || null;

      const catalogIds = new Set(supplementsInCatalog?.map(item => item.id)) || [];
      const supplementsInCart = this.cart.filter(item => catalogIds?.has(item.id)) || [];

      let currentSupplement = supplementsInCatalog?.find(item => +item.id === +this.cart[idx].id) || null;

      let temp = supplementsInCart?.find(supplement => supplement?.id === currentSupplement?.id);

      this.cart[idx].count++

      if (currentSupplement && temp?.free_limits 
        && this.cart[idx].count > temp?.free_limits.quantity
      ) {
        this.cart[idx].price = +currentSupplement.price;
        this.cart[idx].regular_price = +currentSupplement.price;
      }


      commonStore.addNotification({
        type: 'cart',
        text: 'Товар добавлен в корзину',
        status: 'success'
      })

      if (discountStore.selectedDiscount?.length == 0) {
        this.lazyDiscounts();
      }
      else {
        this.getOnlyCoupons(true);
      }

    },

    decrementItem (idx: number) {
      const catalogStore = useCatalogStore();
      const discountStore = useChooseDiscountStore();
      const userStore = useUserStore();

      const supplementsInCatalog = catalogStore.catalog?.find(item => item.name.toLowerCase() === 'допы')?.products || null;

      const catalogIds = new Set(supplementsInCatalog?.map(item => item.id)) || [];
      const supplementsInCart = this.cart.filter(item => catalogIds?.has(item.id)) || [];

      let currentSupplement = supplementsInCatalog?.find(item => +item.id === +this.cart[idx].id) || null;

      let temp = supplementsInCart?.find(supplement => supplement?.id === currentSupplement?.id);

      this.cart[idx].count--

      if (currentSupplement && temp.free_limits 
        && this.cart[idx].count <= temp?.free_limits.quantity) {
        this.cart[idx].price = 0;
        this.cart[idx].regular_price = 0;
      }

      if (this.cart[idx].count === 0) {
        this.cart.splice(idx, 1)
      }

      if (discountStore.selectedDiscount?.length == 0) {
        this.lazyDiscounts();
      }
      else {
        this.getOnlyCoupons();
      }
    },

    removeFromCart (idx: number, isDiscount: boolean = false) {
      const discountStore = useChooseDiscountStore();
      const userStore = useUserStore();

      this.cart.splice(idx, 1)
  
      if (this.getDiscountProducts.length > 0) {
        this.getDiscountProducts.forEach((item) => {
          item.idx -= 1
        })
      }

      if (! isDiscount && discountStore.selectedDiscount?.length == 0) {
        this.lazyDiscounts();
      }
      else {
        this.getOnlyCoupons();
      }
    },

    async getOnlyCoupons(isAdding = false) {
      const commonStore = useCommonStore()
      const commonStoreRefs = storeToRefs(commonStore)
      const userStore = useUserStore()
      const chooseDiscountStore = useChooseDiscountStore();

      const user = userStore?.user
      const deliveryType = commonStoreRefs?.deliveryType//.value
      const deliveryTime = commonStoreRefs?.deliveryTime
      const selectedLocation = commonStoreRefs?.selectedLocation

      const cartItems = this.cartItems;
      var cartItemsObj: {[k: string]: any} = {};
      const cartItemsNew = cartItems.map(item => {
        //const variation_id = ! item.variation_id ? "_0" : `_${item.variation_id}`
        //let product_code = `${item.id}`;//${variation_id}`;
        cartItemsObj[item.id] = {
          product: {
            id: item.id,//`${item.id}`,
            name: item.name
          },
          quantity: item.count  * +item.add_to_basket_once,
          variation: item.variation_id ? item.variation_id : 0,
          variation_data: item.variation_data || null,
          price: item.price * item.add_to_basket_once
        }
        let result_obj = {
          [item.id/*product_code*/]: {
            product: {
              id: item.id,
              name: item.name
            },
            quantity: item.count * +item.add_to_basket_once,
            variation: item.variation_id === null ? 0 : item.variation_id,
            price: item.price * item.add_to_basket_once
          }
        }
        return result_obj
      });

      const discountProductsIds = this.discountProducts.map(item => item.id);

      const requestItems = cartItems.filter(item => !discountProductsIds.includes(item.id))

      let itemPriceWithoutDiscountProducts = requestItems.reduce((acc, item) => {
        let price = +item.regular_price

        if (item.supplements.length) {
          price += item.supplements.reduce((acc2, item2) => {
            acc2 += item2.price * item2.count
            return acc2
          }, 0)
        }

        acc += item.count  * item.add_to_basket_once * price
        return acc
      }, 0)

      let body_obj: Record<string, any>/*{[k: string]: any}*/ = {
        cart_total: itemPriceWithoutDiscountProducts,
        delivery_type: deliveryType.value === 'pickup'? 'local_pickup': deliveryType.value,
        customer_id: user?.id,// === null ? "" : userId,
        cart_items: requestItems,//cartItemsNew,//
        take_date: getDate(),
      }
      if (deliveryTime.value) {
        const deliveryTimeArr = deliveryTime.value.split("-");
        body_obj.time_from = deliveryTimeArr[0]
        body_obj.time_to = deliveryTimeArr[1]
      }
      if (selectedLocation.value) {
        body_obj.meta_data = [
          {
            key: "stock_id",
            value: selectedLocation.value.warehouse_id
          }
        ]
      }

      const config = useRuntimeConfig()
      const {data, error} = await useFetch(`${config.public.BASE_URL}/wp-json/wc/v3/coupons/autoapply`, {
        method: "POST",
        body: body_obj,
      })

      const discountItems: any | null = data?.value || []

      const allCouponsApplied = this.appliedAutoCoupons.every(coupon => 
        discountItems.couponsList?.some(discount => 
            discount.id === coupon.id // или другое свойство, уникально идентифицирующее купон
        )
      );

      const discountItemsApplied = this.discountProducts.every(prod => 
        discountItems.couponsList?.some(discount => 
            discount.id === prod.id // или другое свойство, уникально идентифицирующее купон
        )
      );

      if (!allCouponsApplied) {
        this.clearDiscountProducts();
        this.setDiscountBlock(null);
        this.clearAutoCoupons();
        this.setBonus(0);
        userStore.setAppliedBonus(0); 
        chooseDiscountStore.clearDiscounts();

        await this.getDiscounts();
      }

      else if (discountItems.couponsList > chooseDiscountStore.discounts) {
        await this.getDiscounts();
      }

      else if (!discountItemsApplied && !isAdding) {
        let temp = this.cartItems.find(item => item.name.toLowerCase() == chooseDiscountStore.tempSelectedDiscount?.name.toLowerCase())
        
        if (temp && temp !== undefined) {
          this.removeFromCart(this.cartItems.indexOf(temp));
        }

        chooseDiscountStore.tempSelectedDiscount = null;

        this.clearDiscountProducts();
        this.setDiscountBlock(null);
        this.clearAutoCoupons();
        this.setBonus(0);
        userStore.setAppliedBonus(0); 
        chooseDiscountStore.clearDiscounts();

      }

    },

    removeMissedProductsFromCart (locationId: number) {
      this.cart = this.cart.filter(item => item.locations.includes(locationId))
    },

    clearCart () {
      this.cart = []
      const chooseDiscountStore = useChooseDiscountStore()
      //const { discounts } = storeToRefs(chooseDiscountStore)
      chooseDiscountStore.clearDiscounts()
      this.clearDiscountProducts();
      this.clearAutoCoupons();

    },

    toggleShowCartModal (value: boolean) {
      this.isShowCartModal = value
      if (value && this.needOpenChooseDiscountModal) {
        this.needOpenChooseDiscountModal = false
        const chooseDiscountStore = useChooseDiscountStore()
        chooseDiscountStore.toggleChooseDiscountModal(true, 'cart')
      }
    },

    toggleShowDiscountBlock (value: boolean) {
      this.isShowDiscountBlock = value
    },
    setPromocode (value: Promocode | null) {
        this.promocode = value
    },
    setDiscountBlock (value: DiscountBlock | null) {
      this.discountBlock = value
    },
    addDiscountProduct(value: discountProductType) {
      console.log("addDiscountProduct:", value)
      this.discountProducts.push(value)
    },
    removeDiscountProduct(id: number) {
      this.discountProducts = this.discountProducts.filter((item) => {
        return item.id !== id
      })
    },
    clearDiscountProducts() {
      this.discountProducts = []
    },
    setBonus(value: number) {
      this.bonusesApplied = value
    },
    addAutoCoupon(value: autoCouponItem) {
      this.appliedAutoCoupons.push(value)
    },
    removeAutoCoupon(id: number) {
      this.appliedAutoCoupons.filter((item) => {
        return item.id !== id
      })
    },
    clearAutoCoupons() {
      this.appliedAutoCoupons = []
    },
    setNeedOpenChooseDiscountModal(value: boolean) {
      this.needOpenChooseDiscountModal = value
    },
    setNeedApplyPromocode(value: boolean) {
      this.needApplyPromocode = value
    },
  },

  getters: {
    getDiscountProducts: (state) => {
      return state.discountProducts
    },
    getDiscountProductById: (state) => (id: number) => {
      return state.discountProducts.find((element) => element.id === id)
    },
    cartItems: (state) => {
      return state.cart
    },
    getAutoDiscountPercentSum: (state): number => {
      const percentItems = state.appliedAutoCoupons.filter((item) => {
        return item.discountType === 'percent'
      })
      return percentItems.reduce(
          (partialSum, a) => partialSum + a.amount, 0
      );
    },
    getAutoDiscountFixedSum: (state): number => {
      const fixedItems = state.appliedAutoCoupons.filter((item) => {
        return item.discountType === 'fixed_cart'
      })
      return fixedItems.reduce(
          (partialSum, a) => partialSum + a.amount, 0
      );
    },
    cartItemsLength: (state) => {
      return state.cart.reduce((acc, item) => {
        const count = !item.countable ? 1 : item.count

        acc = acc + count
        return acc
      }, 0)
    },
    // Сумма всех товаров с учетом скидки
    cartItemsPrice: (state): number => {
      const percentItems = state.appliedAutoCoupons.filter((item) => {
        return item.discountType === 'percent'
      })
      let percents = /*this.getAutoDiscountPercentSum*/percentItems.reduce(
          (partialSum, a) => partialSum + a.amount, 0
      );
      const fixedItems = state.appliedAutoCoupons.filter((item) => {
        return item.discountType === 'fixed_cart'
      })
      let fixedDiscount = /*this.getAutoDiscountFixedSum*/fixedItems.reduce(
          (partialSum, a) => partialSum + a.amount, 0
      );
      if (state?.promocode && state?.promocode?.type == 'fixed_cart') {
        fixedDiscount += state?.promocode?.amount
      }
      if (state?.promocode && state?.promocode?.type == 'percent') {
        percents += state?.promocode?.amount
      }
      const commonStore = useCommonStore()
      const catalogStore = useCatalogStore();

      const useBonusesWithCoupons = commonStore?.promoSettings?.app_use_bon_with_auto_promo
      // console.log("fixed discount: " + fixedDiscount)
      // console.log("percents: " + percents)

      const supplementsInCatalog = catalogStore.catalog?.find(item => item.name.toLowerCase() === 'допы')?.products?.filter(item => item.free_limits?.length > 0) || [];
      const catalogIds = new Set(supplementsInCatalog.map(item => item.id)) || [];
      const supplementsInCart = state.cart.filter(item => catalogIds.has(item.id)) || [];

      let itemPrice = state.cart.reduce((acc, item) => {
        let price = +item.price

        if (item.supplements.length) {
          price += item.supplements.reduce((acc2, item2) => {
            acc2 += item2.price * item2.count
            return acc2
          }, 0)
        }

        acc += item.count * item.add_to_basket_once * price
        return acc
      }, 0)

      state.onlyItemsPrice = itemPrice;

      if (commonStore.selectedLocation?.delivery_price > 0) {
        itemPrice += commonStore.selectedLocation?.delivery_price
      }

      for (let supplement of supplementsInCart) {
        if (supplement.count > supplement?.free_limits?.quantity) {
          itemPrice -= supplement.price * supplement?.free_limits?.quantity; 
        }
      }

      if (useBonusesWithCoupons) {
        if (state.bonusesApplied > 0) {
          let temp = (itemPrice - fixedDiscount) * ((100 - percents) / 100);

          return temp - state.bonusesApplied
        }
        else {
          return (itemPrice - fixedDiscount) * ((100 - percents) / 100)
        }
      }
      else {
        if (state.bonusesApplied > 0) {
          let temp = (itemPrice - fixedDiscount) * ((100 - percents) / 100);

          return temp - state.bonusesApplied
        }
        else
          {
            //без бонусов и купонов
            return (itemPrice - fixedDiscount) * ((100 - percents) / 100)
          }
        }
    },

    // Сумма всех товаров без скидки
    cartItemsRegularPrice: (state) => {
      const catalogStore = useCatalogStore();
      const commonStore = useCommonStore();
      const supplementsInCatalog = catalogStore.catalog?.find(item => item.name.toLowerCase() === 'допы')?.products?.filter(item => item.free_limits?.length > 0) || [];
      const catalogIds = new Set(supplementsInCatalog.map(item => item.id)) || [];
      const supplementsInCart = state.cart.filter(item => catalogIds.has(item.id)) || [];

      let itemPrice = state.cart.reduce((acc, item) => {
        let price = +item.regular_price

        if (item.supplements.length) {
          price += item.supplements.reduce((acc2, item2) => {
            acc2 += item2.price * item2.count
            return acc2
          }, 0)
        }

        acc += item.count  * item.add_to_basket_once * price
        return acc
      }, 0) //- state.bonusesApplied

      if (commonStore.selectedLocation?.delivery_price > 0) {
        itemPrice += commonStore.selectedLocation?.delivery_price
      }

  
      for (let supplement of supplementsInCart) {
        if (supplement.count >= supplement?.free_limits?.quantity) {
          itemPrice -= supplement.regular_price * supplement?.free_limits?.quantity; 
        }
      }

      return itemPrice;
    },

    productInCart: (state) => {
      return (id: number, supplements: Supplement[] = [], variationId: number | null = null) => {
        let idx = null

        const item = state.cart.find((item, i) => {
          if (
            item.id === id &&
            item?.variation_id === variationId &&
            supplements.length === item.supplements.length &&
            item.supplements.every(itemSupplement => supplements.find(supplement => supplement.id === itemSupplement.id && supplement.count === itemSupplement.count))
          ) {
            idx = i
            return true
          }

          return false
        })

        return {
          item: item || null,
          idx
        }
      }
    },

    missedProductsList: (state) => {
      return (locationId: number) => {
        return state.cart.filter(item => !item.locations.includes(locationId))
      }
    },
    getDiscountBlock: (state) => {
      return state.discountBlock
    },
    getDiscountCount: (state) => {
      return state.discountCount
    },
    getIsShowDiscountBlock: (state) => {
      return state.isShowDiscountBlock
    },
    getBonusesApplied: (state) => {
      return state.bonusesApplied
    },
    getAutoCoupons: (state) => {
      return state.appliedAutoCoupons
    },
  },
  persist: {
    storage: persistedState.localStorage,
    paths: [
        'cart', 'discountBlock', 'isShowDiscountBlock', 'discountProducts', 'discountCount',
        'appliedAutoCoupons', 'bonusesApplied', 'getAutoDiscountPercentSum', 'getAutoDiscountFixedSum',
        'cartItemsPrice', 'needOpenChooseDiscountModal',
    ]
  },
})