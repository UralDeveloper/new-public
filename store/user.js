export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: null,
    user: null,
    deliveryForm: null,
    bonusActive: false,
    bonusBalance: null,
    bonusesAvailableForUse: null,
    percentMax: null,
    addresses: [],
    appliedBonus: null,
    currentOrder: null,
    selectedCard: null,
  }),

  actions: {
    setToken (value) {
      this.token = value
    },

    setUser (value) {
      this.user = value
    },

    updateUser (value) {
      this.user = {
        ...this.user,
        ...value
      }
    },

    setDeliveryForm (value) {
      this.deliveryForm = value
    },
    async getUserBonuses(config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/systeminfo/v1/bonus`, {
        query: {
          user_id: this?.user?.id
        }
      })

      const obj = data?.value || null

      if (obj) {
        this.bonusActive = obj.active !== null ? obj.active : true
        this.bonusBalance = obj.points_balance
        this.percentMax = obj.percent_max
        this.bonusesAvailableForUse = obj.points_balance //Math.floor(obj.points_balance * (obj.percent_max / 100))
      }
    },
    async getUserAddresses (config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/auth/user/get_addresses`, {
        query: {
          token: this.token,
        }
      })

      const arr = data?.value || null

      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i];
          
          let obj = { 
            id: i,
            address: element.AddressLine,
            flat: element.apartment,
            entrance: element.entrance,
            floor: element.floor,
            number: '',
            comment: '',
            name: '',
            coords: element.coordinates
          }

          this.addAddress(obj);
        }
      }
    },

    addAddress (value) {
      this.addresses.push(value)
    },

    async addAddressToDB (config, obj) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/auth/user/get_addresses?token=${this.token}`, {
        method: 'POST',
        body: {
          user_id: this.user.id || this.user.ID,
          data: {
            ...obj
          }
        }
      })
    },

    editAddress (value) {
      this.addresses.find((item, i) => {
        if (item.id === value.id) {
          this.addresses[i] = {
            ...item,
            ...value
          }
          return true
        }

        return false
      })
    },
    setAppliedBonus(value) {
      this.appliedBonus =
          value <= this.bonusesAvailableForUse
              ?
              value
              :
              this.appliedBonus
    },

    async getUser(token, config){
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/system/users`, {
        query: {
          token: token
        }
      })

      if (data?.value?.status === 'success') {
        const user = data?.value?.data?.data || null

        if (user) {
          this.setToken(token)
          this.setUser({
            ...user,
            id: +user.ID,
          })
          
          await this.getUserAddresses(config)
          await this.getUserBonuses(config);
          await this.GetFavourites(config);
        }
      }
    },

    async sendCode(obj, config) {
      const consumer_key = config.public.CONSUMER_KEY
      const consumer_secret = config.public.CONSUMER_SECRET

      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/auth/send_code`, {
        // headers: {
        //   //"Authorization" : "Basic " + (btoa(consumer_key+':'+consumer_secret))
        //   "consumerKey":consumer_key,
        //   "consumerSecret": consumer_secret,
        // },
        query: {
          consumer_key,
          consumer_secret
        },
        method: 'POST',
        body: obj
      })

      return data;
    },

    async checkCode(obj, config) {
      const consumer_key = config.public.CONSUMER_KEY
      const consumer_secret = config.public.CONSUMER_SECRET

      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/auth/check_code`, {
        query: {
          consumer_key,
          consumer_secret
        },
        method: 'POST',
        body: obj
      })

      return data;
    },

    async getBalance(config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/systeminfo/v1/bonus`, {
        query: {
          user_id: this.user.id
        }
      })

      return data;
    },

    async getPromocodes(config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/systeminfo/v1/user/avaible_coupons`, {
        query: {
          user_id: this.user.id,
        },
      })

      return data;
    },

    async getReferals(config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/systeminfo/v2/coupons/referal_info`, {
        query: {
          token: this.token
        }
      })

      return data;
    },

    async getHistory(token, config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/systeminfo/v2/push/user_history`, {
        method: 'GET',
        params: {
          token
        }
      });

      return data;
    },

    async getOrders(config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/wc/v2/orders`, {
        query: {
          customer: this.user.id,
          consumer_key: config.public.CONSUMER_KEY,
          consumer_secret: config.public.CONSUMER_SECRET,
        },
      })

      return data;
    },

    async getGame(config) {
      const { data } = await useFetch(`${config.public.BASE_URL}/wheel/?user_id=${this.user.id}`, {
        method: 'GET'
      });

      return data;
    },

    async GetFavourites(config) {
      const catalogStore = useCatalogStore();

      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/systeminfo/v2/user_favorites?token=${this.token}`, {
        method: 'GET'
      });

      const response = data?.value || null;

      if (response) {
        catalogStore.favorites = response;
      }
    },

    async SetFavourites(config, obj) {
      let temp = {
        favorites: obj
      }

      const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/systeminfo/v2/user_favorites?token=${this.token}`, {
        method: 'POST',
        body: temp
      });
    },

  },

  getters: {
    isAuth: (state) => {
      return !!state.user;
    },
    getUserBonus: (state) => {
      return state.bonusBalance
    },
    getMaxPercent: (state) => {
      return state.percentMax
    },
    getAvailableForUseBonuses: (state) => {
      return state.bonusesAvailableForUse
    },
    getUserUsedBonuses: (state) => {
      return state.appliedBonus
    },
  },

  persist: true
});
