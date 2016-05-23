var express = require('express');
var router = express.Router();
var stadiumController = require('../models/stadium.json')

// var stadium = require('../stadium.json')

router.get('/home', function(req, res){
  res.render('index');
});

router.get('/', function(req, res){
  res.render('landing')
})

// router.post('/api/stadiums', function(req, res, stadium){
//   res.json(stadium)
//   });



module.exports = router;
