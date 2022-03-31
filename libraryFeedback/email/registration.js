const keys = require('../keys');


module.exports = function(email) {
    return {
        from: keys.EMAIL_FROM,
        to: email,
        subject: 'Аккаунт был создан',
        html: `
                <h2>Добро пожаловать на наш сайт!</h2>
                <p>Аккаунт с ${email} был создан</p>
                <hr/>
                <p><a href="${keys.BASE_URL}">Ссылка на наш сайт</a></p>
        `
    };
};