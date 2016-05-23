var Memory = require('../models/memory_model.js')
var controller = {};

controller.index = function(req, res){
  Memory.find({}, function(err, memory){
    if(err){
      throw err;
    }
    res.json(memory)
  })
};

//todo create
controller.create = function(req, res) {

  var memory = new Memory({
    stadiumVisited: req.body.stadiumVisited,
    imageURL: req.body.imageURL,
    dateVisited: req.body.dateVisited,
    comments: req.body.comments,
    rating: req.body.createdAt
   });
  memory.save(function(err){
    if(err) throw err;
    res.json(memory)
  })
};

controller.show = function(req, res) {
  var id = req.params.id;
  Memory.findById(id, function(err, memory) {
    if (err) {
      throw err;
    }
    res.render('show', {memory: memory});
    })
  };




module.exports = controller;
