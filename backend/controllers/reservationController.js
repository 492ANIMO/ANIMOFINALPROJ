const { validationResult } = require('express-validator');

// import models
const Appointment = require('../models/appointment');
const Package = require('../models/package');
const Pet = require('../models/pet');
const Client = require('../models/client');
const Reservation = require('../models/reservation');

const timeslot = ["10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00"];

// get all reservations
exports.index = async (req, res, next) => {
  try {
    const reservation = await Reservation.find()
    .populate('package')
    .populate('pet')

    if(!reservation){ throw new Error('ไม่พบข้อมูลการจองแพ็คเกจ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: reservation
    });

  } catch (error) {
    next(error);
  }
}

// get reservation by id
exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    let reservation = await Reservation.findById(id)
    .populate('package', '-createdAt -updatedAt')
    .populate('pet')

    if(!reservation){ throw new Error('ไม่พบข้อมูลการจองแพ็คเกจ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: reservation
    });

  } catch (error) {
    next(error);
  }
}

// add new reservation
exports.create = async (req, res, next) => {
  try {
    const { petId, packageId, date, time, doctor, status } = req.body;

     //validation
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
         error.statusCode = 422;
         error.validation = errors.array();
         throw error;
     }

    const pet = await Pet.find().where('_id').in(petId).exec();
    const package = await Package.find().where('_id').in(packageId).exec();

    // check if avaliable timeslot
    if(!timeslot.includes(time)){
      throw new Error('ไม่สามารถเพิ่มการจองในช่วงเวลานี้ได้');
    }

    // check if avaliable time 
    const booked = await Appointment.find({
      'date': date, 
      'time': time });
    console.log('booked:'+booked)

    if(booked.length!==0){
      throw new Error('ไม่สามารถจองเวลานี้ได้ เนื่องจากเวลาดังกล่าวถูกจองไปแล้ว');
    }

    const reservation = new Reservation({
      pet,
      package,
      date,
      time,
      doctor,
      status
    });

    await reservation.save();

    if(!reservation){ throw new Error('การจองไม่สำเร็จ กรุณาลองใหม่'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: reservation
    });

  } catch (error) {
    next(error);
  }
}
