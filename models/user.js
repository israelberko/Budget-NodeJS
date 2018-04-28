var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other',
        require: true
    },
    dob: { type: Date, require: true },
    password: { type: String, require: true }
});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);