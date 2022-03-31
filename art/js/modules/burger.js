const burger = (menuSelector, btnSelector) => {
    const menu = document.querySelector(menuSelector),
          burg = document.querySelector(btnSelector);

    menu.style.display = 'none';

    burg.addEventListener('click', () => {
        if (menu.style.display == 'none' && window.screen.availWidth < 993) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menu.style.display = 'none';

        }
    });

};

export default burger;