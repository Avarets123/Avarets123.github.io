const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const homeRouter = require('./routes/home');
const booksRouter = require('./routes/books');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const app = express();
const loginRouter = require('./routes/auth');
const User = require('./models/user');
const keys = require('./keys');
const errorPage = require('./middleware/404');
const profPage = require('./routes/profile');
const compression = require('compression');



const port = process.env.PORT ?? 3000;



const store = new MongoStore({
    collection: 'session',
    uri: keys.MONGODB_URI
});

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './images')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'Anything',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(compression());

app.use((req, res, next) => {
    res.locals.isAuth = req.session.isAuthenticated;
    next();
});

app.use(async (req, res, next) => {
    if (!req.session.user) {
       return next();
    }

    req.user = await User.findById(req.session.user._id);
    next();
});





app.use('/', homeRouter);
app.use('/books', booksRouter);
app.use('/auth', loginRouter);
app.use('/profile', profPage);


app.use(errorPage);


async function start() {

    await mongoose.connect(keys.MONGODB_URI, {
        useNewUrlParser: true
    });
    app.listen(port, () => {
        console.log(`Сервер запущен по адресу http://localhost:${port}`);
    });
}

start();