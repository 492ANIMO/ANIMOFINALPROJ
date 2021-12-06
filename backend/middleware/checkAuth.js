// passport-local strategy
const passportLocal = require('../config/passport');

// check if authenticated
module.exports.isLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(403).json({
      error: {
          message: 'กรุณาเข้าสู่ระบบ'
      }
    });
  }
}