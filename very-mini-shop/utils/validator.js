const {body} = require('express-validator');


exports.registerValidators = [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password', 'Пароль должен быть из 6 символов').isLength({min: 2, max: 25}).isAlphanumeric(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Пароли должны совпадать');
        }

        return true;
    }),
    body('name').isLength({min: 3}).withMessage('Имя должно иметь минимум 3 символа')
];


exports.coursesValidators = [
    body('title').isLength({min: 3}).withMessage('Минимальная длина 3 символов').trim(),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('img', 'Введите корректный Url-адрес картинки').isURL()
];