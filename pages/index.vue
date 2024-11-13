<template>
    <div class="firstScreen">
        <img :data-src="restaurant?.home?.main_image" class="bg-image" alt="" v-lazy-load
            :key="restaurant?.home?.main_image">
        <div class="container firstScreen-container">
            <div class="firstScreen-titleBlock firstScreen-titleBlock-centered">
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
                    <div class="galleryItem swiper-slide" v-for="(item, index) in restaurant?.home.slides" :key="index">
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
                        <div class="swiper-slide chldrensRoom-item"><img src="@/assets/img/remove/chldrensRoom_1.jpg" alt=""></div>
                        <div class="swiper-slide chldrensRoom-item"><img src="@/assets/img/remove/chldrensRoom_2.jpg" alt=""></div>
                        <div class="swiper-slide chldrensRoom-item"><img src="@/assets/img/remove/chldrensRoom_3.jpg" alt=""></div>
                        <div class="swiper-slide chldrensRoom-item"><img src="@/assets/img/remove/chldrensRoom_4.jpg" alt=""></div>
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

    <div class="shortTextBlock">
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
                <h2>Оставить заявку</h2>
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

    <div class="footerMap">
        <div class="container">
            <div class="footerMap-contacts">
                <p class="footerMap-contacts-blockTitle">Контакты</p>
                <div class="footerMap-contacts-item">
                    <div class="footerMap-contacts-title">Телефон</div>
                    <div class="footerMap-contacts-wrapper">
                        <div class="footerMap-contacts-info">
                            <img src="assets/img/icons/Icon_call.svg" alt="">
                            <NuxtLink to="tel:+7 (495) 123-45-67">+7 (495) 123-45-67</NuxtLink>
                        </div>
                        <div class="footerMap-contacts-info">
                            <img src="assets/img/icons/Icon_call.svg" alt="">
                            <NuxtLink to="tel:+7 (495) 123-45-67">+7 (495) 123-45-67</NuxtLink>
                        </div>
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
    padding-bottom: 30px;
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