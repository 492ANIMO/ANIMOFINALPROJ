module.exports.isStaff = (req, res, next) => {
  const { role } = req.user;
  if ( role === 'staff' || role === 'admin') {
      next();
  } else {
      return res.status(403).json({
          error: {
              message: 'ไม่มีสิทธิ์ใช้งานส่วนนี้ เฉพาะ clinic staff เท่านั้น'
          }
      });
  }
}

module.exports.isAdmin = (req, res, next) => {
  const { role } = req.user;
  if ( role === 'admin' ) {
      next();
  } else {
      return res.status(403).json({
          error: {
              message: 'ไม่มีสิทธิ์ใช้งานส่วนนี้ เฉพาะผู้ดูแลระบบเท่านั้น'
          }
      });
  }
}