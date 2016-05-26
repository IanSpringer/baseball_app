var express = require('express');
var router = express.Router();
var stadiumController = require('../controllers/stadium_controller.js');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user_model.js')












router.route('/stadiums/:id')
  .get(stadiumController.show)



module.exports = router;
