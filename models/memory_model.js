var mongoose = require('mongoose');
var memorySchema = new mongoose.Schema({
  stadiumName: String,
  visited: {type: Boolean, default: false}
})

var Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;
