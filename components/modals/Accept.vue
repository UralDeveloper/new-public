<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="commonStore.toggleShowAcceptModal(false)"
  >
    <div class="modal-accept">
      <div class="modal-accept__header">
        <p class="modal-accept__title">
          {{ title }}
        </p>

        <a
          href="#"
          rel="nofollow"
          class="modal-accept__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>

      <div class="modal-accept__main">
        <p class="modal-accept__text">
          {{ text }}
        </p>
      </div>

      <div class="modal-accept__buttons">
        <UIButton
          color="yellow-outline"
          class="modal-accept__button"
          @click="cancel()"
        >
          Отменить
        </UIButton>

        <UIButton
          color="yellow"
          class="modal-accept__button"
          @click="submit()"
        >
          Подтвердить
        </UIButton>
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['cancel', 'accept'])

const isShow = ref(true)

const closeModal = () => {
  isShow.value = false
}

const cancel = () => {
  emits('cancel')
  closeModal()
}

const submit = () => {
  emits('accept')
  closeModal()
}
</script>

<style lang="scss" scoped>
.modal-accept {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  grid-gap: 50px;

  padding: 20px;

  background: var(--white);

  @include mq($bp-small) {
    min-height: auto;
    max-width: 450px;

    padding: 50px 60px;

    border-radius: 40px;
  }

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: var(--blackText);
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include h2;
  }

  &__main {
    @include text_big;
    font-weight: 600;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }

  &__button {
    font-weight: 500;
  }
}
</style>
