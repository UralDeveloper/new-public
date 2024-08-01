<template>
    <footer class="footer">
        <div class="gray-bg"></div>

        <div class="container footer-content">
            <div class="footer__top">

                <ClientOnly>
                    <div class="footer__col" style="gap: 100px;">
                        <div class="info">
                            <NuxtLink to="/">
                                <img src="@/assets/img/logo-2.png" alt="">
                            </NuxtLink>
                        </div>

                        <div class="info">
                            <a :href="'tel:' + phone" target="_blank" class="footer__phone">{{ phoneFormat(phone) }}</a>
                            <p class="footer__time" v-if="TimeDay">
                                <UIIcon name="clock" />
                                {{ TimeDay }}
                            </p>
                            <p class="footer__time" v-else>
                                <UIIcon name="clock" />
                                12:00 - 00:00
                            </p>
                        </div>
                    </div>
                </ClientOnly>


                <div class="footer__row">
                    <div class="footer__col">
                        <p class="footer__title">
                            Меню
                        </p>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/delivery">Доставка</NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="#">Бонусная карта</NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/gifts">Сертификаты</NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/products">Торты на заказ</NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/events">Мероприятия</NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div class="footer__col">
                        <ClientOnly>
                            <ul class="footer__menu footer-menu">
                                <li class="nav-item">
                                    <NuxtLink class="nav-link" to="/halls">Банкетные залы</NuxtLink>
                                </li>
                                <li class="nav-item">
                                    <NuxtLink class="nav-link" to="/gallery">Галерея</NuxtLink>
                                </li>
                                <li class="nav-item">
                                    <NuxtLink class="nav-link" to="#">Условия доставки</NuxtLink>
                                </li>
                                <li class="nav-item">
                                    <NuxtLink class="nav-link" to="#">Условия оплаты</NuxtLink>
                                </li>
                            </ul>
                        </ClientOnly>

                    </div>
                </div>

                <div class="footer__col">
                    <div class="footer__block">
                        <p class="footer__title" style="font-family: 'Lighthaus'">
                            Будь в курсе событий!
                        </p>
                        <UIInput placeholder="E-mail" color="gray" label="Подпишитесь на E-mail рассылку" />
                    </div>
                </div>
            </div>

            <div class="footer__bottom">
                <NuxtLink to="#" class="footer__copy">
                    Политика конфиденциальности
                </NuxtLink>


                <p class="footer__copy lf-copyright" style="gap: 2px;">
                    Сайт создан:
                    <a href="https://dolinger-web.ru/" target="_blank">
                        Dolinger Web
                    </a>
                </p>

            </div>
        </div>
    </footer>
</template>

<script setup>
const catalogStore = useCatalogStore()
const commonStore = useCommonStore()
const config = useRuntimeConfig()

const phone = computed(() => commonStore.getPhone)

const TimeDay = computed(() => commonStore.getWorkTime)

const appTitle = commonStore?.titleDescription?.name

</script>

