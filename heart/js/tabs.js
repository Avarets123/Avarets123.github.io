let back           = document.querySelectorAll('.catalog-item__back'),
    showlist       = document.querySelectorAll('.catalog-item__list'),
    catalogItem    = document.querySelectorAll('.catalog-item__content'),
    descr          = document.querySelectorAll('.catalog-item__link');

function tabToggle(selector) {

    selector.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showlist[i].classList.toggle('catalog-item__list_active');
            catalogItem[i].classList.toggle('catalog-item__content_active');
        });
    });
}

tabToggle(descr);
tabToggle(back);



let catalogContent     = document.querySelectorAll('.catalog__content'),
    catalogTab         = document.querySelectorAll('.catalog__tab');

    catalogTab.forEach((item, i) => {
        item.addEventListener('click', () => {
            catalogTab.forEach(itemTwo => itemTwo.classList.remove('catalog__tab__active'));
            catalogContent.forEach(three => three.classList.remove('catalog__content_active'));


            item.classList.add('catalog__tab__active');
            catalogContent[i].classList.add('catalog__content_active');

        });
    });


