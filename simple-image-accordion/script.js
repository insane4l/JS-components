document.addEventListener('DOMContentLoaded', function() {
    'use strict'

    function slidesPlugin(initialActiveSlide = 1) {
        const items = document.querySelectorAll('.accordion__item');

        items[initialActiveSlide].classList.add('accordion__item_active')

        for (const item of items) {
            item.addEventListener('click', () => {
                removeActiveClasses();
                item.classList.add('accordion__item_active');
            })
        }

        const removeActiveClasses = () => {
            items.forEach((item) => {
                item.classList.remove('accordion__item_active');
            })
        }
    }
    slidesPlugin()
})