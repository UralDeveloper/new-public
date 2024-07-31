document.addEventListener('DOMContentLoaded', function () {
    // Получаем элемент с классом .header
    var headerElement = document.querySelector('.header');

    // Проверяем, что элемент существует
    if (headerElement) {
        // Получаем высоту элемента
        var headerHeight = headerElement.offsetHeight;

        // Задаем margin-bottom равный высоте элемента
        headerElement.style.marginBottom = "-" + headerHeight + 'px';
    }

    if (document.querySelector(".events-swiper")) {
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

    if (document.querySelector(".gallery-swiper")) {
        console.log('here');
        let gallerySlider = new Swiper(".gallery-swiper", {
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

    // if (document.querySelector(".priceRub")) {
    //     // Получаем все элементы span с классом priceRub
    //     const priceElements = document.querySelectorAll('span.priceRub');

    //     // Проходимся по каждому элементу и обновляем его содержимое
    //     priceElements.forEach((element) => {
    //         // Получаем текстовое содержимое span и удаляем пробелы
    //         const priceText = element.textContent.replace(/\s+/g, '');

    //         // Преобразуем текст в число, используя parseFloat
    //         const originalPrice = parseFloat(priceText.replace(',', '.'));

    //         if (!isNaN(originalPrice)) {
    //             // Проверяем, является ли число целым (integer)
    //             const isInteger = originalPrice % 1 === 0;

    //             // Форматируем числовое значение в формат рублей
    //             const formattedPrice = formatPriceRub(originalPrice, isInteger);

    //             // Обновляем содержимое span отформатированным значением
    //             element.textContent = formattedPrice;
    //         }
    //     });

    //     // Функция для форматирования числа в формат рублей
    //     function formatPriceRub(price, isInteger) {
    //         const formatter = new Intl.NumberFormat('ru-RU', {
    //             style: 'currency',
    //             currency: 'RUB',
    //             minimumFractionDigits: isInteger ? 0 : 2,
    //             maximumFractionDigits: isInteger ? 0 : 2,
    //         });

    //         return formatter.format(price);
    //     }
    // }
});

jQuery(document).ready(function () {
    jQuery('#datepicker').datepicker({
        language: 'ru',
        format: 'dd.mm.yyyy',
        weekStart: 1,
        maxViewMode: 4,
        autoclose: true,
        orientation: "bottom left",

    });
});

function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    return dd + '.' + mm + '.' + yyyy;
}
var currentDate = getCurrentDate();

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("date").value = currentDate;

    // Получаем все элементы DOM с классом .counter-wrapper
    const counterWrappers = document.querySelectorAll('.counter-wrapper');

    // Проходим по каждому элементу .counter-wrapper
    counterWrappers.forEach(function (counterWrapper) {
        const counterValueInput = counterWrapper.querySelector('.counter-value');
        const counterMinusBtn = counterWrapper.querySelector('.counter-minus');
        const counterPlusBtn = counterWrapper.querySelector('.counter-plus');

        // Обработчик события для кнопки "Уменьшить"
        counterMinusBtn.addEventListener('click', function () {
            decreaseCounter(counterValueInput);
        });

        // Обработчик события для кнопки "Увеличить"
        counterPlusBtn.addEventListener('click', function () {
            increaseCounter(counterValueInput);
        });
    });

    // Функция уменьшения значения счетчика
    function decreaseCounter(inputElement) {
        let value = parseInt(inputElement.value);
        if (value > 0) {
            value--;
            inputElement.value = value;
        }
    }

    // Функция увеличения значения счетчика
    function increaseCounter(inputElement) {
        let value = parseInt(inputElement.value);
        value++;
        inputElement.value = value;
    }
});