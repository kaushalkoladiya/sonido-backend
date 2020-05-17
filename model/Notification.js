const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  sender: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  receiver: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  type: {
    required: true,
    type: String
  },
  dedicateId: {
    type: mongoose.Types.ObjectId,
    ref: "Dedicate"
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Notification', notificationSchema);