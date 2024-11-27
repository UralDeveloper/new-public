<template>
    <div class="firstScreen">
        <img :data-src="restaurant?.home?.main_image" class="bg-image" alt="" v-lazy-load
            :key="restaurant?.home?.main_image">
        <div class="container firstScreen-container">
            <div class="firstScreen-titleBlock firstScreen-titleBlock-centered">
            </div>
            <div class="firstScreen-navigation">
                <div class="firstScreen-navigation-item">
                    <nuxt-link to="/#cardloyal" class="btn">
                        <img src="/assets/img/icons/QR.png" alt="">
                        Бонуснаяя карта
                    </nuxt-link>
                </div>
                <div class="firstScreen-navigation-item">
                    <nuxt-link to="/menu" class="btn">
                        <img src="/assets/img/icons/package.png" alt="">
                        Меню
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>

    <div class="shortTextBlock shortTextBlock-about">
        <div class="container shortTextBlock-container">
            <div class="shortTextBlock-text">
                <p>Паблик — это не просто ресторан, а место, где каждый день царит атмосфера праздника!</p>
                <p>Здесь каждый найдет что-то особенное — будь то важное событие, романтический ужин или уютный вечер с близкими. Для маленьких гостей предусмотрена детская комната, где дети могут весело и безопасно играть, пока взрослые наслаждаются отдыхом.</p>
                <p>Побалуйте себя изысканными блюдами кухни России, наслаждайтесь приятной музыкой и живым общением. Кроме того, в ресторане регулярно проходят мероприятия для взрослых и детей, делая каждый визит незабываемым!</p>
            </div>
        </div>
    </div>

    <!-- Галерея карусель -->
    <div class="gallery">
        <div class="container">
            <div class="titleBlock">
                <h2>Галерея</h2>
            </div>
            <div class="swiper gallery-swiper">
                <div class="gallery-swiper-wrapper swiper-wrapper">
                    <div class="galleryItem swiper-slide" v-for="(item, index) in restaurant?.home.main_gallery" :key="index">
                        <picture>
                            <source :srcset="item" type="image/webp"><img data-fancybox="gallery" :data-src="item"
                                alt="" v-lazy-load :key="index">
                        </picture>
                    </div>
                </div>
                <div class="swiper-navigation">
                    <div class="swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <mask id="mask0_472_1837" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="30" height="30">
                                <rect width="30" height="30" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_472_1837)">
                                <path
                                    d="M13.0672 14.9999L18.1586 20.0913C18.3316 20.2644 18.4202 20.4819 18.4242 20.7439C18.4282 21.0059 18.3397 21.2275 18.1586 21.4086C17.9775 21.5897 17.7579 21.6802 17.4999 21.6802C17.2419 21.6802 17.0224 21.5897 16.8413 21.4086L11.2235 15.7908C11.1065 15.6738 11.024 15.5504 10.9759 15.4206C10.9278 15.2908 10.9038 15.1506 10.9038 14.9999C10.9038 14.8493 10.9278 14.7091 10.9759 14.5793C11.024 14.4495 11.1065 14.3261 11.2235 14.2091L16.8413 8.59132C17.0144 8.41823 17.2319 8.32969 17.4939 8.32569C17.7559 8.32167 17.9775 8.41021 18.1586 8.59132C18.3397 8.7724 18.4302 8.99194 18.4302 9.24994C18.4302 9.50794 18.3397 9.72748 18.1586 9.90857L13.0672 14.9999Z"
                                    fill="white" />
                            </g>
                        </svg>
                    </div>
                    <div class="swiper-button-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <mask id="mask0_472_1841" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="30" height="30">
                                <rect width="30" height="30" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_472_1841)">
                                <path
                                    d="M16.1828 15L11.0915 9.90861C10.9184 9.73554 10.8299 9.518 10.8259 9.25598C10.8218 8.99398 10.9104 8.77244 11.0915 8.59136C11.2726 8.41025 11.4921 8.3197 11.7501 8.3197C12.0081 8.3197 12.2276 8.41025 12.4087 8.59136L18.0265 14.2091C18.1435 14.3261 18.226 14.4495 18.2741 14.5793C18.3222 14.7091 18.3462 14.8493 18.3462 15C18.3462 15.1506 18.3222 15.2908 18.2741 15.4206C18.226 15.5505 18.1435 15.6738 18.0265 15.7908L12.4087 21.4086C12.2357 21.5817 12.0181 21.6702 11.7561 21.6742C11.4941 21.6783 11.2726 21.5897 11.0915 21.4086C10.9104 21.2275 10.8198 21.008 10.8198 20.75C10.8198 20.492 10.9104 20.2724 11.0915 20.0914L16.1828 15Z"
                                    fill="white" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
    <!-- Мероприятия карусель -->
    <!-- <div class="events">
        <div class="container swiper events-swiper">
            <div class="titleBlock">
                <h2>Мероприятия</h2>
            </div>
            <div class="events-wrapper swiper-wrapper">
                <PagesEventsCard :extraClass="`swiper-slide`" v-for="event in events" :key="event.id" :item="event"
                    @selected="selectedEvent = event" />
            </div>
        </div>
    </div> -->

    <div id="childrensRoom" class="chldrensRoom">
        <div class="container chldrensRoom-container">
            <div class="chldrensRoom-text">
                <div class="titleBlock">
                    <h2>Детская комната в ресторане Public</h2>
                </div>
                <p>В нашем ресторане предусмотрена уютная детская комната, где ваши дети смогут весело провести время,
                    пока вы наслаждаетесь отдыхом. В комнате есть игрушки и развлечения для малышей разных возрастов. За
                    безопасностью и комфортом детей присматривает опытная няня. Вы можете быть спокойны, зная, что дети
                    находятся под надежным присмотром в специально оборудованной зоне для игр.</p>
            </div>
            <div class="chldrensRoom-img">
                <div class="swiper chldrensRoom-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide chldrensRoom-item" v-for="(item, index) in restaurant?.home.slides" :key="index"><img :data-src="item" alt="" v-lazy-load :key="item"></div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <mask id="mask0_472_1837" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="30" height="30">
                                <rect width="30" height="30" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_472_1837)">
                                <path
                                    d="M13.0672 14.9999L18.1586 20.0913C18.3316 20.2644 18.4202 20.4819 18.4242 20.7439C18.4282 21.0059 18.3397 21.2275 18.1586 21.4086C17.9775 21.5897 17.7579 21.6802 17.4999 21.6802C17.2419 21.6802 17.0224 21.5897 16.8413 21.4086L11.2235 15.7908C11.1065 15.6738 11.024 15.5504 10.9759 15.4206C10.9278 15.2908 10.9038 15.1506 10.9038 14.9999C10.9038 14.8493 10.9278 14.7091 10.9759 14.5793C11.024 14.4495 11.1065 14.3261 11.2235 14.2091L16.8413 8.59132C17.0144 8.41823 17.2319 8.32969 17.4939 8.32569C17.7559 8.32167 17.9775 8.41021 18.1586 8.59132C18.3397 8.7724 18.4302 8.99194 18.4302 9.24994C18.4302 9.50794 18.3397 9.72748 18.1586 9.90857L13.0672 14.9999Z"
                                    fill="white" />
                            </g>
                        </svg>
                    </div>
                    <div class="swiper-button-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <mask id="mask0_472_1841" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                width="30" height="30">
                                <rect width="30" height="30" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_472_1841)">
                                <path
                                    d="M16.1828 15L11.0915 9.90861C10.9184 9.73554 10.8299 9.518 10.8259 9.25598C10.8218 8.99398 10.9104 8.77244 11.0915 8.59136C11.2726 8.41025 11.4921 8.3197 11.7501 8.3197C12.0081 8.3197 12.2276 8.41025 12.4087 8.59136L18.0265 14.2091C18.1435 14.3261 18.226 14.4495 18.2741 14.5793C18.3222 14.7091 18.3462 14.8493 18.3462 15C18.3462 15.1506 18.3222 15.2908 18.2741 15.4206C18.226 15.5505 18.1435 15.6738 18.0265 15.7908L12.4087 21.4086C12.2357 21.5817 12.0181 21.6702 11.7561 21.6742C11.4941 21.6783 11.2726 21.5897 11.0915 21.4086C10.9104 21.2275 10.8198 21.008 10.8198 20.75C10.8198 20.492 10.9104 20.2724 11.0915 20.0914L16.1828 15Z"
                                    fill="white" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="cardloyal" class="shortTextBlock">
        <div class="container shortTextBlock-container">
            <div class="shortTextBlock-text loyal">
                <div class="titleBlock">
                    <h2>Программа лояльности</h2>
                </div>
                <p>В нашем ресторане действует накопительная бонусная система! Получайте 5% бонусов на карту с каждого
                    чека при её получении. 1 бонус равен 1 рублю. Бонусами можно оплатить до 100% суммы покупки</p>
                <a class="btn btn-primary shortTextBlock-btn"
                    href="https://form.p-h.app/8e7437ec72c5e2c575a269710da141df">Получить карту</a>
            </div>
        </div>
    </div>

    <div class="formResume">
        <div class="container-fluid formResume-container">
            <div class="formResume-image">
                <img src="@/assets/img/remove/resumeBg.jpg" alt="">
            </div>
            <div class="formResume-block">
                <h2>Присоединяйтесь к нашей команде</h2>
                <form id="formResume-form" action="#">
                    <div class="form-floating">
                        <input type="text" class="form-control" required id="floatingInput" placeholder="Имя и Фамилия">
                        <label for="floatingInput">Имя и Фамилия</label>
                    </div>
                    <div class="form-floating">
                        <input type="tel" class="form-control" required id="floatingInput" placeholder="Номер телефона">
                        <label for="floatingInput">Номер телефона</label>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" required id="floatingInput" placeholder="E-mail">
                        <label for="floatingInput">E-mail</label>
                    </div>
                    <div class="">
                        <label for="formFile" class="form-label">Ваше резюме</label>
                        <input class="form-control" type="file" id="formFile">
                    </div>
                    <div class="formResume-form-footer">
                        <span>Нажимая кнопку “Отправить резюме” Вы принимаете условия <a href="#">пользовательского
                                соглашения</a> и политики конфиденциальности</span>
                        <button type="button" class="btn btn-primary">Отправить резюме</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div id="footerMap" class="footerMap">
        <div class="container">
            <div class="footerMap-contacts">
                <p class="footerMap-contacts-blockTitle">Контакты</p>
                <div class="footerMap-contacts-item">
                    <div class="footerMap-contacts-title">Телефон</div>
                    <div class="footerMap-contacts-wrapper">
                        <div class="footerMap-contacts-info">
                            <img src="assets/img/icons/Icon_call.svg" alt="">
                            <NuxtLink to="tel:+73433753216">+7 (343) 375-32-16</NuxtLink>
                        </div>
                        <!-- <div class="footerMap-contacts-info">
                            <img src="assets/img/icons/Icon_call.svg" alt="">
                            <NuxtLink to="tel:+7 (495) 123-45-67">+7 (495) 123-45-67</NuxtLink>
                        </div> -->
                    </div>
                </div>
                <div class="footerMap-contacts-item">
                    <div class="footerMap-contacts-title">Режим работы</div>
                    <div class="footerMap-contacts-wrapper">
                        <div class="footerMap-contacts-info">
                            <img src="assets/img/icons/Icon_schedule.svg" alt="">
                            <span>12:00 - 00:00</span>
                        </div>
                    </div>
                </div>
                <div class="footerMap-contacts-item">
                    <div class="footerMap-contacts-title">Адрес</div>
                    <div class="footerMap-contacts-wrapper">
                        <div class="footerMap-contacts-info">
                            <img src="assets/img/icons/Icon_location_on.svg" alt="">
                            <span>г. Екатеринбург, ул. Мира, 47\4, 3 этаж</span>
                        </div>
                    </div>
                </div>
                <div class="footerMap-contacts-item">
                    <div class="footerMap-contacts-wrapper">
                        <div class="footerMap-contacts-social">
                            <a href="https://vk.com/public__rest">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M31.5 63.5C0 95 0 145.7 0 247V265C0 366.3 0 417 31.5 448.5C63 480 113.7 480 215 480H233C334.3 480 385 480 416.5 448.5C448 417 448 366.3 448 265V247C448 145.7 448 95 416.5 63.5C385 32 334.3 32 233 32H215C113.7 32 63 32 31.5 63.5zM75.6 168.3H126.7C128.4 253.8 166.1 290 196 297.4V168.3H244.2V242C273.7 238.8 304.6 205.2 315.1 168.3H363.3C359.3 187.4 351.5 205.6 340.2 221.6C328.9 237.6 314.5 251.1 297.7 261.2C316.4 270.5 332.9 283.6 346.1 299.8C359.4 315.9 369 334.6 374.5 354.7H321.4C316.6 337.3 306.6 321.6 292.9 309.8C279.1 297.9 262.2 290.4 244.2 288.1V354.7H238.4C136.3 354.7 78 284.7 75.6 168.3z"/>
                                </svg>
                            </a>
                            <a href="https://wa.me/79920902825">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerMap-map">
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A14ee01beacd8c74e18a0336bace632024d8f2eb834f7e3731d73818161f88828&amp;source=constructor"
                width="100%" frameborder="0"></iframe>
        </div>
    </div>

    <LazyModalsEvent :item="selectedEvent" />
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const commonStore = useCommonStore();

