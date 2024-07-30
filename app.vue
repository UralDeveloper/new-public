<template>
  <div class="app">
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const catalogStore = useCatalogStore();
const commonStore = useCommonStore();

await commonStore.loadSettings();

useHead({
  link: [
    { href: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap', rel: 'stylesheet' },
    { href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css', rel: 'stylesheet' }
  ],
  script: [
    { src: 'https://code.jquery.com/jquery-3.6.0.min.js', integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=', crossorigin: 'anonymous' },
    { src: '/assets/js/bootstrap.min.js' },
    { src: '/assets/js/bootstrap-datepicker.js' },
    { src: '/assets/js/swiper-bundle.min.js' },
    { src: '/assets/js/fancybox.umd.js' },
    { src: '/assets/js/script.js' }
  ]
})

commonStore.getTemplates();
//commonStore.getLogo()
commonStore.getInfoTitle();
commonStore.getMenu();
commonStore.getContacts();
commonStore.getBanners();
commonStore.getDeliveryTimes();

//commonStore.getLogo()
catalogStore.getCatalog();

</script>