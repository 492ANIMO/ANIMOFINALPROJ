const { validationResult } = require('express-validator');

// import models
const History = require('../models/history');

exports.index = async (req, res, next) => {
  try {
    const history = await History.find()
    .populate('pet')
    .populate('package')
    .populate('appointment');
    if(!history){ throw new Error('ไม่พบประวัติการรักษา'); }

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      data: history
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;

    const history = await History.findById(id)
    .populate('pet')
    .populate('package')
    .populate('appointment');
    if(!history){ throw new Error('ไม่พบประวัติการรักษา'); }

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      data: history
    });

  } catch (error) {
    next(error);
  }
}

exports.showByPetId = async (req, res, next) => {
  try {
    const {petId} = req.params;

    const history = await History.findOne({ pet: petId })
    .populate('pet')
    .populate('package')
    .populate('appointment');
    if(!history){ throw new Error('ไม่พบประวัติการรักษา'); }

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      data: {
        pet: history.pet.name,
        package: history.package.name,
        date: history.appointment.date,
      }
    });

  } catch (error) {
    next(error);
  }
}






