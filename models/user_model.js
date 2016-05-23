var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
   googleID: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
