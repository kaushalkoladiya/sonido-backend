const User = require('../model/User');

exports.search = async (term, req) => {
  const users = await User
    .find({
      username: {
        $regex: '.*' + term + '.*'
      },
      _id: {
        $ne: req.userId
      }
    })
    .limit(10);

  const data = users.map(user => ({
    ...user._doc,
    _id: user._id.toString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  return [...data];
}

exports.show = async (_id, req) => {
  const user = await User.findById(_id);
  return {
    ...user._doc,
    _id: user._id.toString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}

exports.update = async (userData, req) => {
  return await User.findByIdAndUpdate(req.userId, userData, { new: true });
}