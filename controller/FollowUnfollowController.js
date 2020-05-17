const FollowUnfollow = require('../model/FollowUnfollow');
const Notification = require('../model/Notification');

exports.follow = async (_id, req) => {
  const isFollow = await FollowUnfollow.exists({ from: req.userId, to: _id });
  if (isFollow) {
    const err = new Error('You already following this user');
    err.code = 400;
    throw err;
  }
  await FollowUnfollow.create({ from: req.userId, to: _id });
  await Notification.create({
    sender: req.userId,
    receiver: _id,
    type: 'follow',
  });

  return `Okay, now you are following ${_id}`;
}

exports.unfollow = async (_id, req) => {
  const isFollow = await FollowUnfollow.exists({ from: req.userId, to: _id });
  if (!isFollow) {
    const err = new Error('You cannot unfollow those users which you are not following.');
    err.code = 400;
    throw err;
  }
  await FollowUnfollow.findOneAndDelete({ from: req.userId, to: _id });

  return `Okay, now you are unfollow ${_id}`;
}

exports.followers = async (args, req) => {
  const followers = await FollowUnfollow.find({ to: req.userId }).populate('from');
  return followers.map(follower => ({
    ...follower._doc,
    _id: follower._id.toString(),
    from: {
      ...follower.from._doc,
      _id: follower.from._id.toString(),
      createdAt: follower.from.createdAt.toISOString(),
      updatedAt: follower.from.updatedAt.toISOString()
    },
    to: follower.to.toString(),
    createdAt: follower.createdAt.toISOString(),
    updatedAt: follower.updatedAt.toISOString(),
  }));
}

exports.following = async (args, req) => {
  const following = await FollowUnfollow.find({ from: req.userId }).populate('to');
  return following.map(follow => ({
    ...follow._doc,
    _id: follow._id.toString(),
    from: follow.from.toString(),
    to: {
      ...follow.to._doc,
      _id: follow.to._id.toString(),
      createdAt: follow.to.createdAt.toISOString(),
      updatedAt: follow.to.updatedAt.toISOString()
    },
    createdAt: follow.createdAt.toISOString(),
    updatedAt: follow.updatedAt.toISOString(),
  }));
}