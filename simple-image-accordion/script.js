document.addEventListener('DOMContentLoaded', function() {
    'use strict'


    const items = document.querySelectorAll('.accordion__item');

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

})