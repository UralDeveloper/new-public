<template>

  <div v-if="response" v-html="response" class="game"></div>

  <div
    v-else
    class="loader"
  >
    <UILoader is-big />
  </div>

</template>

<script setup>

const userStore = useUserStore();
const config = useRuntimeConfig();
const response = ref(null);

const data = await userStore.getGame(config);

response.value = data?.value || null;
</script>

<style lang="scss" scoped>
.game {
  width: 80%;

  @include maq($bp-medium) {
      width: 100%;
  }

  :deep(.canvas-wrapper) {
    max-width: 400px;
    width: 100%;
  }

  :deep(.week-days) {
    width: 80%;

    @include maq($bp-big) {
      width: 100%;
    }
  }

  :deep(.week-days-wrapper) {
    @include maq($bp-super-small) {
      height: 100px;
    }
  }
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 100px 0;
}
</style>