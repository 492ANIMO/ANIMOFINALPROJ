
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
    // check if client have user accout
    let client = await Client.findById(id).populate('user');
    if(!client){
      throw new Error('ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง')
    }

    let user = await User.find({'profile': id});
    console.log(`user: ${user}`);

    if(!user || user=='') { //doesnt have usr account -> delete client
      let deleteClient = await Client.deleteOne({_id:id});
      if(deleteClient.deletedCount === 0){ 
        throw new Error('ลบข้อมูลเจ้าของสัตว์เลี้ยงไม่สำเร็จ');
      }
      // check if client have pet
      let pet = await Pet.find({'owner': id}).populate({
        path: 'owner',
        model: 'Client'
      });
      console.log('pet: '+pet);

      // if client have pet
      if(pet.length!==0){
        const petIds = await Pet.find({'owner': id}).distinct('_id')
        console.log(`Id: ${petIds}`);

        const appointment = await Appointment.deleteMany({'pet': {$in: petIds}})
        .populate({ 
          path: 'pet',
          model: 'Pet'
       })
        if(!appointment){
          throw new Error('ลบข้อมูลการนัดไม่สำเร็จ')
        }
        console.log('appointment: ' + appointment);
    
        const reservation = await Reservation.deleteMany({'pet': {$in: petIds}})
        if(!reservation){
          throw new Error('ลบข้อมูลการจองไม่สำเร็จ')
        }
        console.log(`reservation: ${reservation}`);
    
        const deletedPet = await Pet.deleteMany({'owner': id}).populate({
          path: 'owner',
          model: 'Client'
        });
        pet = deletedPet
        
      }

      res.status(200).json({
        message: 'ไม่มีuser ลบข้อมูลเจ้าของสัตว์เลี้ยงสำเร็จ',
        client,
        pet,
        

      });
    } else{ 
      //client have user account -> delete user account
      const user = await User.deleteOne({profile:id});
      if(user.deletedCount === 0) throw new Error('ไม่สามารถลบบัญชีผู้ใช้ของสัตว์เลี้ยงได้')

      client = await Client.deleteOne({_id:id});
      if(client.deletedCount === 0) throw new Error('ไม่สามารถลบข้อมูลเจ้าของสัตว์เลี้ยงได้')

      let pet = await Pet.find({'owner': id}).populate({
        path: 'owner',
        model: 'Client'
      });
      console.log('pet: '+pet);

      // if client have pet
      if(pet.length!==0){
        const petIds = await Pet.find({'owner': id}).distinct('_id')
        console.log(`Id: ${petIds}`);
        const appointment = await Appointment.deleteMany({'pet': {$in: petIds}})
        .populate({ 
          path: 'pet',
          model: 'Pet'
       })
        if(!appointment){
          throw new Error('ลบข้อมูลการนัดไม่สำเร็จ')
        }
        console.log('appointment: ' + appointment);
    
        const reservation = await Reservation.deleteMany({'pet': {$in: petIds}})
        if(!reservation){
          throw new Error('ลบข้อมูลการจองไม่สำเร็จ')
        }
        console.log(`reservation: ${reservation}`);
    
        const deletedPet = await Pet.deleteMany({'owner': id}).populate({
          path: 'owner',
          model: 'Client'
        });
        pet = deletedPet
        
      }
      

      res.status(200).json({
        message: 'ลบข้อมูลเจ้าของสัตว์เลี้ยงและบัญชีผู้ใช้เรียบร้อย',
        user, 
        client,
        pet
      });
    }

  } catch (error) {
    next(error);
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
    const client = await Client.findByIdAndUpdate({_id:id}, req.body, { returnDocument: 'after' });

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