const {Router} = require('express');
const Order = require('../models/order');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', auth, async (req, res) => {
    const orders = await Order.find({'req.userId': req.user._id}).populate('user.userId');

    res.render('orders', {
        title: 'Заказы',
        isOrder: true,
        orders: orders.map(o => {
            return {
                ...o._doc,
                price: o.courses.reduce((n, c) => {
                    return n += c.count * c.course.price;
                }, 0)
            };
        })
    });
});

router.post('/', auth, async (req, res) => {
    try {
        const user = await req.user.populate('cart.items.courseId');
        const courses = user.cart.items.map(i => ({
            count: i.count,
            course: {...i.courseId._doc}
        }));

        const order = new Order({
            user: {
            name: req.user.name,
            userId: req.user,
        },
        courses
        });
        await order.save();
        await req.user.clearCart();
        res.redirect('/orders');

    } catch (error) {
        console.log(error);
    }

});


module.exports = router;