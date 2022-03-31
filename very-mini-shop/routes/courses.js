const  {Router} = require('express');
const Course = require('../models/course');
const auth = require('../middleware/auth');
const {coursesValidators} = require('../utils/validator.js');
const {validationResult} = require('express-validator');


const coursesRouter = Router();

coursesRouter.get('/', async (req, res) => {
   // const courses = await Course.find().populate('userId');


    const course = await Course.find();
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        course
    });
});
coursesRouter.get('/:id', async (req, res) => {
    const course = await  Course.findById(req.params.id);
    res.render('course', {
        layout: 'empty',
        title:'Title', //course.title,
        course
    });
});


coursesRouter.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
       return res.redirect('/');
    }
    const course = await Course.findById(req.params.id);
    res.render('courseEdit', {
        title: `Редактировать ${course.title}`,
        course
    });
});


coursesRouter.post('/remove', auth, async (req, res) => {

    try {
        await Course.deleteOne({
            _id: req.body.id
        });
        res.redirect('/courses');
        
    } catch (error) {
        console.log(error);
    }
});

coursesRouter.post('/edit', auth, coursesValidators, async (req, res) => {

    const errors = validationResult(req);
    const {id} = req.body;


    if (!errors.isEmpty()) {
        return res.status(422).redirect(`courses/${id}/edit?allow=true`);
        
    }


    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
});

module.exports = coursesRouter;