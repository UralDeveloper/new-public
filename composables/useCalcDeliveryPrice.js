import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'

export const useCalcDeliveryPrice = () => {
  const cartStore = useCartStore()
  const commonStore = useCommonStore()
  const { selectedLocation } = storeToRefs(commonStore)
  //const { cartItemsPrice } = storeToRefs(cartStore)

  // console.log('****selectedLocation', selectedLocation)
  // console.log('****cartItemsPrice', cartItemsPrice)

  switch (selectedLocation.value?.delivery_code) {
    case 'flat_rate':
      //по умолчанию цена из первого условия
      let price = selectedLocation.value?.zone?.sum[0].deliv_price;
      if (selectedLocation?.value?.zone) {
        selectedLocation.value?.zone.sum.forEach(item => {
          // console.log('****item', item)
          // console.log('****item', item.min_sum_order, cartStore.cartItemsPrice)

          if (parseFloat(item.min_sum_order) <= parseFloat(cartStore.cartItemsPrice)) {
            price = parseFloat(item.deliv_price)
          }
        })
      }
      //console.log('****price', price)

      selectedLocation.value.delivery_price = +price
      break
    case 'local_pickup':
      selectedLocation.value.delivery_price = 0
      break

    case 'wcso_booking':
      selectedLocation.value.delivery_price = 0
      break

    default:
      break
  }

  // console.log('*****setLocation', location, 'type', type)
  // commonStore.setDeliveryType(type)
  // commonStore.setLocation(location)
  // setTimeout(() => {
  //   cartStore.getDiscounts()
  // }, 2000)
  return true
}