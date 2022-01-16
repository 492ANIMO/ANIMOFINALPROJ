const { validationResult } = require('express-validator');

// import models
const Appointment = require('../models/appointment');
const Package = require('../models/package');
const Pet = require('../models/pet');
const Client = require('../models/client');
const Reservation = require('../models/reservation');

const timeslot = require('../models/timeslot');

// get all reservations
exports.index = async (req, res, next) => {
  try {
    const reservation = await Reservation.find({ status: 'pending' })
    .sort({date: 'asc'})
    .populate({ 
      path: 'package',
      populate: [
        {
          path: 'vaccines',
          model: 'Vaccine',
          select: '-createdAt -updatedAt -__v',
        },
        {
          path: 'treatments',
          model: 'Treatment',
          select: '-createdAt -updatedAt -__v',
        },
        {
          path: 'healthChecks',
          model: 'HealthCheck',
          select: '-createdAt -updatedAt -__v',
        },

      ],
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'pet',
      populate: {
       path: 'owner',
       model: 'Client',
       select: '-createdAt -updatedAt -__v',
     },
     select: '-createdAt -updatedAt -__v', 
    })
    if(!reservation){ throw new Error('ไม่พบข้อมูลการจองแพ็คเกจ'); }

    const count = await Reservation.countDocuments();

    res.status(200).json({
      message: 'สำเร็จ',
      reservation,
      count
    });

  } catch (error) {
    next(error);
  }
}

// get reservation by id
exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    let reservation = await Reservation.find({ _id: id}).populate('package', '-createdAt -updatedAt')
    .populate('pet', '-createdAt -updatedAt')
    .populate('owner', '-createdAt -updatedAt');
    if(!reservation){ throw new Error('ไม่พบข้อมูลการจองแพ็คเกจ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      reservation
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

    const pet = await Pet.findById(petId);
    const package = await Package.find().where('_id').in(packageId).exec();

    // check if pet is in database
    if(pet == ''){
      throw new Error('ไม่พบสัตว์เลี้ยงในระบบ');
    }

    console.log('pet :' + pet)
    // check if package is in database
    if(package == ''){
      throw new Error('ไม่พบแพ็คเกจในระบบ');
    }

    // check if avaliable timeslot
    if(!timeslot.includes(time)){
      throw new Error('ไม่สามารถเพิ่มการจองในช่วงเวลานี้ได้');
    }

    // get owner by pet
    const owner = await Client.findById(pet.owner);
    console.log('owner : '+ owner);

    // check if avaliable time 
    const booked = await Appointment.find({
      'date': date, 
      'time': time });
    console.log('booked:'+booked)
    const reserved = await Reservation.find({
      'date': date, 
      'time': time });

    if(booked.length!==0 || reserved.length!==0){
      throw new Error('ไม่สามารถจองเวลานี้ได้ เนื่องจากเวลาดังกล่าวถูกจองไปแล้ว');
    }

    const reservation = new Reservation({
      pet: petId,
      package,
      date,
      time,
      doctor,
      status,
      owner
    });
    await reservation.save();
    if(!reservation){ throw new Error('การจองไม่สำเร็จ กรุณาลองใหม่'); }

    res.status(200).json({
      message: 'เพิ่มการจองสำเร็จ',
      reservation
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
      reservation
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

    const pet = await Pet.findById(petId);
    if(!pet){throw new Error('ไม่พบข้อมูลสัตว์เลี้ยง');}
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
          pet,
          date,
          time,
          type: 'package',
          packageObj
        })
        await appointment.save();

        res.status(200).json({
          message: 'บันทึกข้อมูลสำเร็จ',
          appointment
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
      const appointment = await Appointment.findOneAndUpdate({'pet': petId},{
        date,
        time,
      })
      if(!appointment){ throw new Error('เปลี่ยนแปลงข้อมูลการนัดหมายไม่สำเร็จ'); }

      res.status(200).json({
        message: 'เลื่อนเวลานัดสำเร็จ',
        reservation
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
    if(!reservation){ throw new Error('ไม่พบข้อมูลการจอง'); }
    
    let date = reservation.date
    let time = reservation.time

    // check if avaliable time 
    const booked = await Appointment.find({
      'date': date, 
      'time': time });
    console.log(booked)
    if(booked.length!==0){
      throw new Error('ไม่สามารถยืนยันการนัดหมายได้ เนื่องจากเวลาดังกล่าวถูกจองไปแล้ว กรุณากดยกเลิกการจอง');
    }

    const pet = await Pet.findById(reservation.pet._id);
    if(!pet){throw new Error('ไม่พบข้อมูลสัตว์เลี้ยง');}
    const package = await Package.find().where('_id').in(reservation.package).exec();
    if(!package){throw new Error('ไม่พบข้อมูลแพ็คเกจ');}

    // change status 
    reservation = await Reservation.updateOne({_id:id},{
      status: 'ยืนยัน',
      doctor
    });
    if(reservation.modifiedCount===0){ throw new Error('ยืนยันการจองไม่สำเร็จ'); }
    reservation = await Reservation.findById(id);

    // add appointment
    let appointment = new Appointment({
      pet: pet._id,
      date,
      time,
      type: 'แพ็คเกจ',
      reservation: reservation._id,
      by: 'การจอง',
      status: 'ไปตามเวลานัด',
      doctor,
    })
    await appointment.save();

    appointment = await Appointment.findById(appointment._id)
    .populate({ 
      path: 'pet',
      select: '-createdAt -updatedAt -__v',
    })
    .populate({ 
      path: 'reservation',
      select: '-createdAt -updatedAt -__v',
    })

    res.status(200).json({
      message: 'ยืนยันการจองและเพิ่มข้อมูลการนัดสำเร็จ',
      appointment
    });

  } catch (error) {
    next(error);
  }
}

