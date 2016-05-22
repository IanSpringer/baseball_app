var express = require('express')
var logger = require('morgan');
var app = express();
var port = process.env.PORT || 3000;
var route = require('./routes/routes.js')
var router = express.Router();
var db = require('./db.js')
var bodyParser = require('body-parser');
var passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

//Google Oauth
// passport.use(new GoogleStrategy({
//     clientID:     GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://yourdormain:3000/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//     [ 'https://www.googleapis.com/auth/plus.login',
//     , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
// ));

// app.get( '/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
// }));


//Configure view engine to render EJS templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//middleware

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.get('/home', function(req, res){
  res.render('index');
});


app.listen(port, function(){
  console.log('listening on port ' + port)
})

