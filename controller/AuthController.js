const bcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');

exports.signup = async ({ username, email, password }, req) => {
  const hashedPassword = await bcypt.hash(password.trim(), 10);

  const { _id } = await User.create({
    email: email.trim(),
    username: username.trim(),
    password: hashedPassword,
  });

  const token = await jwt.sign({
    userId: _id,
  }, 'LoveYouBabe', { expiresIn: '1h' });

  return {
    token: token,
    userId: _id
  }
}

exports.login = async ({ email, password }, req) => {

  const hashedPassword = await bcypt.hash(password, 10);

  const user = await User.findOne({ email: email }).limit(1);

  if(!user) {
    const err = new Error('Candidate does not match with our database!');
    err.code = 404;
    throw err;
  }

  const isValidPassword = await bcypt.compare(password.trim(), user.password);

  if(!isValidPassword) {
    const err= new Error('Password does not match!');
    err.code = 400;
    throw err;
  }

  const token = await jwt.sign({
    userId: user._id,
  }, 'LoveYouBabe', { expiresIn: '1h' });

  return {
    token: token,
    userId: user._id,
  }
}