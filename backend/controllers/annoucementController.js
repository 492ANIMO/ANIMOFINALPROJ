const { validationResult } = require('express-validator');

// import models
const Annoucement = require('../models/annoucement');

exports.index = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.find();
    if(!vaccine){ throw new Error('ไม่พบข้อมูลวัคซีน'); }

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      data: vaccine
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    

    res.status(200).json({
      message: 'สำเร็จ',
      data: vaccine
    });

  } catch (error) {
    next(error);
  }
}




