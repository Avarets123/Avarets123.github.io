const btnConsult = document.querySelectorAll('[data-modal=consultation]'),
        overlay  = document.querySelector('.overlay'),
    consulting   = document.querySelector('#consulting'),
    buy          = document.querySelectorAll('.button_mini'),
    order        = document.querySelector('#order'),
    closes        = document.querySelectorAll('.modal__close');
    
    

function showModal(btn, type) {
    btn.forEach(item => {
        item.addEventListener('click', () =>{
            overlay.style.display = 'block';
            type.style.display   = 'block';
        });
    });


}

function closeModal() {
    closes.forEach(item => {
        item.addEventListener('click', () => {
            overlay.style.display = 'none';
            order.style.display   = 'none';
            consulting.style.display = 'none';
        });
    });
}


showModal(btnConsult, consulting);
showModal(buy, order);
closeModal();
   

