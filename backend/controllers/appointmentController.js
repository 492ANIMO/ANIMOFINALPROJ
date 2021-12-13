const { validationResult } = require('express-validator');

// import models
const Appointment = require('../models/appointment');
const Package = require('../models/package');
const Pet = require('../models/pet');

// get all appointment
exports.index = async (req, res, next) => {
  try {
    const appointment = await Appointment.find()
    .populate('petObj')
    .populate('package')

    if(!appointment){ throw new Error('ไม่พบข้อมูลการนัดหมาย'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}

// get appointment by appointmentId
exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;

    const appointment = await Appointment.findById(id)
    .populate('petObj')
    .populate('package')

    if(!appointment){ throw new Error('ไม่พบข้อมูลการนัดหมาย'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}

// create new appointment
exports.create = async (req, res, next) => {
  try {
    const { petId, date, time, detail, type, packageId } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }

    const petObj = await Pet.find().where('_id').in(petId).exec();
    const packageObj = await Pet.find().where('_id').in(packageId).exec();

    // check if avaliable time 
    const booked = await Appointment.find({
      'date': date, 
      'time': time });
    console.log(booked)
    if(booked.length!==0){
      throw new Error('ไม่สามารถเพิ่มการนัดหมายได้ เนื่องจากเวลาดังกล่าวถูกจองไปแล้ว');
    }

    const appointment = new Appointment({
      petObj,
      date,
      time,
      type,
      detail,
      packageObj
    })
    await appointment.save();

    res.status(200).json({
      message: 'บันทึกข้อมูลสำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}

// edit appointment by appointmentId
exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { petId, date, time, packageId, detail, type } = req.body;

    const petObj = await Pet.find().where('_id').in(petId).exec();
    const packageObj = await Pet.find().where('_id').in(packageId).exec();
    // check if avaliable time 
    const booked = await Appointment.find({
      'date': date, 
      'time': time });
    console.log(booked)
    if(booked.length!==0){
      throw new Error('เวลาดังกล่าวถูกจองไปแล้ว กรุณาเลือกเวลาอื่น');
    }

    const appointment = await Appointment.updateOne({_id:id},{
      petId, 
      date, 
      time, 
      packageId,
      detail,
      type
    });

    if(appointment.modifiedCount===0){ throw new Error('แก้ไขข้อมูลการนัดหมายไม่สำเร็จ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}

// delete appointment by appointmentId
exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;

    const appointment = await Appointment.deleteOne({_id:id});

    if(appointment.deletedCount===0){ throw new Error('ลบข้อมูลการนัดหมายไม่สำเร็จ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}





