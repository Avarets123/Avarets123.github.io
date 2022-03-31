const router = require('express').Router();
const User = require('../models/user');
const bscrypt = require('bcryptjs');
const regEmail = require('../email/registration');
const transport = require('../email/transporter');
const crypto  = require('crypto');
const resetEmail = require('../email/reset');
const {validationResult} = require('express-validator');
const {registerValidators} = require('../utils/validator');


router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true,
        regError: req.flash('regError'),
        loginError: req.flash('loginError')
    });
});

router.post('/login', async (req, res) => {

    try {
        const {email, password} = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            const areSome = await bscrypt.compare(password, candidate.password);

            if (areSome) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/');
                });
            } else {
                req.flash('loginError', 'Такой пользователь не существует или неверно задан пароль');
                res.redirect('/auth/login#login');
            }


        } else {
            req.flash('loginError', 'Такой пользователь не существует или неверно задан пароль');
            res.redirect('/auth/login#login');
        }

    } catch (e) {
        console.log(e);
    }

});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
      res.redirect('/auth/login');
  });
});

router.post('/register', registerValidators  , async (req, res) => {
    try {
        const {name, email, password, confirm} = req.body;
        const candidate = await User.findOne({ email });
        const hashPassword = await bscrypt.hash(password, 10);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login#register');
        }

        if (candidate) {
            req.flash('regError', 'Пользователь с таким email существует!');
            res.redirect('/auth/login#register');
        } else {
            const user = new User({
                name, email, password: hashPassword, cart: {items: []}
            });

            await user.save();
            res.redirect('/auth/login#login');
            transport.sendMail(regEmail(email), (err, res) => {
               if (err) {console.log(err);}

               console.log(res.response);
               transport.close();

           });

        }

    } catch (e) {
        console.log(e);
    }
});


router.post('/password', async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: {$gt: Date.now()}
        });
        if (user) {
            user.password = await bscrypt.hash(req.body.password, 10);
            user.resetToken = undefined;
            user.resetTokenExp = undefined;
            await user.save();
            res.redirect('/auth/login');

        } else {
            req.flash('loginError', 'Время восстановления истекло');
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.log(error);
    }
});


router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
      return res.redirect('/auth/login');
    }

    try {

        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        });

        if (!user) {
            res.redirect('/auth/login');
        } else {

            res.render('password', {
                title: 'Восстановить доступ',
                error: req.flash('error'),
                userId: user._id.toString(),
                token: req.params.token
            });
        }

    } catch (e) {
        console.log(e);
    }
});


router.get('/reset', (req, res) => {
    res.render('reset', {
        title: 'Востановление пароля',
        error: req.flash('error')
    });
});

router.post('/reset', (req, res) => {
    try {

        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash('error', 'Произошла какая-то ошибка!');
                return res.redirect('/auth/reset');
            }

            const token = buffer.toString('hex');

            const candidate = await User.findOne({ email: req.body.email});

            if (candidate) {
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 1000 * 60 * 60;
                await candidate.save();
                await transport.sendMail(resetEmail(candidate.email, token));
                res.redirect('/auth/login');
            } else {
                req.flash('error', 'Такой email не зарегистрирован!');
                res.redirect('/auth/reset');
            }

        });



    } catch (e) {
        console.log(e);
    }
});

module.exports = router;