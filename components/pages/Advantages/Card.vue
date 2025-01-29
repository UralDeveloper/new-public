
<template>
    <div class="event eventItem" >
        <div class="eventItem-preview">
                <img src="~/assets/img/page-menu-bg.jpeg" alt="">
        </div>
        <div class="eventItem-content">
            <h4>
                Комплексный отдых в одном месте
            </h4>
            <p>Мы предлагаем полноценное пространство для отдыха. В нашем комплексе есть ресторан, отель, бильярд и фитнес-клуб, чтобы ваш досуг был насыщенным и удобным.</p>
        </div>
    </div>
</template>

<!-- <template>
    <div class="advantage advantagesItem">
        <div class="advantageItem-preview">
            <img src="~/assets/img/page-menu-bg.jpeg" alt="">
        </div>
        <div class="advantageItem-content">
            <div class="advantageItem-content-wrapper">
                <h3>Комплексный отдых в одном месте</h3>
                <p>Мы предлагаем полноценное пространство для отдыха. В нашем комплексе есть ресторан, отель, бильярд и фитнес-клуб, чтобы ваш досуг был насыщенным и удобным.</p>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.advantageItem
    aspect-ratio: 9/16
    position: relative
    &-preview
        img
            width: 100%
            height: auto
    &-content
        position: absolute
        bottom: 0
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column
        padding: 0
        overflow: hidden
        &:before
            content: ''
            position: absolute
            inset: 0
            width: 100%
            height: 100%
            background: rgba(0, 0, 0, 0.6)
            transform: translateY(-100%)
            z-index: 1
            transition: transform 0.3s
        &-wrapper
            padding: 20px
            position: relative
            z-index: 3
            color: #fff
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            gap: 20px
            transform: translateY(40px)
            height: 100%
            width: 100%
        &:hover
            &::before
                transform: translateY(0)
</style> -->
