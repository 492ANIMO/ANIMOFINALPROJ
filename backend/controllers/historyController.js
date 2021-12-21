const { validationResult } = require('express-validator');

// import models
const History = require('../models/history');

exports.index = async (req, res, next) => {
  try {
    const history = await History.find();
    if(!history){ throw new Error('ไม่พบประวัติการรักษา'); }

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      data: history
    });

  } catch (error) {
    next(error);
  }
}




