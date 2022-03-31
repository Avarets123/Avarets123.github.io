import { GET } from "../services/requests";
const showMoreStyles = (triger, cards) => {
    const trig = document.querySelector(triger),
          card = document.querySelectorAll(cards);

    card.forEach(item => {
        item.classList.add('animated', 'fadeInUp');
    });

    trig.addEventListener('click', () => {
        card.forEach(item => {
            item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });

        trig.remove();
    });

    // trig.addEventListener('click', () => {
    //     GET('http://localhost:3000/styles')
    //     .then(res => console.log(res));
    // });

    // function  createCards(response) {
    //     response.forEach(item => {
    //         let card = document.createElement('div');

    //         card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            
    //     });
    // }
};

export default showMoreStyles;