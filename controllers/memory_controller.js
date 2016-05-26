var Memory = require('../models/memory_model.js')
var stadium = require('../models/stadium.json')
var controller = {};

controller.index = function(req, res){
  Memory.find({}, function(err, memory){
    if(err){
      throw err;
    }
    if (req.params.format === '.json') {
      res.json(memory);
    } else {
      res.render('parks_visited')
    }

  })
};

//memory create
controller.create = function(req, res) {

  var memory = new Memory({
    stadiumName: req.body.stadiumName,
    visited: req.body.visited,
   });
  memory.save(function(err){
    if(err) throw err;
    res.render('parks_visited')
  })
};

controller.show = function(req, res) {
  var id = req.params.id;
  Memory.findById(id, function(err, memory) {
    if (err) {
      throw err;
    }
    res.json(memory)
    })
  };

controller.update = function(req, res){
  var id = req.params.id;
  var stadiumName = req.body.stadiumName;
  var visited = req.body.visited;

  Memory.findOneAndUpdate(
    {_id: id},
    {stadiumName: req.body.stadiumName,
     visited: req.body.visited,
    },
    function(err, stadium) {
    if (err) {
      throw err;
    }
      res.json(stadium);
  });
};


controller.destroy = function(req, res){
  var id = req.params.id;
  console.log(req.body, req.params);
  Memory.findOneAndRemove({_id: id}, function(err, doc, result){
    if (err){
      console.log(err);
    }
    console.log(err, doc, result);
    res.json(result);
  });

};




module.exports = controller;
