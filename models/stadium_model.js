var mongoose = require('mongoose');

var stadiumSchema = new mongoose.Schema({
  name: String,
  location: String,
  homeOf: String,
  imageURL: [{type: String}],
  overview: {
    history: String,
    soakUpTheScene: String,
  },
  statistics: String,
  seating: {
    imageURL: String,
    general: String
    }
  });
//   geo_cords: {
//     geo_point: {
//       type: String, es_type: 'geo_point', es_lat_lon: true
//     },
//     lat: { type: Number },
//     lon: { type: Number }
//   }
//     // - See more at: http://www.mzan.com/article/30500454-geocode-filter-in-mongoose-elasticsearch.shtml#sthash.zA1emd44.dpuf

// })

var Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;
