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

const { pickupLocations } = storeToRefs(commonStore)


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

onMounted(() => {
  // if (!commonStore.selectedLocation) {
  //   useChangeLocation('pickup', pickupLocations.value('pickup')[0]);
  // }
})

commonStore.loadSettings();
catalogStore.getCatalog();

commonStore.getPickups();
commonStore.getDelivery();
commonStore.getDeliveryTimes();

// commonStore.getTemplates();

// commonStore.getInfoTitle();
// commonStore.getMenu();
// commonStore.getContacts();
// commonStore.getBanners();
</script>

<style>
:root {
  --app-height: 100%;

  --white: #ffffff;

  --mainBg: #ffffff;

  --black: #000000;
  --blackText: #141414;
  --blackText2: #262523;
  --blackText3: #262626;

  --grayBg: #F5F4F2;
  --grayBg2: #F9F9F9;
  --grayText: #969696;
  --grayText2: #D9D9D9;

  --orange: #FF6600;
  --orangeLight: #FFEFE5;

  --yellow: #fff;
  --yellowLight: #eaeaea;
  --yellowLightSecondary: #FFF9DF;
  --yellowDark: #121212;

  --blue: #50ADCA;

  --red: #EC2525;

  --green: #49BA40;
  --greenLight: #E4F3D9;
  --greenDark: #089B43;
}
button {
  background: none;
  border: 0;
}
input, textarea {
  border: 0;
}
ul, p {
  padding: 0;
  margin: 0;
}
</style>