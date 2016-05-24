var express = require('express')
var expressSession = require('express-session')
var logger = require('morgan');
var app = express();
var port = process.env.PORT || 3000;
var route = require('./routes/routes.js')
var router = express.Router();
var db = require('./db.js')
var bodyParser = require('body-parser');
var passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var cookieParser = require('cookie-parser')
var memoryController = require('./controllers/memory_controller.js')
var stadiumController = require('./controllers/stadium_controller.js')
var User = require('./models/user_model.js')
var bcrypt = require('bcrypt')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
GoogleStrategy.prototype.userProfile = function(token, done) {
  done(null, {})
}

app.use(allowCrossDomain);

// Google Oauth

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var GOOGLE_CLIENT_ID = '858357038342-j7i0v6d4cdeu4nnj4q90ug39o0fduabm.apps.googleusercontent.com'
var GOOGLE_CLIENT_SECRET = 'pnM-PGvkDcKOZsjyYfhqbI7j'

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.find({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));



//Configure view engine to render EJS templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//middleware
app.use(cookieParser())
app.use(expressSession({secret: 'maxwell'}))
app.use( passport.initialize());
app.use( passport.session());
// app.use(expressSession({
//     secret: cookie_secret,
//     name: cookie_name,
//     store: sessionStore, // connect-mongo session store
//     proxy: true,
//     resave: true,
//     saveUninitialized: true
// }));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.get('/', function(req, res){
  res.render('landing');
});


app.get('/auth/google',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
    , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));
app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.route('/stadiums')
  .get(stadiumController.index)

app.route('/stadiums/:id')
  .get(stadiumController.show)


  // res.render('index');


// app.get('/stadiums/')

app.route('/parks_visited')
  .get(memoryController.index)
  .post(memoryController.create)

app.route('/parks_visited/:id')
  .get(memoryController.show)
  .patch(memoryController.update)
  .delete(memoryController.destroy)

// app.get('/about', function(req, res){
//   res.render('about')
// })




app.listen(port, function(){
  console.log('listening on port ' + port)
})

