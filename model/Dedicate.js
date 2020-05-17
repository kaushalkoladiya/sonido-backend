const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DedicateSchema = new Schema({
  sender: {
    required: true,
    type: mongoose.Types.ObjectId
  },
  reciever: {
    required: true,
    type: mongoose.Types.ObjectId
  },
  previewUrl: {
    required: true,
    type: String
  },
  artworkUrl: {
    required: true,
    type: String
  },
  releasedDate: {
    required: true,
    type: String
  },
  genre: {
    required: true,
    type: String
  },
  trackName: {
    required: true,
    type: String
  },
  artistName: {
    required: true,
    type: String
  },
},
  { timestamps: true });

module.exports = mongoose.model('Dedicate', DedicateSchema);