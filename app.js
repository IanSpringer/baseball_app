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
var LocalStrategy = require('passport-local').Strategy;

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var cookieParser = require('cookie-parser')
var memoryController = require('./controllers/memory_controller.js')
var stadiumController = require('./controllers/stadium_controller.js')
var User = require('./models/user_model.js')
var bcrypt = require('bcrypt')
var bower = require('bower')
// var connect

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



var GOOGLE_CLIENT_ID = '858357038342-j7i0v6d4cdeu4nnj4q90ug39o0fduabm.apps.googleusercontent.com'
var GOOGLE_CLIENT_SECRET = 'pnM-PGvkDcKOZsjyYfhqbI7j'









//Configure view engine to render EJS templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//middleware
app.use(cookieParser())
app.use(expressSession({secret: 'maxwell'}))
app.use( passport.initialize());
app.use( passport.session());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


// app.get('/', function(req, res){
//   res.render('landing');
// });
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      console.log('user exists')
      if (!user.validatePassword(password)) { return done(null, false); }
      console.log('no errors!')
      return done(null, user);
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



//Routes

app.get('/', function(req, res){
  res.render('landing');
});

app.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log('Success');
    res.redirect('/stadiums');
  });

app.post('/register', function(req, res) {


  var body = req.body;

  var user = new User();

  user.username = body.username;
  user.password = user.encrypt(body.password);

  user.save(function(err) {
    if (err) throw err;
    // res.json({ message: 'User created successfully!', results: user });
    req.login(user, function(err) {
        if (err) {
          console.log(err);
        }
        res.redirect('/stadiums');
      });
  });
});

app.get('/stadiums',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('index', {user: req.user});

});

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });





app.route('/stadiums')
  .get(stadiumController.index)

app.route('/stadiums/:id')
  .get(stadiumController.show)

app.route('/parks_visited?:format')
  .get(memoryController.index)
  .post(memoryController.create)

app.route('/parks_visited/:id')
  .get(memoryController.show)
  .patch(memoryController.update)
  .delete(memoryController.destroy)






app.listen(port, function(){
  console.log('listening on port ' + port)
})

