const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const tokenString = req.headers.authorization;
  if (!tokenString) {
    req.isAuth = false;
    return next();
  }
  const token = tokenString.split('Bearer ')[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, 'LoveYouBabe');
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;

  return next();
}