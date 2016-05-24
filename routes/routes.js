var express = require('express');
var router = express.Router();
var stadiumController = require('../controllers/stadium_controller.js')





router.get('/stadiums', function(req, res){
  res.render('index')
})


// router.get('/', function(req, res){
//   res.render('landing')
// })





module.exports = router;
