const {body} = require('express-validator');

exports.bookValid = [
    body('name').isLength({min: 3}).withMessage('Название книги должно состоять минимум из 3 символов').trim(),
    body('img').trim(),
    body('description').isLength({min: 10}).withMessage('Минимальная длина описания должна быть из 10 символов').trim()
];


exports.registerValid = [
    body('name').isLength({min: 3}).withMessage('Имя должно состоять минимум из 3 символов').trim(),
    body('email').isEmail().withMessage('Введите корректный email').trim(),
    body('password').isLength({min: 6}).withMessage('Минимальная длина пароля должна быть 6 символов').trim()
];