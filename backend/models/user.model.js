const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

var SchemaForUser = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full Name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [6, 'Password must be atleast 6 character long']
    },
    saltSecret: String // for encrypting password
});


//----Events:  invoked before save operation for password encryption with rendom salt code
SchemaForUser.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


//---validation for email
SchemaForUser.path('email').validate((value) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
}, 'Invalid e-mail.');


//----Methods
// SchemaForUser.methods.verifyPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };

// SchemaForUser.methods.generateJwt = function () {
//     return jwt.sign({ _id: this._id},
//         process.env.JWT_SECRET,
//     {
//         expiresIn: process.env.JWT_EXP
//     });
// }



mongoose.model('User', SchemaForUser);