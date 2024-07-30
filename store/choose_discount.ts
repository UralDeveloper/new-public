import {useCommonStore} from '@/store/common'
import { useCatalogStore } from '@/store/catalog'
import  { useCartStore } from '@/store/cart'
interface State {
    discounts: discountItem[]
    isShowChooseDiscountModal: boolean,
    isDiscountApplied: boolean,
    toggleSource: string // where the modal was called from
    tempSelectedDiscount: object | null
}
interface productType {
    id: number,
    variationId: number,
    quantity: number
}
interface discountItem {
    id: number
    name: string
    image: string
    amount: number,
    description: string,
    discountType: string,
    isSelected: boolean,
    product: productType | null
}
// enum discountType {
//     Percent = "percent",
//     FreeGift = "free_gift",
//     Amount = "fixed_cart",
// }
export const useChooseDiscountStore = defineStore('chooseDiscountStore', {
    state: (): State => ({
        discounts: [],
        isShowChooseDiscountModal: false,
        isDiscountApplied: false,
        toggleSource: '',
        tempSelectedDiscount: null,

    }),
    actions: {
        toggleChooseDiscountModal (value: boolean, source: string = '')  {
            const cart = useCartStore()
            this.toggleSource = source
            if (value && source === 'cart') {
                //this.clearSelected()
                cart.toggleShowCartModal(! value)
            }
            this.isShowChooseDiscountModal = value
        },
        applyDiscount() {
            const cart = useCartStore()
            const catalog = useCatalogStore()
            const selectedDiscount = this.selectedDiscount
            console.log("selectedDiscount:",selectedDiscount)
            console.log("cart autocoupons before apply: ",cart.appliedAutoCoupons)
            if (selectedDiscount.length > 0 ) {
                cart.clearAutoCoupons()
                selectedDiscount.forEach((discountItem) => {
                    if ([cart.defaultImages.promoPercent, cart.defaultImages.promoFixed].includes(discountItem.image)) {
                        console.log("promo discount item: ",discountItem)
                        cart.setPromocode({
                            value: discountItem.name,
                            type: discountItem.discountType,
                            amount: discountItem.amount
                        })
                        cart.setNeedApplyPromocode(true)
                        cart.setDiscountBlock({
                            header: discountItem.name,
                            description: "Вы выбрали 1 подарок из предложенных вариантов",
                            buttonColor: "white",
                            buttonText: "Изменить выбор",
                            image: discountItem.image,
                        })
                        if (selectedDiscount.length === 1) {
                            if (cart.getDiscountProducts.length > 0) {
                                cart.getDiscountProducts.forEach((item) => {
                                    cart.removeFromCart(item.idx, true)
                                    cart.removeDiscountProduct(item.id)
                                })
                            }
                            console.log("promo inside condition")
                            //cart.setDiscountProduct(null)
                        }
                    }
                    else {
                        if (["percent", "fixed_cart"].includes(discountItem.discountType)) {
                            if (selectedDiscount.length === 1) {
                                if (cart.getDiscountProducts.length > 0) {
                                    cart.getDiscountProducts.forEach((item) => {
                                        cart.removeFromCart(item.idx, true)
                                        cart.removeDiscountProduct(item.id)
                                    })
                                }
                                console.log("promo inside condition")
                               //cart.setDiscountProduct(null)
                            }
                            cart.addAutoCoupon({
                                id: discountItem.id,
                                name: discountItem.name,
                                amount: discountItem.amount,
                                discountType: discountItem.discountType,
                            })
                            // cart.setPromocode({
                            //     value: discountItem.name,
                            //     type: discountItem.discountType,
                            //     amount: discountItem.amount
                            // })
                            cart.setDiscountBlock({
                                header: discountItem.name,
                                description: "Вы выбрали 1 подарок из предложенных вариантов",
                                buttonColor: "white",
                                buttonText: "Изменить выбор",
                                image: discountItem.image,
                            })
                        } else if (discountItem.discountType == "free_gift") {
                            const giftProduct = catalog.getProductById(discountItem?.product?.id)
                            console.log("giftProduct:", giftProduct)
                            let productItem = {
                                ...giftProduct,
                            }
                            console.log(productItem, this.tempSelectedDiscount);
                            //if (! cart.productInCart(productItem.id).item) {
                            if (discountItem?.product?.variationId) {
                                productItem.variation_id = discountItem?.product?.variationId
                            }
                            if (discountItem?.product?.quantity) {
                                productItem.count = discountItem?.product?.quantity
                            }
                            productItem.price = discountItem.amount

                            //cart.removeAutoCoupon(productItem.id)
                            // if (cart.getDiscountProduct && cart.getDiscountProduct.idx) {
                            //     cart.removeFromCart(cart?.getDiscountProduct?.idx, true)
                            // }
                            if (cart.getDiscountProductById(productItem.id) !== undefined) {
                                let discountProduct = cart.getDiscountProductById(productItem.id)
                                cart.removeFromCart(discountProduct.idx, true)
                                cart.removeDiscountProduct(productItem.id)
                                cart.removeAutoCoupon(productItem.id)
                            }
                            //cart.setPromocode(null)

                            if (this.tempSelectedDiscount && this.tempSelectedDiscount.id !== productItem.id) {
                                let temp = cart.cartItems.find(item => item.name.toLowerCase() == this.tempSelectedDiscount.name.toLowerCase())
                                
                                if (temp && temp !== undefined) {
                                    cart.removeFromCart(cart.cartItems.indexOf(temp));

                                }
                            }

                            this.tempSelectedDiscount = productItem;
                            console.log("productItem before addToCart:", productItem)
                            cart.addToCart(productItem, true)
                            cart.setDiscountBlock({
                                header: productItem.name,
                                description: "Вы выбрали 1 подарок из предложенных вариантов",
                                buttonColor: "white",
                                buttonText: "Изменить выбор",
                                image: productItem.image
                            })
                            cart.addDiscountProduct({
                                id: productItem?.id,
                                idx: (cart.cartItems.length - 1)
                            })
                            //}
                        }
                    }
                })
                //this.toggleChooseDiscountModal(false)
            }
            else {
                if (this.discountItems.filter((item) => {
                    return [cart.defaultImages.promoPercent, cart.defaultImages.promoFixed].includes(item.image) &&
                        item.isSelected && item.name === cart?.promocode?.value
                }).length > 0) {
                    cart.setPromocode()
                }
                cart.clearAutoCoupons()
                if (cart.getDiscountProducts.length > 0) {
                    cart.getDiscountProducts.forEach((item) => {
                        cart.removeFromCart(item.idx, true)
                        cart.removeDiscountProduct(item.id)
                    })
                }
                // if (cart.getDiscountProduct && cart.getDiscountProduct.idx) {
                //     cart.removeFromCart(cart?.getDiscountProduct?.idx, true)
                // }
                // cart.setDiscountProduct(null)

                //cart.setPromocode(null)
                cart.setDiscountBlock({
                    header: "Вам доступны скидка или подарок!",
                    description: "Вам доступны " + cart?.getDiscountCount + " скидки или подарка. Выберите 1 из предложенных вариантов",
                    buttonColor: "yellow",//"#ffce00",
                    buttonText: "Выбрать",
                    image: cart.defaultImages.giftImg
                })
            }
            console.log("cart autocoupons after apply: ",cart.appliedAutoCoupons)
            if (this.toggleSource === 'cart') {
                cart.toggleShowCartModal(true)
            }
        },
        addDiscount(item: discountItem, addFromStart: boolean = false) {
            if (! addFromStart) {
                this.discounts.push(item);
            }
            else {
                this.discounts.unshift(item)
            }
        },
        clearDiscounts() {
            this.discounts = []
            this.tempSelectedDiscount = null;
        },
        clearSelected() {
            for (let i = 0; i < this.discountItemsLength; i++) {
                this.discounts[i].isSelected = false
            }
        },
        clearAll() {
            this.discounts = []
            this.isShowChooseDiscountModal = false
            this.isDiscountApplied = false
            this.toggleSource = ''
        },
        setSelectedDiscountValue(id: number, value: boolean, multiple: boolean = false) {
            for (let i = 0; i < this.discountItemsLength; i++) {
                let discountItem: discountItem = this.discounts[i]
                //Multiple flag is responsible for if we need to set multiple as selected
                if (! multiple && discountItem.isSelected) {
                    //Записываем предыдущий выбранный дисконтный товар
                    //Переписать если нужно добавить возможность выбора несколько скидок или акций!
                    //console.log("setSelectedProduct this.discounts[i] outside: ",this.discounts[i])
                    this.discounts[i].isSelected = false
                }
                if (discountItem.id === id) {
                    // if (discountItem.product !== null) {
                    //     const cart = useCartStore()
                    //     const cartItem = cart.productInCart(discountItem.product.id, [], discountItem.product.variationId)
                    //     if (cartItem.item) {
                    //         console.log("setSelectedProduct cartItem before condition: ",cartItem)
                    //         const discountProduct = {
                    //             id: cartItem.item.id,
                    //             idx: cartItem.idx
                    //         }
                    //         cart.setDiscountProduct(discountProduct)
                    //     }
                    //     console.log("setSelectedProduct cartItem after condition:  ",cartItem)
                    //     console.log("setSelectedProduct this.discounts[i] inside: ",discountItem)
                    // }
                    this.discounts[i].isSelected = value
                }
            }
        }
    },
    getters: {
        discountItems: (state) => {
            return state.discounts
        },
        discountItemsLength: (state) => {
            return state.discounts.length
        },
        selectedDiscount: (state) => {
           return state.discounts.filter((item) => {
               return item.isSelected
           })
        },
    },
    persist: {
        storage: persistedState.localStorage,
            paths: ['discounts', 'selectedDiscount', 'discountItems']
    },
})