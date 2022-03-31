const {Schema, model} = require('mongoose');

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

course.method('toClient', function()  {
    const courses = this.toObject();

    courses.id = courses._id;
    delete courses._id;

    return courses;
});


module.exports = model('Course', course);