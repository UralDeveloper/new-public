<template>

    <div class="firstScreen firstScreen-halls"
        style="background-image: url(assets/img/remove/halls_bg_1.png), url(assets/img/remove/halls_bg_2.png);">
        <div class="container firstScreen-container">
            <div class="firstScreen-titleBlock firstScreen-titleBlock-centered">
                <h2>Основной зал</h2>
                <NuxtLink data-bs-toggle="modal" data-bs-target="#bookingModal" class="btn btn-primary btn-white-nobg">
                    Забронировать
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="#fff">
                        <g mask="url(#mask0_472_218)">
                            <path
                                d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                        </g>
                    </svg>
                </NuxtLink>
            </div>
        </div>
        <div class="container firstScreen-container">
            <div class="firstScreen-titleBlock firstScreen-titleBlock-centered">
                <h2>Банкетный зал</h2>
                <NuxtLink data-bs-toggle="modal" data-bs-target="#bookingModal" class="btn btn-primary btn-white-nobg">
                    Забронировать
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="#fff">
                        <g mask="url(#mask0_472_218)">
                            <path
                                d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                        </g>
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>

    <!-- Галерея карусель -->
    <div class="gallery">
        <div class="container">
            <div class="titleBlock">
                <h2>основной зал</h2>
            </div>
            <div class="swiper gallery-swiper">
                <div class="gallery-swiper-wrapper swiper-wrapper">
                    <div class="galleryItem swiper-slide">
                        <picture>
                            <source srcset="assets/img/remove/gallery_item.webp" type="image/webp"><img
                                data-fancybox="gallery" src="assets/img/remove/gallery_item.jpeg" alt="">
                        </picture>
                    </div>
                    <div class="galleryItem swiper-slide">
                        <picture>
                            <source srcset="assets/img/remove/gallery_item.webp" type="image/webp"><img
                                data-fancybox="gallery" src="assets/img/remove/gallery_item.jpeg" alt="">
                        </picture>
                    </div>
                    <div class="galleryItem swiper-slide">
                        <picture>
                            <source srcset="assets/img/remove/gallery_item.webp" type="image/webp"><img
                                data-fancybox="gallery" src="assets/img/remove/gallery_item.jpeg" alt="">
                        </picture>
                    </div>
                    <div class="galleryItem swiper-slide">
                        <picture>
                            <source srcset="assets/img/remove/gallery_item.webp" type="image/webp"><img
                                data-fancybox="gallery" src="assets/img/remove/gallery_item.jpeg" alt="">
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

    <div class="shortTextBlock shortTextBlock-halls">
        <div class="container shortTextBlock-container">
            <div class="shortTextBlock-text">
                <p>Ресторан Public не только порадует авторской кухней, но и надолго запомнится гостеприимством и уютной
                    атмосферой.</p>
                <p>Меню наполнено разнообразием блюд современной европейской и средиземноморской кухонь и придется по
                    вкусу самым требовательным гостям.</p>
            </div>
            <div class="shortTextBlock-button">
                <NuxtLink data-bs-toggle="modal" data-bs-target="#bookingModal" class="btn btn-primary">
                    Забронировать
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="#121212">
                        <g mask="url(#mask0_472_218)">
                            <path
                                d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                        </g>
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div class="priceMenu">
        <div class="container priceMenu-container">
            <div class="priceMenu-item">
                <span class="name">Тип</span>
                <span class="value">Помещение</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Возможна аренда без еды</span>
                <span class="value">Да</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Вместимость на фуршет</span>
                <span class="value">120 чел.</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Отдельный вход</span>
                <span class="value">Нет</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Вместимость</span>
                <span class="value">1 – 120 чел.</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Светлый зал</span>
                <span class="value">Да</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Схема оплаты</span>
                <span class="value">Только за еду и напитки</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Стоимость</span>
                <span class="value">от 3 000 ₽/чел.</span>
            </div>
        </div>
    </div>

    <!-- Галерея карусель -->
    <div class="gallery">
        <div class="container">
            <div class="titleBlock">
                <h2>Банкетный зал</h2>
            </div>
            <div class="swiper gallery-swiper">
                <div class="gallery-swiper-wrapper swiper-wrapper">
                    <div class="galleryItem swiper-slide">
                        <picture>
                            <source srcset="assets/img/remove/gallery_item.webp" type="image/webp"><img
                                data-fancybox="gallery" src="assets/img/remove/gallery_item.jpeg" alt="">
                        </picture>
                    </div>
                    <div class="galleryItem swiper-slide">
                        <picture>
                            <source srcset="assets/img/remove/gallery_item.webp" type="image/webp"><img
                                data-fancybox="gallery" src="assets/img/remove/gallery_item.jpeg" alt="">
                        </picture>
                    </div>
                    <div class="galleryItem swiper-slide">
                        <picture>
                            <source srcset="assets/img/remove/gallery_item.webp" type="image/webp"><img
                                data-fancybox="gallery" src="assets/img/remove/gallery_item.jpeg" alt="">
                        </picture>
                    </div>
                    <div class="galleryItem swiper-slide">
                        <picture>
                            <source srcset="assets/img/remove/gallery_item.webp" type="image/webp"><img
                                data-fancybox="gallery" src="assets/img/remove/gallery_item.jpeg" alt="">
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

    <div class="shortTextBlock shortTextBlock-halls">
        <div class="container shortTextBlock-container">
            <div class="shortTextBlock-text">
                <p>Ресторан Public не только порадует авторской кухней, но и надолго запомнится гостеприимством и уютной
                    атмосферой.</p>
                <p>Меню наполнено разнообразием блюд современной европейской и средиземноморской кухонь и придется по
                    вкусу самым требовательным гостям.</p>
            </div>
            <div class="shortTextBlock-button">
                <NuxtLink data-bs-toggle="modal" data-bs-target="#bookingModal" class="btn btn-primary">
                    Забронировать
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="#121212">
                        <g mask="url(#mask0_472_218)">
                            <path
                                d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                        </g>
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div class="priceMenu">
        <div class="container priceMenu-container">
            <div class="priceMenu-item">
                <span class="name">Тип</span>
                <span class="value">Помещение</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Возможна аренда без еды</span>
                <span class="value">Да</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Вместимость на фуршет</span>
                <span class="value">120 чел.</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Отдельный вход</span>
                <span class="value">Нет</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Вместимость</span>
                <span class="value">1 – 120 чел.</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Светлый зал</span>
                <span class="value">Да</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Схема оплаты</span>
                <span class="value">Только за еду и напитки</span>
            </div>
            <div class="priceMenu-item">
                <span class="name">Стоимость</span>
                <span class="value">от 3 000 ₽/чел.</span>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

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

        }
    })
})
</script>