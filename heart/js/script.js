const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
    });


document.querySelector('.carousel__next').addEventListener('click', () => {
    slider.goTo('next');
});

document.querySelector('.carousel__prev').addEventListener('click', () => {
    slider.goTo('prev');
});