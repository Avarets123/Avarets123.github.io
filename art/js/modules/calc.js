const calc = (size, material, option, promocode, result) => {

    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(option),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

    function calcFun() {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    }

    sizeBlock.addEventListener('change', calcFun);
    materialBlock.addEventListener('change', calcFun);
    optionsBlock.addEventListener('change', calcFun);
    promocodeBlock.addEventListener('input', calcFun);

};


export default calc;