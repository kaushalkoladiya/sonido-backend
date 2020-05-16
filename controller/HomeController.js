const User = require('../model/User');

exports.home = async (args, req) => {
  const users = await User
    .find()
    .sort({ createdAt: -1 })
    .limit(10);

  const data = users.map(user => ({
    ...user._doc,
    _id: user._id.toString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  return [...data];
}