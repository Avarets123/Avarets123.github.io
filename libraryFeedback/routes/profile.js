const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/user');


router.get('/', auth, (req, res) => {
    res.render('profile', {
        title: 'Профиль',
        isProfile: true,
        user: req.user.toObject()
    });
});

router.post('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    user.name = req.body.name;
    user.avatarUrl = req.body.avatar;
    await user.save();

    res.redirect('/profile');
});

module.exports = router;