const {Router} = require('express');
const Book = require('../models/book');
const auth = require('../middleware/auth');
const Comments = require('../models/comment');
const {validationResult} = require('express-validator');
const {bookValid} = require('../middleware/validator');
const User = require('../models/user');

const router = Router();


async function identComment(id, req) {

    if (id === req.params.id) {
        return await Comments.find({book: id});
    }
}


router.get('/discussion:id', async (req, res) => {
    const book = await Book.findById(req.params.id);

    const comments = await identComment(req.params.id, req);
    
    res.render(`discussion`, {
        img: book.img,
        description: book.description,
        title:book.name,
        id: req.params.id,
        comment: comments,
    });

});

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('books', {
        title: 'Обсуждения книг',
        isBooks: true,
        books
    });
});

router.get('/add', auth, (req, res) => {
    res.render('add', {
        title: 'Добавление книги'
    });
});

router.post('/add', auth, bookValid, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       return res.status(402).render('add', {
            title: 'Добавление книги',
            error: errors.array()[0].msg,
            data: {
                name: req.body.name,
                img: req.body.img,
                description: req.body.description
            }
        });
    }


    const addBook = new Book({
        name: req.body.name,
        img: req.body.img,
        description: req.body.description
    });
    await addBook.save();
    res.redirect('/books');
});

router.get('/delete:id', auth, async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);   
    res.redirect('/books');
});

router.post('/discussion:id', auth, async (req, res) => {
    const idd = req.params.id;

    if (!req.body.comment) {

        res.redirect(`/books/discussion${idd}`);

    } else {
        const comment = new Comments({
        comment: req.body.comment,
        user: req.user.name,
        book: req.params.id
    });

    await comment.save();
    res.redirect(`/books/discussion${idd}`);

    }

});

module.exports = router;