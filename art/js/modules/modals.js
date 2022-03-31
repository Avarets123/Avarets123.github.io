// Модальное окно
const modals = () => {
    let btnPressed;
    function showCloseModal(
    btnShowSelect,
    modalSelect,
    btnHiddenSelect,
    destroy = false
    ) {
    const btnShow = document.querySelectorAll(btnShowSelect),
        modal = document.querySelector(modalSelect),
        btnHidden = document.querySelector(btnHiddenSelect),
        windows = document.querySelectorAll('[data-modal]');

    btnShow.forEach((item) => {
        item.addEventListener('click', (e) => {
        if (e.target) {
            e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
            item.style.display = 'none';
        }

        windows.forEach((item) => {
            item.style.display = 'none';
            item.classList.add('animated', 'fadeIn');
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        });
    });

    btnHidden.addEventListener('click', (e) => {
        if (e.target) {
        e.preventDefault();
        }
        windows.forEach((item) => (item.style.display = 'none'));

        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
        windows.forEach((item) => (item.style.display = 'none'));

        modal.style.display = 'none';
        document.body.style.overflow = '';
        }
    });
    }

    function autoShowModal(selector, time) {
    setTimeout(() => {
        let display;
        document.querySelectorAll('[data-modal]').forEach(item => {
            if (getComputedStyle(item).display !== 'none') {
                display = 'block';
            }
        });

        if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden';
        }
    }, time);
    }

    function openModalByScroll(selector) {
        if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
            document.querySelector(selector).click();
        }
    }

    showCloseModal('.button-design', '.popup-design', '.popup-design .popup-close');
    showCloseModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    showCloseModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    autoShowModal('.popup-consultation', 4222222);
    openModalByScroll('.fixed-gift');
};

export default modals;
