import { useCommonStore } from '@/store/common'

export const useCatalogStore = defineStore('catalogStore', {
  state: () => ({
    HEIGHT: 80,
    headerMenu: false,
    currentSubCategoryId: 0,
    currentCategoryId: 0,
    catalog: [],
    selectedProductId: null, // select product for modal
    selectedPriceFilters: null, // up | down
    selectedAttributesFilters: null, // array
    selectedBadgeFilters: null, // array
    filteredCategory: null,
    filteredAllCategories: null,
    elseProductOpened: false,
    favorites: [],
    burger: false,
    catalogUrl: null,
    productSlug: '',
    baseUrl: '',
    visitsToPaymentPage: [], 
    selectedProductUrl: null,
    activeOrders: [],
    isOpenedFromCart: false,
    cartProductSelectedSupplements: null,
  }),

  actions: {
    async getCatalog () {
      let url = this.catalogUrl;
      const commonStore = useCommonStore();
      const config = useRuntimeConfig();
      let defaultUrl = '';

      if (commonStore.fragmentedCatalog) {
        defaultUrl = `${config.public.BASE_URL}/wp-content/uploads/app_sync/prodcat.json`;
      }
      else {
        defaultUrl = `${config.public.BASE_URL}/wp-content/uploads/app_sync/prodcat.json`
      }

      url = url ? url : defaultUrl;

      //const { data } = await useLazyAsyncData('catalog', () => $fetch(url))
      console.log('fetching', url);
      const { data, isLoading } = await useLazyAsyncData('prodcat', async () => {
        const res = await $fetch(url, {
          headers: {
            'Accept-Encoding': 'gzip',
          },
        });
        return res;
      });

      const catalog = (data?.value || []).map(item => {
        const products = (item.products || []).map(product => {
          if (product) {
            return {
              ...product,
              catalog_name: item.name
            }
          }
          return null
        }).filter(item => item)

        return {
          id: item.id,
          name: item.name,
          parent: item.parent,
          slug: item.slug,
          img: item.image,
          description: item.description,
          seo_data: item.seo_data,
          color_text_category: item.color_text_category ?? null,
          visual_name_category: item.visual_name_category ?? null,
          free_limits: item.free_limits ?? null,
          dop_image_category_site: item.dop_image_category_site ?? null,
          products,
        }
      })//.filter(item => item?.products?.length)

      this.catalog = catalog
      this.loaded = true;
    },

    getCatalogByLocation() {
      const commonStore = useCommonStore();
      const config = useRuntimeConfig();
      let url = null;

      if (commonStore.selectedLocation) {
        url = `${config.public.BASE_URL}${commonStore.getCurrentLocationCatalog?.price_file_path}`;
      }
      this.catalogUrl = url;
      this.getCatalog();
    },

    setProduct (data = null) {
      this.selectedProductId = data
    },

    addActiveOrder (order) {
      this.activeOrders.push(order);
    },

    updateActiveOrder (order) {
      let index = this.activeOrders.findIndex(item => item.id === order.id);

      this.activeOrders.splice(index, 1);

      this.activeOrders.push(order);
    },

    removeActiveOrder (order) {
      let index = this.activeOrders.findIndex(item => item.id === order.id);

      this.activeOrders.splice(index, 1);
    },

    setSelectedPriceFilters(value) {
      this.selectedPriceFilters = value
    },

    setSelectedAttributesFilters(value) {
      this.selectedAttributesFilters = value
    },

    setSelectedBadgeFilters(value) {
      this.selectedBadgeFilters = value
    },

    setFilteredAllCategories(value) {
      this.filteredAllCategories = value;
    },

    sortAllCategories() {
      let allCategories = this.categories;
      
      allCategories.forEach(category => {
        if (this.selectedPriceFilters && this.selectedPriceFilters.length > 0) {
          category.products = this.sortProductByPrice(category.products);
        }

        if (this.selectedBadgeFilters && this.selectedBadgeFilters.length > 0) {
          category.products = this.sortPdoductsByBadges(category.products);
        }

        if (this.selectedAttributesFilters && this.selectedAttributesFilters.length > 0) {
          category.products = this.sortPdoductsByAttributes(category.products);
        }
      })

      this.setFilteredAllCategories(allCategories);
    },

    sortProductByPrice(products = null) {
      if (this.selectedPriceFilters && this.selectedPriceFilters.length > 0) {
        products = products ? products : this.currentCategory.products;
  
        if (this.selectedPriceFilters == 'up') {
          let temp = products;
          temp.sort((a, b) => +a.price - +b.price);
          return temp
        }
        else if (this.selectedPriceFilters == 'down') {
          let temp = products;
          temp.sort((a, b) => +b.price - +a.price);
          return temp
        }
      }
    },

    sortPdoductsByAttributes(products = null) {
      if (this.selectedAttributesFilters && this.selectedAttributesFilters.length > 0) {
        products = products ? products : this.currentCategory.products;
  
        let filteredProducts = [];
  
        products.forEach(product => {
            product.attributes.forEach(attribute => {
                attribute.options.forEach(option => {
                    if (this.selectedAttributesFilters.includes(decodeURIComponent(option))) {
                      filteredProducts.push(product);
                    }
                });
            });
        });
  
        filteredProducts = [... new Set(filteredProducts)];
        
        
        return filteredProducts;
      }
    },

    sortPdoductsByBadges(products = null) {
      if (this.selectedBadgeFilters && this.selectedBadgeFilters.length > 0) {
        products = products ? products : this.currentCategory.products;
  
        let filteredProducts = products.filter(product => {
          return this.selectedBadgeFilters.every(filter => product.acf['product-badge'] && product.acf['product-badge'].includes(filter));
        }).flat();
  
        return filteredProducts;
      }
    },

    resetFilters() {
      const commonStore = useCommonStore();

      this.setSelectedPriceFilters(null);

      this.setSelectedAttributesFilters(null);

      this.setSelectedBadgeFilters(null);

      this.setFilteredAllCategories(null);

      if (commonStore.fragmentedCatalog) {
        this.getCatalogByLocation();
      }
      else {
        this.getCatalog();
      }
    },

    addToFavorite (value) {
      const commonStore = useCommonStore()
      const userStore = useUserStore();

      const config = useRuntimeConfig();

      const { isAuth } = storeToRefs(userStore);

      this.favorites.push(value)

      if (isAuth.value) {
        userStore.SetFavourites(config, this.favorites);
      }

      commonStore.addNotification({
        type: null,
        text: 'Товар добавлен в избранное',
        status: 'success'
      })
    },

    removeFromFavorite (value) {
      const commonStore = useCommonStore()
      const userStore = useUserStore();

      const config = useRuntimeConfig();

      const { isAuth } = storeToRefs(userStore);

      this.favorites.find((item, i) => {
        if (item === value) {
          this.favorites.splice(i, 1)

          commonStore.addNotification({
            type: null,
            text: 'Товар удален из избранного',
            status: 'success'
          })
          
          if (isAuth.value) {
            userStore.SetFavourites(config, this.favorites);
          }

          return true
        }
        return false
      })
    },

     async toggleModalBurger() {
      this.burger = !this.burger
    }
  },

  getters: {
    slugProduct() {
      if (this.productSlug && this.allProducts.length) {
        return this.allProducts.find(item => item.slug === this.productSlug);
      }
      return null;
    },
    allProducts() {
      const products = [];
      this.catalog.map(cat => cat.products.map(item => products.push(item)));
      return products;
    },
    subCategories() {
      return this.currentCategory?.subCategories;
    },
    hasSubCategories() {
      return !!this.currentCategory?.subCategories.length;
    },
    currentCategory(state) {
      return this.categories.find(cat => +cat.id === +state.currentCategoryId) || null;
    },
    filteredCatalog: (state) => {
      const commonStore = useCommonStore()
      const warehouseId = commonStore.selectedLocation?.warehouse_id || null

      const blockedArray = ['uncategorized']
      const catalog = state.catalog.filter(item => {
        let status = true

        if (item.parent === 15)
        status = false

        blockedArray.forEach(blocked => {
          if (item.name.toLowerCase().includes(blocked)) {
            status = false
          }
        })
       
        return status
      })

      if (!commonStore.fragmentedCatalog && warehouseId) {
        return catalog.map(item => {
          const products = item.products.filter(product => {
            if (product.in_stock) {
              return product.locations.find(location => location.id === warehouseId)
            }
          })
      
          return {
            ...item,
            products
          }
        })
      }

      return catalog.map(item => {
        const products = item.products.filter(product => product.in_stock)

        return {
          ...item,
          products
        }
      })
    },

    filtersCount() {
      return +(!!this.selectedPriceFilters) 
      + +this.selectedBadgeFilters?.length 
      + +this.selectedAttributesFilters?.length;
    },

    categories () {
      return this.filteredCatalog.map(item => !item.parent
          ?
          {...item, subCategories: this.filteredCatalog
          .filter(cat => +cat.parent === +item.id)}
          :
          item
      ).filter(item => !+item.parent)
    },

    uncategorizedProducts: (state) => {
      const blockedArray = ['uncategorized']
      const catalog = state.catalog.filter(item => {
        let status = false

        if (item.parent === 15){
          status = true;
        }

        blockedArray.forEach(blocked => {
          if (item.name.toLowerCase().includes(blocked)) {
            status = true;
          }
        })
       
        return status;
      })

      return catalog.flatMap(item => item.products);
    },

    relatedItems: (state) => {
      return (related) => {
        const array = []

        related.forEach(id => {
          state.catalog.find(item => {
            const product = item.products.find(product => +product.id === +id)
            if (product) {
              array.push(product)
              return true
            }
            return false
          })
        })

        return array
      }
    },
    getProductById: (state) => (productId) => {
      let data = null
      console.log("get product id productId: " + productId)
      state.catalog.find(item => {
        item.products.find(product => {
          if (+product.id === +productId) {
            data = product
            return true
          }
          return false
        })
      })
      return data
    },
    selectedProduct: (state) => (parentId = null) => {
      if (!state.selectedProductId) return;
      
      let data = null

      const productId = state.selectedProductId

      state.catalog.find(item => {
        item.products.find(product => {
          if (+product.id === +productId) {
            data = product
            return true
          }
          return false
        })
      })

      if (data.related_ids?.length === 0 && parentId && parentId !== undefined) {
        let parentProduct = state.getProductById(parentId);

        data.related_ids = parentProduct.related_ids;
      }

      return data
    },

    isShowProductModal: (state) => {
      return !!state.selectedProductId
    },
    isShowBurgerModal: (state) => {
      return !!state.burger
    },

    isProductFavorite: (state) => {
      return (productId) => {
        return state.favorites.includes(productId)
      }
    },

    favoriteProducts: (state) => {
      const arr = []
      const blockedArray = ['новинки', 'акции']

      state.catalog.forEach(item => {
        let isFind = true
        blockedArray.forEach(blocked => {
          if (item.name.toLowerCase().includes(blocked)) {
            isFind = false
          }
        })
        
        if (isFind) {
          item.products.forEach(product => {
            if (state.favorites.includes(product.id)) {
              arr.push(product)
            }
          })
        }
      })

      const uniqueArray = arr.filter((obj, index, self) =>
        index === self.findIndex((t) => t.id === obj.id)
      );

      return uniqueArray
    },
  },

  persist: {
    storage: persistedState.localStorage,
    paths: ['favorites', 'catalogUrl', 'visitsToPaymentPage', 'activeOrders', 'selectedProductId', 'isOpenedFromCart', 'cartProductSelectedSupplements']
  },
})
