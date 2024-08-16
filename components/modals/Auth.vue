<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="commonStore.toggleShowAuthModal(false)"
  >
    <div class="modal-auth">
      <div class="modal-auth__header">
        <p class="modal-auth__title">
          Вход на сайт
        </p>

        <a
          href="#"
          rel="nofollow"
          class="modal-auth__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>
      <p
        class="modal-auth__description"
      >
        {{ step === 'phone' ? 'Укажите номер телефона, чтобы войти на сайт' : 'Отправили код на номер:' }}
        <span
          v-if="step === 'code'"
          class="modal-auth__number"
        >
          {{ phoneObj?.formatted }}
          <a
            href="#"
            rel="nofollow"
            @click.prevent="toPrevStep()"
          >
            изменить
          </a>
        </span>
      </p>

      <form
        class="modal-auth__form"
        @submit.prevent="onSubmit()"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            v-if="step === 'phone'"
            class="modal-auth__line"
          >
            <label
              for=""
              class="modal-auth__label"
            >
              Номер телефона
            </label>
            <vue-tel-input
              v-model="phone"
              mode="international"
              :auto-format="false"
              :dropdown-options="{
                showFlags: true,
                showDialCodeInList: true,
                showDialCodeInSelection: true,
                showSearchBox: true
              }"
              :input-options="{
                type: 'tel',
                pattern: '[0-9]',
                placeholder: 'Телефон',
                required: true
              }"
              @on-input="onInputTel"
            />
          </div>

          <div
            v-else
            class="modal-auth__code"
          >
            <UICodeInput
              :fields="4"
              :field-width="48"
              :field-height="48"
              :is-error="isCodeError"
              :disabled="isLoading"
              @change="onChangeCode"
              @complete="onCompleteCode"
            />
            <div
              v-if="isCodeError"
              class="modal-auth__code-error"
            >
              <UIIcon name="close" />
              Неверный код
            </div>
          </div>
        </transition>

        <p class="modal-auth__note">
          Нажимая кнопку “Продолжить”, Вы принимаете <NuxtLink to="/">условия пользовательского соглашения</NuxtLink> и <NuxtLink to="/">политики конфиденциальности</NuxtLink>
        </p>
        <UIButton
          type="submit"
          color="yellow"
          :is-loading="isLoading"
          :disabled="isDisableButton"
          class="modal-auth__button"
        >
          Продолжить
        </UIButton>
      </form>
    </div>
  </ModalsOverlay>
</template>

<script setup lang="ts">
interface PhoneObj {
  countryCallingCode: String
  countryCode: String
  formatted: String
  nationalNumber: String
  number: String
  valid: Boolean
}

import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'

const commonStore = useCommonStore()
const userStore = useUserStore()
const config = useRuntimeConfig()

const consumer_key = config.public.CONSUMER_KEY
const consumer_secret = config.public.CONSUMER_SECRET

const isShow = ref(true)

const step = ref<'phone' | 'code'>('phone')
const phone = ref<String | null>(null)
const phoneObj = ref<PhoneObj | null>(null)
const code = ref<String | null>(null)
const isCodeError = ref<Boolean>(false)
const isLoading = ref<Boolean>(false)

watch(() => code.value, () => {
  isCodeError.value = false
})

const isDisableButton = computed(() => {
  if (step.value === 'phone') {
    // return !(phoneObj.value?.valid)
  } else if (step.value === 'code') {
    return !code.value || (code.value && code.value.length !== 4)
  }

  return false
})

const closeModal = () => {
  isShow.value = false
}

const onInputTel = (tel: String, obj: PhoneObj) => {
  phoneObj.value = obj
}

const onChangeCode = (val: String) => {
  code.value = val
}

const onCompleteCode = () => {
}

const toPrevStep = () => {
  step.value = 'phone'
  isCodeError.value = false
}

const sendCode = async () => {
  isLoading.value = true

  const obj = {
    phone: phoneObj.value?.number
  }

  const data = await userStore.sendCode(obj, config);

  isLoading.value = false

  if (data?.value?.success) {
    step.value = 'code';
  }
}

const checkCode = async () => {
  isLoading.value = true

  const obj = {
    phone: phoneObj.value?.number,
    'auth-sms-code': code.value
  }

  const data = await userStore.checkCode(obj, config);

  isLoading.value = false

  if (data?.value?.success) {
    const obj = data.value.user

   await getUser(obj.token)
  } else {
    isCodeError.value = true
    return false
  }
}

const getUser = async (token: string) => {
  isLoading.value = true

  await userStore.getUser(token, config);

  isLoading.value = false

    if (userStore.user) {
      navigateTo('/lk')
      closeModal()
    }
  
}

const onSubmit = () => {
  // if (step.value === 'phone' && phoneObj.value?.valid) {
  if (step.value === 'phone') {
    sendCode()
  } else if (step.value === 'code') {
    checkCode()
  }
}
</script>

<style lang="scss" scoped>
.modal-auth {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  padding: 20px;

  background: var(--white);

  @include mq($bp-small) {
    min-height: auto;
    max-width: 442px;

    padding: 50px 60px;

    border-radius: 40px;
  }

  &__close {
    :deep(.ui-icon) svg {
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

    margin-bottom: 20px;
  }

  &__title {
    @include h2;
  }

  &__description {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    @include text_big;

    margin-bottom: 40px;
  }

  &__form {
    max-width: 360px;
    margin: 0 auto;
  }

  &__number {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_normal;
    font-weight: 600;

    a {
      @include text_small;
      font-weight: 500;
      color: var(--orange);
    }
  }

  &__line {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__label {
    @include text_small;
    font-weight: 500;
    color: var(--grayText);
  }

  &__code {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 10px;
  }

  &__code-error {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_small;
    font-weight: 500;
    color: var(--red);

    :deep(.ui-icon) svg {
      width: 16px;
      height: 16px;

      path {
        fill: var(--red);
      }
    }
  }

  &__note {
    margin-top: 40px;
    margin-bottom: 12px;

    @include text_mini;

    a {
      color: var(--blue);
    }
  }

  &__button {
    width: 100%;

    font-weight: 500;
  }
}

:deep .vue-tel-input {
  grid-gap: 10px;

  background: none;
  border: 0;
  box-shadow: none !important;

  .vti__selection {
    font-size: 14px;
    font-weight: 600;

    .vti__country-code {
      color: var(--black);
      margin: 0 5px;
    }

    .vti__dropdown-arrow {
      color: var(--grayText2);
    }
  }

  .vti__dropdown {
    padding: 0;
    background: none;
  }

  .vti__dropdown-list {
    width: 368px;
    max-height: 270px;

    padding: 20px;

    border: 0;
    border-radius: 20px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

    &.below {
      top: calc(100% + 12px);
      left: -23px;
    }
  }

  .vti__search_box {
    width: calc(100% - 4px);

    margin: 0;

    border: 0;
  }

  .vti__dropdown-item {
    padding: 8px;

    &.highlighted {
      background-color: #f3f3f333;
    }
  }

  .vti__input {
    padding: 12px 16px;

    @include text_normal;
    font-weight: 500;

    background: var(--grayBg);
    border-radius: 14px;

    &::-webkit-input-placeholder {
      color: var(--grayText);
    }
    &:-moz-placeholder {
      color: var(--grayText);
      opacity:  1;
    }
    &::-moz-placeholder {
      color: var(--grayText);
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: var(--grayText);
    }
    &::-ms-input-placeholder {
      color: var(--grayText);
    }
    &::placeholder {
      color: var(--grayText);
    }
  }
}
</style>
