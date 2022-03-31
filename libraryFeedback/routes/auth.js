const express = require('express');
const User = require('../models/user');
const transport = require('../email/transporter');
const regEmail = require('../email/registration');
const crypto = require('crypto');
const keys = require('../keys');
const {registerValid} = require('../middleware/validator');
const {validationResult} = require('express-validator');

const router = express.Router();

router.get('/login',  (req, res) => {
    res.render('login', {
        title: 'Авторизация',
        isLogin: true
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Регистрация',
        isRegist: true
    });
});

router.post('/register', registerValid, async (req, res) => {
    const {email, password, name, confirm} = req.body;

    try {


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(402).render('register',{
                title: 'Регистрация',
                isRegist: true,
                error: errors.array()[0].msg,
                data: {
                    email, name
                }
            });
        }


        const haveUser = await User.findOne({ email });

        if (haveUser) {
            res.redirect('/auth/login');
        } else {
            if (password === confirm) {
                const newUser = new User({
                    email, password, name
                });
                await newUser.save();
                res.redirect('/auth/login');
                transport.sendMail(regEmail(email));

            }
        }

    } catch (e) {
        console.log(e);
    }
});


router.post('/login', async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({ email });

        if (user && password === user.password) {
            req.session.user = user;
            req.session.isAuthenticated = true;
            req.session.save(err => {
                if (err) {
                    throw err;
                }
                res.redirect('/');
            });  
        }

});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


router.get('/reset', (req, res) => {

    res.render('reset',{
        title: 'Восстановление аккаунта'
    });
});

router.post('/reset', async (req, res) => {

    try {

        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {console.log(err);}

            const token = buffer.toString('hex');

            const user = await User.findOne({email: req.body.email});

            if (user) {
                user.tokenReset = token;
                user.tokenExp = Date.now() + 1000 * 60 * 60;
                await user.save();

                await transport.sendMail({
                    from: keys.EMAIL_FROM,
                    to: req.body.email,
                    subject: 'Восстановление доступа',
                    html: `
                        <h1>Забыли пароль?</h1>
                        <p>Если нет, то проигнорируйте данное письмо.</p>
                        <p>А если да, то нажмите на ссылку ниже</p>
                        <p><a href="${keys.BASE_URL}/auth/password/${token}">Сбросить пароль</a></p>
                        <hr/>
                        <p><a href="${keys.BASE_URL}">Ссылка на наш сайт</a></p>
                    `
                });
                res.redirect('/auth/login');
            } else {
                res.redirect('/');
            }
        });

    }   catch (e) {
        console.log(e);
    } 

});

router.get('/password/:token', async (req, res) => {

    try {

        const user = await User.findOne({tokenReset: req.params.token});

        if (req.params.token === user.tokenReset) {
            res.render('password', {
                title: 'Смена пароля',
                token: req.params.token
            });
        } else {
            res.redirect('/');
        }

    } catch (e) {
        console.log(e);
    }

});

router.post('/password', async (req, res) => {

    const user = await User.findOne({tokenReset: req.body.token});
    user.password = req.body.password;
    user.tokenReset = undefined;
    user.tokenExp = undefined;
    await user.save();

    res.redirect('/auth/login');
});


module.exports = router;