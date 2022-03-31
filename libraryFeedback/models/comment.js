const {Schema, model} = require('mongoose');


const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    book: {
        type: String
    },
    data: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = model('Comment', commentSchema);