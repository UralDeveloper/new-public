import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    vercel: {
      functions: {
        maxDuration: 300,
      }
    }
  },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-lazy-load',
    ['@nuxtjs/robots', { configPath: "~/server/robots.config" }],
    "@nuxtjs/sitemap"
  ],

  css: [
    '@/assets/webfonts/VelaSans/stylesheet.css',
    '@/assets/webfonts/Lighthaus/stylesheet.css',
    '@/assets/css/fontawesome.css',
    '@/assets/css/swiper-bundle.min.css',
    '@/assets/css/fancybox.css',
    '@/assets/css/bootstrap.min.css',
    '@/assets/css/styles.min.css',
    '@/assets/sass/styles.sass'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'Люблю Еду',
      meta: [
        {
          name: 'description',
          content: '',
        },
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          // href: `/favicon-${domain}.ico`,
       },
      ],

      script: [
        {
          key: 'ymap',
          type: 'text/javascript',
          async: true,
          // src: `https://api-maps.yandex.ru/2.1/?apikey=d6cd6610-1c47-469b-a0a8-d3837c41887f&lang=ru_RU&load=Map,Placemark,GeoObject&coordorder=longlat`,
          src: `https://api-maps.yandex.ru/2.1/?apikey=${process.env.YMAPS_KEY}&lang=ru_RU&coordorder=longlat`,
        },
      ],
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@import "@/assets/sass/_variables.sass"`
        }
      }
    }
  },

  lazyLoad: {
    images: false,
    videos: false,
    audios: false,
    iframes: false,
    native: false,
    directiveOnly: true,
    defaultImage: 'assets/img/default-load.gif',
  },

  piniaPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 365 , // Время жизни куки в секундах (сейчас стоит год)
      path: '/',    // Путь для куки
      sameSite: 'lax', // Политика безопасности
    },
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  routeRules: {
    '/api/wp-json/**': {
      proxy: {
        to: `${process.env.BASE_URL}/wp-json/**`,
      },
    },
  },

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      YMAPS_KEY: '25c0a3b3-e6d6-4011-b5f3-2f346d8e584f',
      CONSUMER_KEY: 'ck_8e9043f849e95e6d003c3cc2474fc22b2ed01eec',
      CONSUMER_SECRET: 'cs_74c746f821c405606c0950997a33b194ffc06876'
    },
  },
  router: {
    mode: 'history',
    options: {}
  },

  compatibilityDate: '2024-07-26'
})