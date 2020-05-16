const niv = require('node-input-validator');

const User = require('../model/User');

const AuthController = require('../controller/AuthController');
const HomeController = require('../controller/HomeController');
const FollowUnfollowController = require('../controller/FollowUnfollowController');


niv.extend('unique', async ({ value, args }) => {
  // default field is email in this method

  const isEmailExist = await User.exists({ [args[1]]: value });
  if (isEmailExist) {
    return false;
  }
  return true;
});

niv.extendMessages({
  required: 'The :attribute field must not be empty.',
  email: 'Invalid Email.',
  minLength: 'The :attribute is too short',
  string: 'The :attribute must be string',
  unique: ':attribute is already used.',
  equals: 'The password does not match'
}, 'en');

module.exports = {
  signup: async ({ signupData }, req) => {

    const password = signupData.password;
    niv.extend('equals', ({ value, args }) => (password === value) ? true : false);

    const validatedData = new niv.Validator(signupData, {
      email: 'required|email|unique:User,email',
      username: 'required|string|unique:User,username|minLength:5',
      password: 'required|string|minLength:5',
      confirm_password: 'equals',
    });

    const hasError = await validatedData.check();

    if (!hasError) {
      const err = new Error('Validatoin Failed.');
      err.code = 400;
      err.data = validatedData.errors;
      throw err;
    }

    return AuthController.signup(signupData, req);
  },

  login: async ({ loginData }, req) => {
    const validatedData = new niv.Validator(loginData, {
      email: 'required|email',
      password: 'required|string',
    });

    const hasError = await validatedData.check();

    if (!hasError) {
      const err = new Error('Validatoin Failed.');
      err.code = 400;
      err.data = validatedData.errors;
      throw err;
    }

    return AuthController.login(loginData, req);
  },

  home: (args, req) => {
    return HomeController.home(args, req);
  },

  follow: ({ followunfollowData: { _id } }, req) => {
    if (!req.isAuth) {
      const err = new Error('Action Forbidden');
      err.code = 403;
      throw err;
    }

    if (_id === req.userId) {
      const err = new Error('You cannot follow yourself.');
      err.code = 400;
      throw err;
    }

    return FollowUnfollowController.follow(_id, req);
  },

  unfollow: ({ followunfollowData: { _id } }, req) => {
    if (!req.isAuth) {
      const err = new Error('Action Forbidden');
      err.code = 403;
      throw err;
    }

    if (_id === req.userId) {
      const err = new Error('You cannot unfollow yourself.');
      err.code = 400;
      throw err;
    }

    return FollowUnfollowController.unfollow(_id, req);
  },

  followers: (args, req) => {
    if (!req.isAuth) {
      const err = new Error('Action Forbidden');
      err.code = 403;
      throw err;
    }

    return FollowUnfollowController.followers(args, req);
  },

  following: (args, req) => {
    if (!req.isAuth) {
      const err = new Error('Action Forbidden');
      err.code = 403;
      throw err;
    }

    return FollowUnfollowController.following(args, req);
  },

}