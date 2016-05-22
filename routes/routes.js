var express = require('express');
var router = express.Router();
var Stadium = require('../models/stadium_model')

router.get('/home', function(req, res){
  res.render('index');
});

router.post('/api/stadiums', function(req, res, stadium){
  res.json(stadium)
  });



module.exports = router;
