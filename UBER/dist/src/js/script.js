window.addEventListener('DOMContentLoaded', ()=> {

    const hamb = document.querySelector('.hamburger'),
      list = document.querySelector('.list_header'),
      itemList = document.querySelectorAll('.item_list');

    itemList.forEach(item => {
        item.addEventListener('click', () => {
            hamb.classList.toggle('hamburger_active');
            list.classList.toggle('list_header_active');
        });
    });

    hamb.addEventListener('click', () => {
    hamb.classList.toggle('hamburger_active');
    list.classList.toggle('list_header_active');
    });
    


});


