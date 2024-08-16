<template>
  <div class="page-lk-personal container">
    <h2 class="page-lk-personal__title">
      Личная информация
    </h2>

    <PagesLkUserBlock />

    <form
      class="page-lk-personal__form"
      @submit.prevent="onSubmit()"
    >
      <!-- <pre>
        user: {{ user }}
      </pre> -->
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          Имя
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            v-model="form.name"
            color="white"
          />
          <UIIcon
            name="pencil"
            class="page-lk-personal__icon"
          />
        </div>
      </div>
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          Номер телефона
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            :value="form.phone"
            color="white"
            disabled
          />
        </div>
      </div>
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          E-mail
          <UIIcon name="info" />
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            v-model="form.email"
            color="white"
          />
          <UIIcon
            name="pencil"
            class="page-lk-personal__icon"
          />
        </div>
      </div>
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          Дата рождения
          <UIIcon name="info" />
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            v-model="form.birth"
            color="white"
          />
          <UIIcon
            name="pencil"
            class="page-lk-personal__icon"
          />
        </div>
      </div>
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          Пол
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            v-model="form.sex"
            color="white"
          />
          <UIIcon
            name="pencil"
            class="page-lk-personal__icon"
          />
        </div>
      </div>
      <div class="page-lk-personal__buttons">
        <UIButton
          type="submit"
          color="yellow"
          :is-loading="isLoading"
          class="page-lk-personal__button"
        >
          Сохранить
        </UIButton>
      </div>
    </form>

    <PagesLkIndexAddresses />
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useCommonStore } from '@/store/common'

const userStore = useUserStore()
const commonStore = useCommonStore()
const config = useRuntimeConfig()

useServerSeoMeta({
  title: 'Личный кабинет' ,
  description: 'Личный кабинет' ,
})
setHeadMetaData({
  title : 'Личный кабинет',
  seo_title : 'Личный кабинет',
  description : 'Личный кабинет',
});

const form = reactive({
  name: '',
  phone: '',
  email: '',
  birth: '',
  sex: null,
})
const isLoading = ref(false)

// <!-- Computed -->
const token = computed(() => userStore.token)
const user = computed(() => userStore.user)

// <!-- Methods -->
const onSubmit = async () => {
  isLoading.value = true

  const obj = {
    name: form.name,
    email: form.email,
    birth: form.birth,
    token: token.value,
  }

  const { data } = await useFetch(`${config.public.BASE_URL}/wp-json/system/users/update`, {
    method: 'POST',
    body: obj
  })

  isLoading.value = false

  if (data?.value?.success) {
    userStore.updateUser({
      display_name: form.name,
      user_email: form.email,
      birth: form.birth,
    })

    commonStore.addNotification({
      type: null,
      text: 'Информация успешно обновлена',
      status: 'success',
    })
  }
}

const setDefault = () => {
  if (user.value) {
    form.name = user.value.display_name
    form.phone = user.value.phone
    form.email = user.value.user_email
    form.birth = user.value.birth
    form.sex = null
  }
}

setDefault()
</script>

<style lang="scss" scoped>
.page-lk-personal {
  display: grid;
  grid-gap: 40px;

  // @include mq($bp-medium) {
  //   max-width: 770px;
  // }

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: var(--black);
    }
  }

  &__form {
    display: grid;
    grid-gap: 16px;
  }

  &__line {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;

    @include mq($bp-medium) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__label {
    padding: 0 0 8px 16px;
    max-width: 200px;
    width: 100%;

    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_small;
    font-weight: 500;
    color: var(--grayText);

    :deep(.ui-icon) svg path {
      fill: var(--grayText2);
    }

    @include mq($bp-medium) {
      padding: 0;

      @include text_normal;
      font-weight: 500;
      color: var(--black);
    }
  }

  &__value {
    position: relative;

    width: 100%;
    max-width: 960px;

    font-weight: 500;
  }

  &__icon {
    position: absolute;

    top: 16px;
    right: 15px;

    width: 16px;
    height: 16px;

    :deep svg path {
      fill: #262626;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__button {
    font-weight: 500;
  }
}
</style>