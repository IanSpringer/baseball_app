var Stadium = require('../models/stadium_model.js')
var controller = {};

controller.index = function(req, res){
  Stadium.find({}, function(err, stadium){
    if(err){
      throw err;
    }
    res.json(stadium)
  });
};



module.exports = controller;
