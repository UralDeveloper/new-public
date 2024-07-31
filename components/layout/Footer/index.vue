<template>
    <div id="footer" class="footer">
        <div class="container">
            <div class="footer-main">
                <div class="footer__logo">
                    <NuxtLink to="/" class="footer__logo-link">
                        <!-- <picture><source srcset="assets/img/remove/logo.webp" type="image/webp"><img src="assets/img/remove/logo.png" alt="logo"></picture> -->
                    </NuxtLink>
                </div>
                <div class="footer__menu">
                    <ul class="footer__menu-list">
                        <li class="footer__menu-item"><NuxtLink to="/menu" class="footer__menu-link">Меню</NuxtLink></li>
                        <li class="footer__menu-item"><NuxtLink to="/delivery" class="footer__menu-link">Доставка</NuxtLink></li>
                        <li class="footer__menu-item"><NuxtLink to="#" class="footer__menu-link">Бонусная карта</NuxtLink></li>
                        <li class="footer__menu-item"><NuxtLink to="/gifts" class="footer__menu-link">Сертификаты</NuxtLink>
                        </li>
                        <li class="footer__menu-item"><NuxtLink to="/products" class="footer__menu-link">Торты на заказ</NuxtLink>
                        </li>
                        <li class="footer__menu-item"><NuxtLink to="/events" class="footer__menu-link">Мероприятия</NuxtLink>
                        </li>
                        <li class="footer__menu-item"><NuxtLink to="/halls" class="footer__menu-link">Банкетные залы</NuxtLink>
                        </li>
                        <li class="footer__menu-item"><NuxtLink to="/gallery" class="footer__menu-link">Галерея</NuxtLink></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: -20px;
}
</style>