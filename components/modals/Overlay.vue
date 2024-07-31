<template>
  <div class="modal">
    <transition name="fade" mode="out-in">
      <div v-if="isVisible" class="modal__overlay" />
    </transition>

    <div :class="`modal__box modal__box--${position}`" @click.self="onClose()">
      <div class="modal__wrap" @click.self="onClose()">
        <transition :name="name === 'cart' ? 'cart' : 'slide-top'" mode="out-in">
          <div
            v-if="isVisible"
            class="modal__content"
            @click.self="onClose()"
          >
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "center",
  },
  offset: {
    type: Number,
    default: 20,
  },
  isShow: {
    type: Boolean,
    default: true,
  },
  style: {
    type: String,
  },
  // isTop: {
  //   type: Boolean,
  //   default: true
  // }
});

const emits = defineEmits(["close"]);

const isOverflowAdded = ref(false);
const isVisible = ref(false);

watch(
  () => props.isShow,
  (data) => {
    if (!data) {
      onClose();
    }
  }
);

const onClose = () => {
  isVisible.value = false;
  //console.log("overlay onClose does overflow-hidden exist: " + (document.body.classList.contains('overflow-hidden') ? 'true': 'false'))
  //console.log("overlay onClose isOverflowAdded: " + (isOverflowAdded.value ? 'true': 'false'))
  document.body.classList.remove("overflow-hidden");
  if (isOverflowAdded.value) {
    isOverflowAdded.value = false;
    //document.body.classList.remove('overflow-hidden')
  }

  setTimeout(() => {
    emits("close");
  }, 300);
};

onMounted(() => {
  isVisible.value = true;
  //console.log("overlay onMounted does overflow-hidden exist: " + (document.body.classList.contains('overflow-hidden') ? 'true': 'false'))
  //console.log("overlay onMounted isOverflowAdded: " + (isOverflowAdded.value ? 'true': 'false'))
  if (!document.body.classList.contains("overflow-hidden")) {
    isOverflowAdded.value = true;
    document.body.classList.add("overflow-hidden");
  }
});
</script>

<style lang="scss" scoped>
.modal {
  position: unset;
  display: flex;
  width: unset;
  height: unset;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2000;
  }

  &__box {
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    white-space: nowrap;
    z-index: 2001;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
      z-index: 2000;
    }
  }

  &__wrap {
    position: relative;
    height: 100%;

    @include mq($bp-small) {
      height: 90%;
    }

    &:after {
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 100%;
      content: "";
    }
  }

  &__content {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    white-space: normal;
    text-align: left;
    // height: 100%;

    @media screen and (max-width: 768px) {
      margin: 0 !important;
    }
  }
}

.modal__box--custom {
  .modal__wrap {
    @include flex-end;
    align-items: flex-end;
    width: 100%;
  }
}
</style>
