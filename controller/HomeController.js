const User = require('../model/User');
const Notification = require('../model/Notification');
const Dedicate = require('../model/Dedicate');

exports.home = async (args, req) => {
  const users = await User.find({ _id: { $ne: req.userId } }).sort({ createdAt: -1 }).limit(10);

  const notifications = await Notification.find({ receiver: req.userId }).populate('sender').populate('dedicateId');
  const receivedDedications = await Dedicate.find({ receiver: req.userId }).populate('sender');
  const sendedDedications = await Dedicate.find({ sender: req.userId }).populate('receiver');

  let data = {};
  data.users = users.map(user => ({
    ...user._doc,
    _id: user._id.toString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  data.notifications = notifications.map(notification => ({
    ...notification._doc,
    _id: notification._id.toString(),
    createdAt: notification.createdAt.toISOString(),
    updatedAt: notification.updatedAt.toISOString(),
  }));

  data.receivedDedications = receivedDedications.map(dedication => ({
    ...dedication._doc,
    _id: dedication._id.toString(),
    createdAt: dedication.createdAt.toISOString(),
    updatedAt: dedication.updatedAt.toISOString(),
  }));

  data.sendedDedications = sendedDedications.map(dedication => ({
    ...dedication._doc,
    _id: dedication._id.toString(),
    createdAt: dedication.createdAt.toISOString(),
    updatedAt: dedication.updatedAt.toISOString(),
  }));

  return data;
}