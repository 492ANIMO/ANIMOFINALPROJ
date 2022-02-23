
// import models
const User = require('../models/user');
const Client = require('../models/client');
const Pet = require('../models/pet');
const Appointment = require('../models/appointment');
const Reservation = require('../models/reservation');


exports.index = async (req, res, next) => {
  try {
    const client = await Client.find().sort({updatedAt: -1});
    
    if(!client){ throw new Error('ไม่พบข้อมูลผู้ใช้งาน'); }

    res.status(200).json({
      message: 'สำเร็จ',
      client
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const client = await Client.findById(id);


    if(!client){ 
      const error = new Error('ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง');
      error.statusCode = '400';
      throw error; 
    }
    res.status(200).json({
      message: 'สำเร็จ',
      client,
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { firstName, lastName, email, contact, address } = req.body;
    
    //check email ซ้ำ
    const existClient = await Client.findOne({email: email});
    if (existClient){
      const error = new Error('มีข้อมูลเจ้าของสัตว์เลี้ยงในระบบแล้ว');
      error.statusCode = 400;
      throw error;
  }

    let client = new Client({
      firstName,
      lastName,
      email,
      contact,
      address,
      role: 'client',
      uid: new Date().getTime().toString()
    })

    if(req.file){
      client.avatar = req.file.path
    }

    const savedClient = await client.save();
    if(!savedClient){
      // if error
      throw new Error('ไม่สามารถเพิ่มข้อมูลเจ้าของสัตว์เลี้ยงได้');
    }


    // saved!
    res.status(201).json({
      message: 'เพิ่มข้อมูลเจ้าของสัตว์เลี้ยงสำเร็จ',
      client: savedClient
    });
  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;

    // check if client exist ?
    const client = await Client.findById(id).populate('user')
    if(!client){
      const error = new Error('ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง')
      error.statusCode = 404
      throw error;
    }

    // check if client have user account ?
    const user = await User.find({'profile': id});
    console.log(`user: ${user}`)
    if(user.length !== 0){
      console.log(`have user`);
      
      const deletedUser = await User.deleteOne({'profile': id});
      console.log(`deletedUser: ${deletedUser}`);
    }else{
      console.log(`dont have user`);
    }

    // check if client have pet ?
    const pets = await Pet.find({'owner': id}).distinct('_id');
    console.log(`pet id: ${pets}`);
      // delete client's pet
      const deletedPet = await Pet.deleteMany({'owner': id});
      console.log(`จำนวนสัตว์เลี้ยงที่ถูกลบ: ${deletedPet.deletedCount}`);
      

    // check if client's pet have appointment ?
    const appointment = await Appointment.deleteMany({'pet': {$in: pets}}).populate({ path: 'pet', model: 'Pet' });
    console.log(`จำนวนการนัดที่ถูกลบ: ${appointment.deletedCount}`);
    if(appointment.deletedCount !== 0){
      console.log(`ลบข้อมูลการนัดของสัตว์เลี้ยงไม่สำเร็จ: ${appointment}`);
    }
    console.log(`ลบข้อมูลการนัดของสัตว์เลี้ยงสำเร็จ: ${appointment}`);

    // check if client's pet have reservation ?
    const reservation = await Reservation.deleteMany({'owner': id});
    console.log(`จำนวนการจองที่ถูกลบ: ${reservation.deletedCount}`);

    // delete client
    const deleteClient = await Client.deleteOne({'_id': id});
    console.log(`จำนวนclient ที่ถูกลบ: ${deleteClient.deletedCount}`);

    
    res.status(200).json({
      message: 'ลบข้อมูลเจ้าของสัตว์เลี้ยงสำเร็จ',
    });
  } catch (error) {
    next(error)
  }
}

exports.destroyAll = async (req, res, next) => {
  try {

    const client = await Client.deleteMany({});
      if (client.deletedCount === 0) {
          throw new Error('ไม่สามารถลบข้อมูลได้');
      } else {
          res.status(200).json({
              message: 'ลบข้อมูลเรียบร้อย',
              client
          });
      }

  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { firstName, lastName, email, contact, address, role } = req.body;

    //check email ซ้ำ
    const existEmail = await Client.findOne({email: email});
    console.log(`existEmail: ${existEmail}`)
    console.log(`=? ${existEmail._id != id}`)
    
    if (existEmail && existEmail._id != id){
      const error = new Error('อีเมลล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
      error.statusCode = 400;
      throw error;
    }

    // A.findByIdAndUpdate(id, update, options, callback) // executes
    let client = await Client.findByIdAndUpdate({_id:id}, req.body, { returnDocument: 'after' });

     if(!client){
      const error = new Error('ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง')
      throw error;
    }

    res.status(200).json({
      message: 'แก้ไขข้อมูลสำเร็จ',
      client
    })

  } catch (error) {
    next(error);
  }
}

exports.upload = async (req, res, next) => {
  try {
    const { id } = req.params;

    let client = await Client.findById(id);
    if(!client){
      const error = new Error('ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง')
      error.statusCode = 400;
      throw error;
    }

    console.log(`req.body: ${JSON.stringify(req.body)}`);
    console.log(`req.headers: ${JSON.stringify(req.headers)}`);

    console.log(`req: ${req}`);

    if(req.file){
      console.log(`req.file: ${req.file}`)
      client.avatar = req.file.path

      const updatedClient = await client.save();
      if(!updatedClient){
        // if error
        throw new Error('ไม่สามารถเปลี่ยนรูปภาพโปรไฟล์ได้');
      }

      res.status(201).json({
        message: 'เปลี่ยนรูปภาพสำเร็จ',
        updatedClient
      })
    }

    res.status(200).json({
      message: 'สำเร็จ'
    })

   
    
  } catch (error) {
    next(error)
  }
}