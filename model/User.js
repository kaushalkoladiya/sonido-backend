const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: String,
  bio: String,
  website: String,
  location: String,
  password: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);