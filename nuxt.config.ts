import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
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

  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@import "@/assets/sass/_variables.sass"`
        }
      }
    }
  },

  compatibilityDate: '2024-07-26'
})