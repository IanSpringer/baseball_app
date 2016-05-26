var stadium = require('../models/stadium.json')
var controller = {};

controller.index = function(req, res){

    res.render('index')


};


controller.show = function(req, res){
  console.log(req.params)
   // if(req.params.id){
  var results = stadium.stadiums.filter(function(y){
    return y.id == req.params.id
  })[0]
    res.render('stadium_show', {stadium: results})
  // }else{
    // res.json(stadium)
  // }
  // });
};



module.exports = controller;
