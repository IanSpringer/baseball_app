var Memory = require('../models/memory_model.js')
var stadium = require('../models/stadium.json')
var controller = {};

controller.index = function(req, res){
  Memory.find({}, function(err, memory){
    if(err){
      throw err;
    }
    res.json(memory)
    // res.render('parks_visited')
  })
};

//memory create
controller.create = function(req, res) {

  var memory = new Memory({
    stadiumVisited: req.body.stadiumVisited,
    imageURL: req.body.imageURL,
    dateVisited: req.body.dateVisited,
    comments: req.body.comments,
    rating: req.body.rating
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
    res.json(memory);
    })
  };

controller.update = function(req, res){
  var id = req.params.id;
  var stadiumVisited = req.body.itemTitle;
  var serialNumber = req.body.serialNumber;
  var description = req.body.description;

  Memory.findOneAndUpdate(
    {_id: id},
    {stadiumVisited: req.body.stadiumVisited,
    imageURL: req.body.imageURL,
    dateVisited: req.body.dateVisited,
    comments: req.body.comments,
    rating: req.body.rating
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
  //find equipment to delete via ID
  //delete item
  //send back confirmation as JSON
};




module.exports = controller;
