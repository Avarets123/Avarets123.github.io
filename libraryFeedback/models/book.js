const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img:{
        type: String
    },
    description: {
        type:String,
        required: true
    }
});

module.exports = model('Book', bookSchema);