const { events, restaurant } = storeToRefs(commonStore)

const selectedEvent = ref(null);

watchEffect(() => {
    nextTick(() => {
        if (process.client) {
            let gallerySlider = new Swiper(".gallery-swiper", {
                modules: [Navigation, Pagination],
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                centeredSlides: true,
                pagination: {
                    el: ".swiper-pagination",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            })

            let eventSlider = new Swiper(".events-swiper", {
                slidesPerView: 3,
                spaceBetween: 24,
                rewind: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    }
                }
            })

            let chldrensRoomSlider = new Swiper(".swiper.chldrensRoom-swiper", {
                modules: [Navigation, Pagination],
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                centeredSlides: true,
                pagination: {
                    el: ".swiper-pagination",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            })

        }
    })
})
</script>

<style lang="scss" scoped>
.firstScreen {
    position: relative;

    .bg-image {
        position: absolute;
        z-index: -1;
        object-fit: cover;
        max-height: 95vh;
        width: 100%;
    }
}

.galleryItem img {
    // object-fit: contain;   
}

.chldrensRoom-item {
    max-height: 500px;
    height: auto;
}
.shortTextBlock-container {
    border-bottom: none;
}
.shortTextBlock-text.loyal {
    // padding-bottom: 30px;
}

.footerMap {

    position: relative;

    @include maq($bp-big) {

        &-contacts {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    @include maq($bp-small) {
        height: 400px;
        margin-top: 500px;

        &-contacts {
            top: -450px;
            width: calc(100vw - 30px);

            padding: 40px 20px;

            gap: 30px;

            &-blockTitle {
                font-size: 32px;
            }

            &-title {
                font-size: 14px;
            }

            &-wrapper {
                display: flex;
                flex-direction: column;
            }

            &-info {

                & a,
                span {
                    font-size: 16px;
                }
            }
        }

        &-map {
            height: 400px;

            & iframe {
                height: 400px;
            }
        }
    }
}
</style>