<style lang="scss" scoped>
.footer {
    position: relative;
    padding: 40px 0;

    background: url('@/assets/img/footer.jpg');
    border-top: 1px solid var(--grayBg);

    font-family: 'Vela Sans';

    @include mq($bp-medium) {
        padding: 70px 0 40px;
    }

    &-content>* {
        z-index: 10;
    }

    &__box {
        display: flex;
        flex-direction: column;
    }

    &__top {
        display: flex;
        flex-direction: column;
        grid-gap: 30px;
        position: relative;


        @include mq($bp-medium-big) {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            grid-gap: 0;
        }
    }

    &__row {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        grid-gap: 30px;

        @include mq($bp-super-small) {
            flex-direction: row;
            justify-content: space-between;
        }

        @include mq($bp-medium) {
            grid-gap: 120px;
        }

        @include maq($bp-bigger) {
            grid-gap: 40px;
            justify-content: start;
        }
    }

    &__col {
        display: flex;
        flex-direction: column;

        @include mq($bp-super-small) {
            padding: 0 20px;
        }
    }

    &__phone {
        margin-bottom: 9px;

        @include text_large;
        font-weight: 600;

        text-wrap: nowrap;

        @include mq($bp-medium) {
            @include h2;
            font-weight: 600;
        }
    }

    &__time {
        display: flex;
        align-items: center;
        grid-gap: 10px;
        padding-top: 12px;

        color: var(--grayText);
        @include text_normal;
        font-weight: 600;

        @include mq($bp-medium) {
            @include text_big;

            padding-left: 4px;
        }
    }

    &__block {
        display: flex;
        flex-direction: column;

        padding: 0 20px;
        margin-bottom: 40px;

        &:last-child {
            margin-bottom: 0;
        }

        &--app {
            padding: 16px;
            padding-left: 0;
            padding-top: 0;
        }

        &--socials {
            padding-left: 0;
        }

        @include maq($bp-small) {
            padding-left: 0;
        }
    }

    &__title {
        margin-bottom: 20px;

        color: var(--grayText2);

        @include text_big;
        font-weight: 600;

        @include mq($bp-medium) {
            @include text_large;
            font-weight: 700;
        }
    }

    &__apps {
        display: flex;

        flex-direction: row;
        grid-gap: 20px;
        max-width: 420px;
        width: 100%;

        @include mq($bp-super-small) {
            flex-direction: row;
            align-items: flex-start;
        }

    }

    &__socials {
        display: flex;
        align-items: center;
        grid-gap: 40px;
    }

    &__bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        grid-gap: 10px;
        flex-wrap: wrap;
        margin-top: 30px;
        padding-top: 16px;

        position: relative;

        z-index: 10 !important;

        border-top: 1px solid #D9D9D9;

        @include mq($bp-medium) {
            margin-top: 50px;
            padding-top: 22px;
        }

        @include maq($bp-small) {
            margin-bottom: 70px;
        }

        .lf-copyright {
            display: flex;
            gap: 10px;
            flex-wrap: nowrap;
            align-items: center;
            @include text_normal;
        }
    }

    &__copy {
        text-decoration: none;
        color: var(--grayText);

        @include text_small;

        @include mq($bp-medium) {
            //@include text_big;
            @include text_normal;
        }
    }

    //&__to-top {
    //  flex: 0 0 auto;
    //
    //  display: flex;
    //  align-items: center;
    //  justify-content: center;
    //
    //  width: 44px;
    //  height: 44px;
    //  background: $orange;
    //  border-radius: 50%;
    //
    //  position: absolute;
    //  bottom: 70px;
    //  right: 15px;
    //
    //  .ui-icon {
    //    transform: rotate(-90deg);
    //    ::v-deep svg path{
    //      fill: $white;
    //    }
    //  }
    //}
}

.footer-menu {
    display: grid;
    grid-gap: 16px 30px;

    @include mq($bp-medium) {
        grid-gap: 15px 60px;
    }

    @include mq($bp-big) {
        grid-gap: 15px 30px;
    }

    &--double {
        grid-template-columns: repeat(2, 1fr);

        @include maq($bp-big) {
            grid-template-columns: repeat(1, 1fr);
        }

        @include maq($bp-medium-big) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    &__link {
        display: block;

        @include text_small;
        font-weight: 500;
    }
}

.footer__menu_subcategories {
    margin-top: 10px;
    margin-left: 10px;
}

.footer-app {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 48px;
    padding: 0 20px;
    flex-grow: 1;
    max-width: 180px;
    width: 100%;

    background: transparent;
    border-radius: 14px;

    padding-left: 0;

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__label {
        @include text_mini;
        font-weight: 400;
        color: #C1C1C1;
    }

    &__value {
        @include text_normal;
        font-weight: 600;

        white-space: nowrap;
    }
}

.gray-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #262523F0;
    z-index: 2;
}

.nav-link {
    color: var(--white);
    font-weight: 400;
}

ul {
    list-style: none;
}
a {
    text-decoration: none;
    color: var(--grayText);
}
</style>
