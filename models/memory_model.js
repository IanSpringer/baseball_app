var mongoose = require('mongoose');
var memorySchema = new mongoose.Schema({
  stadiumVisited: String,
  imageURL: String,
  dateVisited: Date,
  comments: String,
  rating: {type: Number, min: 0, max: 5 }
})

var Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;
