const currency = price => {
     return new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(price);
};


const toData = date => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date));
};

document.querySelectorAll('.date').forEach(item => {
    item.textContent = toData(item.textContent);
});


document.querySelectorAll('.price').forEach(item => {
     item.textContent = currency(item.textContent);
});

const $card = document.querySelector('#card');

if ($card) {
    $card.addEventListener('click', e => {
        if (e.target.classList.contains('js-remove')) {
            
            const id = e.target.dataset.id;
            console.log(id);

            fetch('/card/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
            .then(card => {
                if (card.courses.length) {
                    const html = card.courses.map(c=> {
                        return `
                            <tr>
                                <td>${c.title}</td>
                                <td>${c.count}</td>
                                <td>
                                    <button class="btn btn-small js-remove" data-id="${c.id}"> Удалить</button>
                                </td>
                            </tr>
                        `;
                    }).join('');
                    $card.querySelector('tbody').innerHTML = html;
                    $card.querySelector('.price').textContent = currency(card.price);
                } else {
                    card.innerHTML = `
                    <p>Корзина пуста</p>
                    `;
                }
            });
        }
    });
}

M.Tabs.init(document.querySelectorAll('.tabs'));