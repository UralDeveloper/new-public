<template>
    <div class="actions">
        <div class="container">
            <div class="swiper actions-swiper">
                <div class="swiper-wrapper actions-wrapper">
                    <div class="swiper-slide actions-item">
                        <NuxtLink to="#">
                            <div class="actions-item-img">
                                <picture>
                                    <source srcset="assets/img/remove/action_item_1.webp" type="image/webp"><img
                                        src="assets/img/remove/action_item_1.jpg" alt="">
                                </picture>
                            </div>
                        </NuxtLink>
                    </div>
                    <div class="swiper-slide actions-item">
                        <NuxtLink to="#">
                            <div class="actions-item-img">
                                <picture>
                                    <source srcset="assets/img/remove/action_item_1.webp" type="image/webp"><img
                                        src="assets/img/remove/action_item_1.jpg" alt="">
                                </picture>
                            </div>
                        </NuxtLink>
                    </div>
                    <div class="swiper-slide actions-item">
                        <NuxtLink to="#">
                            <div class="actions-item-img">
                                <picture>
                                    <source srcset="assets/img/remove/action_item_1.webp" type="image/webp"><img
                                        src="assets/img/remove/action_item_1.jpg" alt="">
                                </picture>
                            </div>
                        </NuxtLink>
                    </div>
                    <div class="swiper-slide actions-item">
                        <NuxtLink to="#">
                            <div class="actions-item-img">
                                <picture>
                                    <source srcset="assets/img/remove/action_item_1.webp" type="image/webp"><img
                                        src="assets/img/remove/action_item_1.jpg" alt="">
                                </picture>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Swiper from 'swiper';

watchEffect(() => {
    nextTick(() => {
        if (process.client) {
            let swiper_actions = new Swiper('.actions-swiper', {
                slidesPerView: 3,
                spaceBetween: 30,
                rewind: true,
                autoplay: {
                    delay: 2000,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    }
                }
            })
        }
    })
})
</script>