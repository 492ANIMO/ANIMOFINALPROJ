const { validationResult } = require('express-validator');

// import models
const Appointment = require('../models/appointment');
const Package = require('../models/package');
const Pet = require('../models/pet');
const Client = require('../models/client');
const History = require('../models/history');

const timeslot = require('../models/timeslot');


// get all appointment
exports.index = async (req, res, next) => {
  try {
    const appointment = await Appointment.find()
    .sort({date: 1})
    .populate({ 
      path: 'pet',
      populate: {
       path: 'owner',
       model: 'Client',
       select: '-createdAt -updatedAt -__v',
     },
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'reservation',
      populate: {
       path: 'package',
       model: 'Package',
       select: '-createdAt -updatedAt -__v',
     },
     select: '-createdAt -updatedAt -__v', 
    })
    
    if(!appointment){ throw new Error('ไม่พบข้อมูลการนัดหมาย'); }

    const count = await Appointment.countDocuments();

    res.status(200).json({
      message: 'สำเร็จ',
      appointment,
      count
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
    .populate({ 
      path: 'pet',
      populate: {
       path: 'owner',
       model: 'Client',
       select: '-createdAt -updatedAt -__v',
     },
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'reservation',
      populate: {
       path: 'package',
       model: 'Package',
       select: '-createdAt -updatedAt -__v',
     },
     select: '-createdAt -updatedAt -__v', 
    })
    
    if(!appointment){ throw new Error('ไม่พบข้อมูลการนัดหมาย'); }

    res.status(200).json({
      message: 'สำเร็จ',
      appointment
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

    const packageObj = await Package.find().where('_id').in(packageId).exec();

    // check if avaliable timeslot เช็คว่าเป็นเวลาที่ให้จองได้หรือไม่
    if(!timeslot.includes(time)){
      throw new Error('ไม่สามารถเพิ่มการนัดหมายในเวลาดังกล่าวได้');
    }

    // check if avaliable time   เช็คว่าเวลานั้นถูกจองไปหรือยัง
    const booked = await Appointment.find({
      'date': date, 
      'time': time });
    console.log(booked)
      //  if found booked time -> reject
    if(booked.length!==0){
      throw new Error('ไม่สามารถเพิ่มการนัดหมายได้ เนื่องจากเวลาดังกล่าวถูกจองไปแล้ว');
    }
      //  if not found booked time -> add appointment
    let appointment = new Appointment({
      pet: petId,
      date,
      time,
      type,
      detail,
      packageObj
    })
    await appointment.save();

    appointment = await Appointment.findById(appointment._id)
    .populate('pet')
    .populate('reservation');

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
    const { petId, date, time, packageId, detail, type, status } = req.body;

    const pet = await Pet.find().where('_id').in(petId).exec();
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
      type,
      status
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

// get appointment by petId
exports.showByPet = async (req, res, next) => {
  try {
    const {petId} = req.params;

    const appointment = await Appointment.find({'pet': petId})
  
    if(!appointment){ throw new Error('ไม่พบข้อมูลการนัดหมาย'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}

// get appointment by clientId
exports.showByOwner = async (req, res, next) => {
  try {
    const {clientId} = req.params;

    const pet = await Pet.find().where('owner').in(clientId).exec();
    console.log(pet)
    const appointment = await Appointment.find().where('pet').in(pet).populate('pet').exec();
    // get appointment by pet id
    res.status(200).json({
      message: 'สำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}

// confirm appointment (by appointment id) -> for reservation
exports.confirm = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { detail } = req.body;

    const appointment = await Appointment.updateOne({_id:id},{
    //   $addToSet: { 
    //   'medical.vaccine': vaccines,
    //   'medical.healthCheck': healthChecks,
    //   'medical.treatment': treatments,

    // },
      detail,
      status: 'รักษาเสร็จสิ้น'
    });

    // const appointmentObj = await Appointment.findById(id)
    // .populate('pet', 'name')
    // .populate('reservation', 'package')
    // console.log(appointmentObj)

    // const pet = appointmentObj.pet._id;
    // console.log(pet)

    // const packageName = await Package.findById(appointmentObj.reservation.package[0]).select('name')

    // // add to history
    // const history = new History({
    //   package: appointmentObj.reservation.package[0],
    //   appointment: id,
    //   pet

    // })
    // await history.save();

    // if(appointment.modifiedCount===0){ throw new Error('เพิ่มข้อมูลการรักษาไม่สำเร็จ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}






