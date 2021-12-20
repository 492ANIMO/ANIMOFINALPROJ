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

// delete reservation by id
exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;

    const reservation = await Reservation.deleteOne({_id:id});

    if(reservation.deletedCount===0){ throw new Error('ลบข้อมูลการจองไม่สำเร็จ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: reservation
    });

  } catch (error) {
    next(error);
  }
}

// edit reservation by reservation Id
exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { petId, packageId, date, time, doctor, status } = req.body;

    const petObj = await Pet.find().where('_id').in(petId).exec();
    const packageObj = await Pet.find().where('_id').in(packageId).exec();
    let newStatus;
    // change status
    switch(status) {
      case 'ไปตามเวลานัด':

        // check if avaliable timeslot
        if(!timeslot.includes(time)){
          throw new Error('ไม่สามารถเพิ่มการนัดหมายในเวลาดังกล่าวได้');
        }

        // check if avaliable time 
        const booked = await Appointment.find({
          'date': date, 
          'time': time });
        console.log(booked)
        if(booked.length!==0){
          throw new Error('ไม่สามารถเพิ่มการนัดหมายได้ เนื่องจากเวลาดังกล่าวถูกจองไปแล้ว');
        }

        // change status 
        let reservation = await Reservation.updateOne({_id:id},{
          status
        });
        if(reservation.modifiedCount===0){ throw new Error('เปลี่ยนสถานะการจองไม่สำเร็จ'); }

        const appointment = new Appointment({
          petObj,
          date,
          time,
          type: 'package',
          packageObj
        })
        await appointment.save();

        res.status(200).json({
          message: 'บันทึกข้อมูลสำเร็จ',
          data: appointment
        });
        break;

      case 'เลื่อนเวลานัด':
        newStatus = 'เลื่อนเวลานัด'
        break;

      default:
        // code block
    }

    if(newStatus==='เลื่อนเวลานัด'){
      // check if avaliable time 
      const booked = await Appointment.find({
        'date': date, 
        'time': time });
      if(booked.length!==0){
        throw new Error('เวลาดังกล่าวถูกจองไปแล้ว กรุณาเลือกเวลาอื่น');
      }

      const reservation = await Reservation.updateOne({_id:id},{
        date,
        time,
        status: newStatus
      });

      if(reservation.modifiedCount===0){ throw new Error('แก้ไขข้อมูลการจองไม่สำเร็จ'); }
      // update appointment date, status
      const appointment = await Appointment.findOneAndUpdate({'petObj': petId},{
        date,
        time,
      })
      if(!appointment){ throw new Error('เปลี่ยนแปลงข้อมูลการนัดหมายไม่สำเร็จ'); }

      res.status(200).json({
        message: 'เลื่อนเวลานัดสำเร็จ',
        data: reservation
      });
    }

  } catch (error) {
    next(error);
  }
}

// confirm reservation by reservation id
exports.confirm = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {doctor} = req.body;

    let reservation = await Reservation.findById(id);

    let date = reservation.date
    let time = reservation.time

    const petObj = await Pet.find().where('_id').in(reservation.pet).exec();
    const packageObj = await Pet.find().where('_id').in(reservation.package).exec();
    const status = 'ยืนยัน';


        // change status 
        reservation = await Reservation.updateOne({_id:id},{
          status,
          doctor
        });

        if(reservation.modifiedCount===0){ throw new Error('ยืนยันการจองไม่สำเร็จ'); }

        const appointment = new Appointment({
          petObj,
          date,
          time,
          type: 'package',
          packageObj,
          status: 'ไปตามเวลานัด'
        })
        await appointment.save();

        res.status(200).json({
          message: 'เพิ่มข้อมูลการนัดสำเร็จ',
          data: appointment
        });

  } catch (error) {
    next(error);
  }
}

