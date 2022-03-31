const sliders = (slider, dir, prev, next) => {
    let sliderIndex = 1,
        paused = false;
    const items = document.querySelectorAll(slider);


    function sliderInit(n) {
        if (n > items.length) {
            sliderIndex = 1;
        }

        if (n < 1) {
            sliderIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[sliderIndex - 1].style.display = 'block';
    }

    sliderInit(sliderIndex);

    function slideChange(n) {
        sliderInit(sliderIndex += n);
    }

    try {
        const previ = document.querySelector(prev),
            nexts = document.querySelector(next);

        previ.addEventListener('click', () => {
            slideChange(-1);
            items[sliderIndex - 1].classList.remove('slideInLeft');
            items[sliderIndex -1].classList.add('slideInRight');

        });

        nexts.addEventListener('click', () => {
            slideChange(1);
            items[sliderIndex - 1].classList.remove('slideInRight');
            items[sliderIndex -1].classList.add('slideInLeft');
            
        });
        

    } catch (e) {}

    function activateSlider() {
        if (dir === 'vertical') {
        paused = setInterval(() => {
            slideChange(1);
            items[sliderIndex -1].classList.add('slideInDown');
        }, 3333);
        } else {
        paused = setInterval(() => {
            slideChange(1);
            items[sliderIndex - 1].classList.remove('slideInRight');
            items[sliderIndex -1].classList.add('slideInLeft');
        }, 23333);
        }
    }
    activateSlider();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateSlider();
    });


    
};

export default sliders;