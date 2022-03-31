const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'avarets1234@gmail.com',
        pass: 'hello333'
    }
});

module.exports = transporter;