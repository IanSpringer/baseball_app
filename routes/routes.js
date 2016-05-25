var express = require('express');
var router = express.Router();
var stadiumController = require('../controllers/stadium_controller.js');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user_model.js')



// passport.use('local', new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({username: username}, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       console.log('user exists')
//       if (!user.validatePassword(password)) { return done(null, false); }
//       console.log('no errors!')
//       return done(null, user);
//     });
//   }));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });










router.route('/stadiums/:id')
  .get(stadiumController.show)



module.exports = router;
