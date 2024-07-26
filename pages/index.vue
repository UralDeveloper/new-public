<template>
    <div class="firstScreen" style="background-image: url(assets/img/remove/bg_events.jpeg);">
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
    <!-- Мероприятия карусель -->
    <div class="events">
        <div class="container swiper events-swiper">
            <div class="titleBlock">
                <h2>Мероприятия</h2>
            </div>
            <div class="events-wrapper swiper-wrapper">
                <div class="event eventItem swiper-slide">
                    <div class="eventItem-preview">
                        <a href="#">
                            <picture>
                                <source srcset="assets/img/remove/event_preview.webp" type="image/webp"><img
                                    src="assets/img/remove/event_preview.jpeg" alt="">
                            </picture>
                        </a>
                    </div>
                    <div class="eventItem-content">
                        <h4><a href="#">Lorem ipsum dolor sit amet, consec adipiscing elit</a></h4>
                        <a href="#" class="btn btn-primary">
                            Подробнее
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="#121212">
                                <g mask="url(#mask0_472_218)">
                                    <path
                                        d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="event eventItem swiper-slide">
                    <div class="eventItem-preview">
                        <a href="#">
                            <picture>
                                <source srcset="assets/img/remove/event_preview.webp" type="image/webp"><img
                                    src="assets/img/remove/event_preview.jpeg" alt="">
                            </picture>
                        </a>
                    </div>
                    <div class="eventItem-content">
                        <h4><a href="#">Lorem ipsum dolor sit amet, consec adipiscing elit</a></h4>
                        <a href="#" class="btn btn-primary">
                            Подробнее
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="#121212">
                                <g mask="url(#mask0_472_218)">
                                    <path
                                        d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="event eventItem swiper-slide">
                    <div class="eventItem-preview">
                        <a href="#">
                            <picture>
                                <source srcset="assets/img/remove/event_preview.webp" type="image/webp"><img
                                    src="assets/img/remove/event_preview.jpeg" alt="">
                            </picture>
                        </a>
                    </div>
                    <div class="eventItem-content">
                        <h4><a href="#">Lorem ipsum dolor sit amet, consec adipiscing elit</a></h4>
                        <a href="#" class="btn btn-primary">
                            Подробнее
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="#121212">
                                <g mask="url(#mask0_472_218)">
                                    <path
                                        d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="event eventItem swiper-slide">
                    <div class="eventItem-preview">
                        <a href="#">
                            <picture>
                                <source srcset="assets/img/remove/event_preview.webp" type="image/webp"><img
                                    src="assets/img/remove/event_preview.jpeg" alt="">
                            </picture>
                        </a>
                    </div>
                    <div class="eventItem-content">
                        <h4><a href="#">Lorem ipsum dolor sit amet, consec adipiscing elit</a></h4>
                        <a href="#" class="btn btn-primary">
                            Подробнее
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="#121212">
                                <g mask="url(#mask0_472_218)">
                                    <path
                                        d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="event eventItem swiper-slide">
                    <div class="eventItem-preview">
                        <a href="#">
                            <picture>
                                <source srcset="assets/img/remove/event_preview.webp" type="image/webp"><img
                                    src="assets/img/remove/event_preview.jpeg" alt="">
                            </picture>
                        </a>
                    </div>
                    <div class="eventItem-content">
                        <h4><a href="#">Lorem ipsum dolor sit amet, consec adipiscing elit</a></h4>
                        <a href="#" class="btn btn-primary">
                            Подробнее
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="#121212">
                                <g mask="url(#mask0_472_218)">
                                    <path
                                        d="M17.1116 12.7498H5.75C5.53718 12.7498 5.35898 12.678 5.2154 12.5345C5.0718 12.3909 5 12.2127 5 11.9999C5 11.787 5.0718 11.6088 5.2154 11.4653C5.35898 11.3217 5.53718 11.2499 5.75 11.2499H17.1116L13.8192 7.95753C13.6705 7.80882 13.5971 7.63478 13.599 7.43543C13.6009 7.23608 13.6743 7.05884 13.8192 6.90371C13.9743 6.74859 14.1525 6.66847 14.3538 6.66333C14.5551 6.6582 14.7333 6.7332 14.8884 6.88833L19.3672 11.3672C19.4608 11.4608 19.5269 11.5595 19.5653 11.6633C19.6038 11.7672 19.623 11.8793 19.623 11.9999C19.623 12.1204 19.6038 12.2325 19.5653 12.3364C19.5269 12.4402 19.4608 12.5389 19.3672 12.6325L14.8884 17.1114C14.7397 17.2601 14.5631 17.3335 14.3586 17.3316C14.1541 17.3296 13.9743 17.2511 13.8192 17.096C13.6743 16.9409 13.5993 16.7652 13.5942 16.5691C13.5891 16.3729 13.6641 16.1973 13.8192 16.0422L17.1116 12.7498Z" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
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
                            <a href="tel:+7 (495) 123-45-67">+7 (495) 123-45-67</a>
                        </div>
                        <div class="footerMap-contacts-info">
                            <img src="assets/img/icons/Icon_call.svg" alt="">
                            <a href="tel:+7 (495) 123-45-67">+7 (495) 123-45-67</a>
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


    <!-- Modal Заказть торт -->
    <div class="modal modal-product fade" id="pie" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-product-preview">
                        <picture>
                            <source srcset="assets/img/remove/product_preview.webp" type="image/webp"><img
                                src="assets/img/remove/product_preview.jpeg" alt="Торт Новогодний">
                        </picture>
                    </div>
                    <div class="modal-product-info">
                        <div class="modal-product-info-title">
                            <h3>Торт Новогодний</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-product-info-description">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. </p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. </p>
                        </div>
                        <div class="modal-product-info-footer">
                            <div class="modal-product-info-footer-message">Заказ возможен не менее, чем за сутки</div>
                            <div class="modal-product-info-footer-price">
                                <span class="priceRub">200</span>/кг
                            </div>
                            <button type="button" class="btn btn-primary btn-primary-nobg" data-bs-toggle="modal"
                                data-bs-target="#orderOfTheCake" data-bs-dismiss="modal">Заказать торт</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Сертификат -->
    <div class="modal modal-product fade" id="certificate" tabindex="-1" aria-labelledby="modalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-product-preview">
                        <picture>
                            <source srcset="assets/img/remove/certificate_preview.webp" type="image/webp"><img
                                src="assets/img/remove/certificate_preview.jpeg" alt="Подарочный сертификат №5">
                        </picture>
                    </div>
                    <div class="modal-product-info">
                        <div class="modal-product-info-title">
                            <h3>Подарочный сертификат №5</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-product-info-description">
                            <p>Номинал: 5 000 ₽</p>
                            <p>Срок действия: 1 год</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. </p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </div>
                        <div class="modal-product-info-footer">
                            <div class="modal-product-info-footer-price">
                                <span class="priceRub">2400</span>
                            </div>
                            <button type="button" class="btn btn-primary btn-primary-nobg"
                                data-bs-dismiss="modal">Заказать сертификат</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Эвенты -->
    <div class="modal modal-product fade" id="events" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-product-preview">
                        <picture>
                            <source srcset="assets/img/remove/event_preview_2.webp" type="image/webp"><img
                                src="assets/img/remove/event_preview_2.jpg" alt="Подарочный сертификат №5">
                        </picture>
                    </div>
                    <div class="modal-product-info">
                        <div class="modal-product-info-title">
                            <h3>Подарочный сертификат №5</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-product-info-description">
                            <div class="eventStart">
                                <span>Дата: 31.12.2023</span>
                                <span>Время: 17:00</span>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. </p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </div>
                        <div class="modal-product-info-footer">
                            <div class="modal-product-info-footer-price">
                                <span class="priceRub">2400</span>
                            </div>
                            <button type="button" class="btn btn-primary btn-primary-nobg"
                                data-bs-dismiss="modal">Купить билет</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Заказ торта -->
    <div class="modal modal-application_form fade" id="orderOfTheCake" tabindex="-1" aria-labelledby="orderModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title" id="orderModalLabel">Заказ торта</p>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span class="modal-form-title">Укажите контактные данные</span>
                    <form id="order-form" action="#">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInput" placeholder="Имя и Фамилия">
                            <label for="floatingInput">Имя и Фамилия</label>
                        </div>
                        <div class="form-floating">
                            <input type="tel" class="form-control" id="floatingInput" placeholder="Номер телефона">
                            <label for="floatingInput">Номер телефона</label>
                        </div>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Пожелание к заказу" rows="4"
                                id="floatingTextarea"></textarea>
                            <label for="floatingTextarea">Пожелание к заказу</label>
                        </div>
                    </form>
                    <span class="modal-form-footer">Наш менеджер свяжется с Вами в течение 20 минут</span>
                </div>
                <div class="modal-footer">
                    <span>Нажимая кнопку “Отправить заявку” Вы принимаете условия <a href="#">пользовательского
                            соглашения</a> и политики конфиденциальности</span>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#sendOrder"
                        data-bs-dismiss="modal">Отправить заявку</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Заявка отправлена -->
    <div class="modal modal-sendOrder fade" id="sendOrder" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title" id="exampleModalLabel">Ваша заявка успешно оформлена!</p>
                </div>
                <div class="modal-body">
                    <span>Наш менеджер свяжется с Вами в течение 20 минут</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Сертификат -->
    <div class="modal modal-booking fade" id="bookingModal" tabindex="-1" aria-labelledby="modalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title" id="modalLabel">Предварительное бронирование столика </p>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-booking-dates">
                        <div class="input-group counter">
                            <label for="numberOfGuests">Количество гостей</label>
                            <div class="counter-wrapper">
                                <button type="button" class="counter-minus btn btn-default btn-number">-</button>
                                <input type="number" class="counter-value" name="number" value="1" id="numberOfGuests">
                                <button type="button" class="counter-plus btn btn-default btn-number">+</button>
                            </div>

                        </div>
                        <div class="input-group date" id="datepicker">
                            <label for="date">Желаемая дата бронирования</label>
                            <input type="text" class="form-control" id="date" placeholder="__.__.____" />
                            <span class="input-group-append"></span>
                        </div>
                        <div class="input-group time">
                            <label for="time">Желаемое время посещения</label>
                            <div class="time-wrapper">
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_9_00 value=9:00 disabled>
                                    <label for=time_9_00>9:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_10_00 value=10:00 disabled>
                                    <label for=time_10_00>10:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_11_00 value=11:00 disabled>
                                    <label for=time_11_00>11:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_12_00 value=12:00>
                                    <label for=time_12_00>12:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_13_00 value=13:00>
                                    <label for=time_13_00>13:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_14_00 value=14:00>
                                    <label for=time_14_00>14:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_15_00 value=15:00>
                                    <label for=time_15_00>15:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_16_00 value=16:00>
                                    <label for=time_16_00>16:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_17_00 value=17:00>
                                    <label for=time_17_00>17:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_18_00 value=18:00>
                                    <label for=time_18_00>18:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_19_00 value=19:00>
                                    <label for=time_19_00>19:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_20_00 value=20:00>
                                    <label for=time_20_00>20:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_21_00 value=21:00>
                                    <label for=time_21_00>21:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_22_00 value=22:00>
                                    <label for=time_22_00>22:00</label>
                                </div>
                                <div class="time-item">
                                    <input type="radio" name="time" id=time_23_00 value=23:00>
                                    <label for=time_23_00>23:00</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-booking-info">
                        <span class="modal-form-title">Укажите контактные данные</span>
                        <form id="order-form" action="#">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="floatingInput" placeholder="Имя и Фамилия">
                                <label for="floatingInput">Имя и Фамилия</label>
                            </div>
                            <div class="form-floating">
                                <input type="tel" class="form-control" id="floatingInput" placeholder="Номер телефона">
                                <label for="floatingInput">Номер телефона</label>
                            </div>
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Пожелание к заказу" rows="4"
                                    id="floatingTextarea"></textarea>
                                <label for="floatingTextarea">Пожелание к заказу</label>
                            </div>
                        </form>
                        <span class="modal-form-footer">Наш менеджер свяжется с Вами в течение 20 минут</span>
                        <div class="modal-footer">
                            <span>Нажимая кнопку “Отправить заявку” Вы принимаете условия <a href="#">пользовательского
                                    соглашения</a> и политики конфиденциальности</span>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Отправить
                                заявку</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Доставка  -->
    <div class="modal modal-delivery fade" id="deliveryModal" tabindex="-1" aria-labelledby="modalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-delivery-info">
                        <div class="modal-title">
                            Забрать в ресторане
                            Закажи любым удобным способом и получи заказ по указанному адресу

                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-delivery-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-delivery" type="button" role="tab"
                                        aria-controls="pills-delivery" aria-selected="true">Доставка</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-pickup-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-pickup" type="button" role="tab"
                                        aria-controls="pills-pickup" aria-selected="false">Самовывоз</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-delivery" role="tabpanel"
                                    aria-labelledby="pills-delivery-tab" tabindex="0">
                                    <div class="delivery-address-item">
                                        <div class="delivery-address-item-icon">
                                        </div>
                                        <div class="delivery-address-item-info">
                                            <div class="delivery-address-item-info-title">
                                                <span>Public, г. Екатеринбург, ул. Мира, 47\4</span>
                                            </div>
                                            <div class="delivery-address-item-info-text">
                                                <span>Равным образом новая модель организационной деятельности влечет за
                                                    собой</span>
                                            </div>
                                        </div>
                                        <div class="delivery-address-item-btn">
                                            <a href="#">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_1702_24008" style="mask-type:alpha"
                                                        maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                        <rect width="24" height="24" fill="#D9D9D9" />
                                                    </mask>
                                                    <g mask="url(#mask0_1702_24008)">
                                                        <path
                                                            d="M16.6116 12.7498H5.25C5.03718 12.7498 4.85898 12.678 4.7154 12.5345C4.5718 12.3909 4.5 12.2127 4.5 11.9999C4.5 11.787 4.5718 11.6088 4.7154 11.4653C4.85898 11.3217 5.03718 11.2499 5.25 11.2499H16.6116L13.3192 7.95753C13.1705 7.80882 13.0971 7.63478 13.099 7.43543C13.1009 7.23608 13.1743 7.05884 13.3192 6.90371C13.4743 6.74859 13.6525 6.66847 13.8538 6.66333C14.0551 6.6582 14.2333 6.7332 14.3884 6.88833L18.8672 11.3672C18.9608 11.4608 19.0269 11.5595 19.0653 11.6633C19.1038 11.7672 19.123 11.8793 19.123 11.9999C19.123 12.1204 19.1038 12.2325 19.0653 12.3364C19.0269 12.4402 18.9608 12.5389 18.8672 12.6325L14.3884 17.1114C14.2397 17.2601 14.0631 17.3335 13.8586 17.3316C13.6541 17.3296 13.4743 17.2511 13.3192 17.096C13.1743 16.9409 13.0993 16.7652 13.0942 16.5691C13.0891 16.3729 13.1641 16.1973 13.3192 16.0422L16.6116 12.7498Z"
                                                            fill="#969696" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="delivery-address-item">
                                        <div class="delivery-address-item-icon">
                                        </div>
                                        <div class="delivery-address-item-info">
                                            <div class="delivery-address-item-info-title">
                                                <span>Public, г. Екатеринбург, ул. Мира, 47\4</span>
                                            </div>
                                            <div class="delivery-address-item-info-text">
                                                <span>Равным образом новая модель организационной деятельности влечет за
                                                    собой</span>
                                            </div>
                                        </div>
                                        <div class="delivery-address-item-btn">
                                            <a href="#">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_1702_24008" style="mask-type:alpha"
                                                        maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                        <rect width="24" height="24" fill="#D9D9D9" />
                                                    </mask>
                                                    <g mask="url(#mask0_1702_24008)">
                                                        <path
                                                            d="M16.6116 12.7498H5.25C5.03718 12.7498 4.85898 12.678 4.7154 12.5345C4.5718 12.3909 4.5 12.2127 4.5 11.9999C4.5 11.787 4.5718 11.6088 4.7154 11.4653C4.85898 11.3217 5.03718 11.2499 5.25 11.2499H16.6116L13.3192 7.95753C13.1705 7.80882 13.0971 7.63478 13.099 7.43543C13.1009 7.23608 13.1743 7.05884 13.3192 6.90371C13.4743 6.74859 13.6525 6.66847 13.8538 6.66333C14.0551 6.6582 14.2333 6.7332 14.3884 6.88833L18.8672 11.3672C18.9608 11.4608 19.0269 11.5595 19.0653 11.6633C19.1038 11.7672 19.123 11.8793 19.123 11.9999C19.123 12.1204 19.1038 12.2325 19.0653 12.3364C19.0269 12.4402 18.9608 12.5389 18.8672 12.6325L14.3884 17.1114C14.2397 17.2601 14.0631 17.3335 13.8586 17.3316C13.6541 17.3296 13.4743 17.2511 13.3192 17.096C13.1743 16.9409 13.0993 16.7652 13.0942 16.5691C13.0891 16.3729 13.1641 16.1973 13.3192 16.0422L16.6116 12.7498Z"
                                                            fill="#969696" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="delivery-address-item">
                                        <div class="delivery-address-item-icon">
                                        </div>
                                        <div class="delivery-address-item-info">
                                            <div class="delivery-address-item-info-title">
                                                <span>Public, г. Екатеринбург, ул. Мира, 47\4</span>
                                            </div>
                                            <div class="delivery-address-item-info-text">
                                                <span>Равным образом новая модель организационной деятельности влечет за
                                                    собой</span>
                                            </div>
                                        </div>
                                        <div class="delivery-address-item-btn">
                                            <a href="#">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_1702_24008" style="mask-type:alpha"
                                                        maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                        <rect width="24" height="24" fill="#D9D9D9" />
                                                    </mask>
                                                    <g mask="url(#mask0_1702_24008)">
                                                        <path
                                                            d="M16.6116 12.7498H5.25C5.03718 12.7498 4.85898 12.678 4.7154 12.5345C4.5718 12.3909 4.5 12.2127 4.5 11.9999C4.5 11.787 4.5718 11.6088 4.7154 11.4653C4.85898 11.3217 5.03718 11.2499 5.25 11.2499H16.6116L13.3192 7.95753C13.1705 7.80882 13.0971 7.63478 13.099 7.43543C13.1009 7.23608 13.1743 7.05884 13.3192 6.90371C13.4743 6.74859 13.6525 6.66847 13.8538 6.66333C14.0551 6.6582 14.2333 6.7332 14.3884 6.88833L18.8672 11.3672C18.9608 11.4608 19.0269 11.5595 19.0653 11.6633C19.1038 11.7672 19.123 11.8793 19.123 11.9999C19.123 12.1204 19.1038 12.2325 19.0653 12.3364C19.0269 12.4402 18.9608 12.5389 18.8672 12.6325L14.3884 17.1114C14.2397 17.2601 14.0631 17.3335 13.8586 17.3316C13.6541 17.3296 13.4743 17.2511 13.3192 17.096C13.1743 16.9409 13.0993 16.7652 13.0942 16.5691C13.0891 16.3729 13.1641 16.1973 13.3192 16.0422L16.6116 12.7498Z"
                                                            fill="#969696" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="delivery-address-item">
                                        <div class="delivery-address-item-icon">
                                        </div>
                                        <div class="delivery-address-item-info">
                                            <div class="delivery-address-item-info-title">
                                                <span>Public, г. Екатеринбург, ул. Мира, 47\4</span>
                                            </div>
                                            <div class="delivery-address-item-info-text">
                                                <span>Равным образом новая модель организационной деятельности влечет за
                                                    собой</span>
                                            </div>
                                        </div>
                                        <div class="delivery-address-item-btn">
                                            <a href="#">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_1702_24008" style="mask-type:alpha"
                                                        maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                        <rect width="24" height="24" fill="#D9D9D9" />
                                                    </mask>
                                                    <g mask="url(#mask0_1702_24008)">
                                                        <path
                                                            d="M16.6116 12.7498H5.25C5.03718 12.7498 4.85898 12.678 4.7154 12.5345C4.5718 12.3909 4.5 12.2127 4.5 11.9999C4.5 11.787 4.5718 11.6088 4.7154 11.4653C4.85898 11.3217 5.03718 11.2499 5.25 11.2499H16.6116L13.3192 7.95753C13.1705 7.80882 13.0971 7.63478 13.099 7.43543C13.1009 7.23608 13.1743 7.05884 13.3192 6.90371C13.4743 6.74859 13.6525 6.66847 13.8538 6.66333C14.0551 6.6582 14.2333 6.7332 14.3884 6.88833L18.8672 11.3672C18.9608 11.4608 19.0269 11.5595 19.0653 11.6633C19.1038 11.7672 19.123 11.8793 19.123 11.9999C19.123 12.1204 19.1038 12.2325 19.0653 12.3364C19.0269 12.4402 18.9608 12.5389 18.8672 12.6325L14.3884 17.1114C14.2397 17.2601 14.0631 17.3335 13.8586 17.3316C13.6541 17.3296 13.4743 17.2511 13.3192 17.096C13.1743 16.9409 13.0993 16.7652 13.0942 16.5691C13.0891 16.3729 13.1641 16.1973 13.3192 16.0422L16.6116 12.7498Z"
                                                            fill="#969696" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="delivery-address-item">
                                        <div class="delivery-address-item-icon">
                                        </div>
                                        <div class="delivery-address-item-info">
                                            <div class="delivery-address-item-info-title">
                                                <span>Public, г. Екатеринбург, ул. Мира, 47\4</span>
                                            </div>
                                            <div class="delivery-address-item-info-text">
                                                <span>Равным образом новая модель организационной деятельности влечет за
                                                    собой</span>
                                            </div>
                                        </div>
                                        <div class="delivery-address-item-btn">
                                            <a href="#">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_1702_24008" style="mask-type:alpha"
                                                        maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                        <rect width="24" height="24" fill="#D9D9D9" />
                                                    </mask>
                                                    <g mask="url(#mask0_1702_24008)">
                                                        <path
                                                            d="M16.6116 12.7498H5.25C5.03718 12.7498 4.85898 12.678 4.7154 12.5345C4.5718 12.3909 4.5 12.2127 4.5 11.9999C4.5 11.787 4.5718 11.6088 4.7154 11.4653C4.85898 11.3217 5.03718 11.2499 5.25 11.2499H16.6116L13.3192 7.95753C13.1705 7.80882 13.0971 7.63478 13.099 7.43543C13.1009 7.23608 13.1743 7.05884 13.3192 6.90371C13.4743 6.74859 13.6525 6.66847 13.8538 6.66333C14.0551 6.6582 14.2333 6.7332 14.3884 6.88833L18.8672 11.3672C18.9608 11.4608 19.0269 11.5595 19.0653 11.6633C19.1038 11.7672 19.123 11.8793 19.123 11.9999C19.123 12.1204 19.1038 12.2325 19.0653 12.3364C19.0269 12.4402 18.9608 12.5389 18.8672 12.6325L14.3884 17.1114C14.2397 17.2601 14.0631 17.3335 13.8586 17.3316C13.6541 17.3296 13.4743 17.2511 13.3192 17.096C13.1743 16.9409 13.0993 16.7652 13.0942 16.5691C13.0891 16.3729 13.1641 16.1973 13.3192 16.0422L16.6116 12.7498Z"
                                                            fill="#969696" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-pickup" role="tabpanel"
                                    aria-labelledby="pills-pickup-tab" tabindex="0">...</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-delivery-map">

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>