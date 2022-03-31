const {Router} = require('express');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "Библиотека отзывов",
        isHome: true
    });
});

router.get('/bookshelf', auth, (req, res) => {
    res.render('bookshelf', {
        isBookshelf: true
    });
});


module.exports = router;