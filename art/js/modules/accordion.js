const accordion = (trigersSelector) => {
    const btns = document.querySelectorAll(trigersSelector);

    btns.forEach(item => item.nextElementSibling.classList.add(('hidden')));


    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(item => item.nextElementSibling.classList.add(('hidden')));
            this.nextElementSibling.classList.toggle('hidden');

 

        });
    });




    



};

export default accordion;