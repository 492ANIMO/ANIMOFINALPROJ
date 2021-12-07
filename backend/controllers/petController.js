// import models
const User = require('../models/user');
const Client = require('../models/client');
const Pet = require('../models/pet');

exports.index = async (req, res, next) => {
  try {
    const pet = await Pet.find().populate('_owner');
    if(!pet){ throw new Error('ไม่พบข้อมูลสัตว์เลี้ยง'); }

    res.status(200).json({
      data: pet
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { name, type, breed, gender, bloodType, weight, dob, sterilization, ownerId} = req.body;

    let pet = new Pet({
      name,
      type,
      breed,
      gender,
      bloodType,
      weight,
      dob,
      sterilization,

      _owner: ownerId
    })

    await pet.save();

    res.status(201).json({
      message: 'เพิ่มข้อมูลสัตว์เลี้ยงสำเร็จ', 
      data: pet
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const pet = await Pet.findById(id).populate('_owner');

    if(!pet){
      const error = new Error('ไม่พบข้อมูลสัตว์เลี้ยง');
      error.statusCode = '400';
      throw error;
    }

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      data: pet
    });

  } catch (error) {
    next(error);
  }
}

exports.showByClient = async (req, res, next) => {
  try {
    const {clientId} = req.params;
    const client = await Client.findById(clientId).populate('_pet');
    if(!client){
      const error = new Error('ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง');
      error.statusCode = 200;
      throw error;
    }

    const pet = client._pet
    if(pet=='') {
      const error = new Error('ไม่มีข้อมูลสัตว์เลี้ยง');
      error.statusCode = 200;
      throw error;
    }
  
    res.status(200).json({
      data: pet
    });

  } catch (error) {
    next(error);
  }
}

exports.showMyPet = async (req, res, next) => {
  try {
    let user = req.user;
    user = await User.findById(user._id).populate('_client');
    const client = await Client.findById({_id:user._client[0]._id}).populate('_pet');

    const pet = client._pet
    if(pet=='') {
      const error = new Error('ไม่มีข้อมูลสัตว์เลี้ยง');
      error.statusCode = 200;
      throw error;
    }
    
    res.status(200).json({
      message: 'สำเร็จ',
      pet
    });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;
    const pet = await Pet.deleteOne({_id:id});


    if(pet.deletedCount===0){
      const error = new Error('ลบข้อมูลสัตว์เลี้ยงไม่สำเร็จ');
      error.statusCode = '400';
      throw error;
    }

    res.status(200).json({
      message: 'ลบข้อมูลสัตว์เลี้ยงสำเร็จ'
    });

  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { name, type, breed, gender, bloodType, weight, dob, sterilization } = req.body;
    const pet = await Pet.findByIdAndUpdate({_id:id} ,{
      name, type, breed, gender, bloodType, weight, dob, sterilization
    })

    if(!pet){
      const error = new Error('แก้ไขข้อมูลสัตว์เลี้ยงไม่สำเร็จ');
      error.statusCode = '400';
      throw error;
    }

    res.status(201).json({
      message: 'แก้ไขข้อมูลสัตว์เลี้ยงสำเร็จ'
    });

  } catch (error) {
    next(error);
  }
}


