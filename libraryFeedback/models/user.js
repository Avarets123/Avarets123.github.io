const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    tokenReset: String,
    tokenExp: Date,
    avatarUrl: String,
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    comments: []
});

module.exports = model('User', userSchema);