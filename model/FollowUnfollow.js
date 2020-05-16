const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const followUnfollowSchema = new Schema({
  from: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  to: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('FollowUnfollow', followUnfollowSchema);