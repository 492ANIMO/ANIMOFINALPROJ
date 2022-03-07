const { validationResult } = require('express-validator');

// import models
const Appointment = require('../models/appointment');
const Reservation = require('../models/reservation');
const Pet = require('../models/pet');
const timeslot = require('../models/timeslot');

// get all appointment
exports.index = async (req, res, next) => {
  try {
    const appointment = await Appointment.find({status:'ไปตามเวลานัด'}).sort({date: 1})
    .populate({ 
      path: 'pet',
      populate: {
       path: 'owner',
       model: 'Client',
       select: '-createdAt -updatedAt -__v',
     },
     select: '-createdAt -updatedAt -__v', 
    })
    if(!appointment){ throw new Error('ไม่พบข้อมูลการนัดหมาย'); }

    res.status(200).json({
      message: 'ดึงข้อมูลการนัดสำเร็จ',
      appointment
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
    if(!appointment){ throw new Error('ไม่พบข้อมูลการนัดหมาย'); }

    res.status(200).json({
      message: 'แสดงข้อมูลการนัดเพิ่มเติมสำเร็จ',
      appointment
    });

  } catch (error) {
    next(error);
  }
}

// create new appointment
exports.create = async (req, res, next) => {
  try {
    const { petId, date, time, detail, type } = req.body;

    // check if avaliable timeslot เช็คว่าเป็นเวลาที่ให้จองได้หรือไม่
    if(!timeslot.includes(time)){
      throw new Error('ไม่สามารถเพิ่มการนัดหมายในเวลาดังกล่าวได้');
    }

    // check if avaliable time  เช็คว่าเวลานั้นถูกจองไปหรือยังจาด appointment ปัจจุบัน
    const booked = await Appointment.find({
      'date': date, 
      'time': time });
    console.log('booked: '+booked)
    const reserved = await Reservation.find({
      'date': date, 
      'time': time });
      //  if found booked time -> reject
    if(booked.length!==0 || reserved.length!==0){
      throw new Error('ไม่สามารถเพิ่มการนัดหมายได้ เนื่องจากเวลาดังกล่าวถูกจองไปแล้ว');
    }
      //  if not found booked time -> add appointment
    let appointment = new Appointment({
      pet: petId,
      date,
      time,
      detail,
      type,
      appId: new Date().getTime().toString()
    })
    await appointment.save();

    appointment = await Appointment.findById(appointment._id)
    .populate('pet')

    res.status(200).json({
      message: 'บันทึกข้อมูลสำเร็จ',
      appointment
    });

  } catch (error) {
    next(error);
  }
}

// edit appointment by appointmentId
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { petId, date, time, detail, type, status, doctor } = req.body;

    const pet = await Pet.find().where('_id').in(petId).exec();

    // check if avaliable time 
    const booked = await Appointment.find({
      'date': date, 
      'time': time });
    console.log(booked)
    if(booked.length!==0){
      throw new Error('เวลาดังกล่าวถูกจองไปแล้ว กรุณาเลือกเวลาอื่น');
    }

    const appointment = await Appointment.updateOne({_id:id},{
      pet: petId, 
      date, 
      time, 
      type,
      detail,
      status,
      doctor
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

    const pets = await Pet.find().where('owner').in(clientId).exec();
    console.log(pets)
    const appointment = await Appointment.find().where('pet').in(pets).populate('pet').exec();
    // get appointment by pet id
    res.status(200).json({
      message: 'สำเร็จ',
      data: appointment
    });

  } catch (error) {
    next(error);
  }
}

// get appointment by clientId
exports.showMyAppointment = async (req, res, next) => {
  try {
    const user = req.user;
    console.log('user: '+user);
    
    // const {clientId} = req.params;
    const clientId = user.profile;
    console.log('clientId: '+clientId);

    const pet = await Pet.find().where('owner').in(clientId).exec();
    console.log('pet: '+pet)
    let appointment = await Appointment.find({status:'ไปตามเวลานัด'}).where('pet').in(pet).populate('pet').exec();
    const reservation = await Reservation.find({status: 'รอยืนยัน'}).where('owner').in(clientId).populate('pet').exec();
    console.log(`reservation: ${reservation}`)

    appointment.push(...reservation); //spread operator
    console.log(`appointment+reservation: ${appointment}`)

    // get appointment by pet id
    res.status(200).json({
      message: 'สำเร็จ',
      appointment,
      reservation
    });

  } catch (error) {
    next(error);
  }
}

// confirm appointment (by appointment id) -> for reservation
exports.confirm = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { detail, petPackage, medDetail } = req.body;

    // update appointment detail and status
    const appointment = await Appointment.findByIdAndUpdate(id ,{
      detail,
      status: 'รักษาเสร็จสิ้น',
      medDetail,
      reservation:{
        package: petPackage
      },
      
    });
    console.log(`petPackage: ${JSON.stringify(petPackage)}`)
    if (!appointment){
      console.log(appointment);
      throw new Error('ไม่สามารถยืนยันการรักษาได้')
    }
    console.log("Updated Appointment : ", appointment);

    const confirmedAppointment = await Appointment.findById(id).populate({ 
      path: 'pet',
      populate: {
       path: 'owner',
       model: 'Client',
       select: '-createdAt -updatedAt -__v',
     },
     select: '-createdAt -updatedAt -__v', 
    })

    console.log(`confirmed: ${confirmedAppointment}`);

    // add to history
    // const history = new History({
    //   pet: confirmedAppointment.pet,
    //   package: confirmedAppointment.reservation.package,
    //   appointment: confirmedAppointment
    // })
    // await history.save();
    // if(!history){
    //   throw new Error('เพิ่มประวัติการรักษาไม่สำเร็จ');
    // }

    res.status(200).json({
      message: 'ยืนยันการรักษาและเพิ่มประวัติการรักษาสำเร็จ',
      data: {
        appointment
      }
    });

  } catch (error) {
    next(error);
  }
}

// get succeed appointment by logedin client // history
exports.succeedAppointment = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    
    // const {clientId} = req.params;
    const clientId = user.profile;
    console.log(clientId);

    const pets = await Pet.find().where('owner').in(clientId).exec();
    console.log('pets: '+pets)
    const appointment = await Appointment.find({'status': 'รักษาเสร็จสิ้น'}).where('pet').in(pets).populate('pet').exec();
  
    // get appointment by pet id
    res.status(200).json({
      message: 'สำเร็จ',
      appointment
    });

  } catch (error) {
    next(error);
  }
}

exports.filterTodayAppointment = async (req, res, next) => {
  try {
    const type = req.query.type;
    const date = req.query.date;
    console.log('type: '+type)
    console.log('date: '+date)

    const condition = {}

    if(!type && date){
      console.log('!type && date')
      condition.date = date
    }else if(type && !date){
      console.log('type && !date')
      condition.type= type
     
    }else if(type && date){
      console.log('type && date')
      condition.date = date;
      condition.type = type;
       
    }else{
      condition = {}
    }
    
    // const d = new Date().toISOString()
    // console.log(d);
    // const formatDate = d.split('T')[0];
    // console.log(formatDate);

    console.log('condition: '+JSON.stringify(condition))

    const appointment = await Appointment.find(condition);
    if(!appointment){ throw new Error('ไม่พบข้อมูลการนัดหมาย'); }

    res.status(200).json({
      message: 'สำเร็จ',
      appointment
    });

  } catch (error) {
    next(error);
  }
}









