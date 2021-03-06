// import models
const User = require('../models/user');
const Client = require('../models/client');
const Pet = require('../models/pet');
const Appointment = require('../models/appointment');
const Reservation = require('../models/reservation');
const PetType = require('../models/petType');

exports.index = async (req, res, next) => {
  try {
    const pet = await Pet.find().populate({ 
      path: 'owner',
      select: '-email -role -createdAt -updatedAt -__v ',
    });
    if(!pet){ throw new Error('ไม่พบข้อมูลสัตว์เลี้ยง'); }

    res.status(200).json({
      pet
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { name, type, breed, gender, bloodType, weight, dob, age,sterilization, detail, ownerId, avatar} = req.body;

    console.log(req.body)

    let pet = new Pet({
      name,
      type,
      breed,
      gender,
      bloodType,
      weight,
      dob,
      age,
      sterilization,
      detail,
      avatar,

      owner: ownerId
    })


    await pet.save();
    

    res.status(201).json({
      message: 'เพิ่มข้อมูลสัตว์เลี้ยงสำเร็จ', 
      pet
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const pet = await Pet.findById(id).populate({ 
      path: 'owner',
      select: '-email -role -createdAt -updatedAt -__v',
    });

    if(!pet){
      const error = new Error('ไม่พบข้อมูลสัตว์เลี้ยง');
      error.statusCode = '400';
      throw error;
    }

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      pet
    });

  } catch (error) {
    next(error);
  }
}

exports.showByClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const pet = await Pet.find({owner: clientId});
    if(!pet){
      const error = new Error('ไม่พบข้อมูลสัตว์เลี้ยง');
      error.statusCode = 401;
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

exports.showMyPet = async (req, res, next) => {
  try {
    let user = req.user;
    console.log('req.user: '+req.user);

    // not logged in
    if(!user){  
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }
    
    user = await User.findById(user._id).populate('profile');
    const client = await Client.findById({_id:user.profile._id}).populate('pet');
    if(!client){
      const error = new Error('ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง');
      error.statusCode = 401;
      throw error;
    }
    
    res.status(200).json({
      message: 'สำเร็จ',
      pet: client.pet
    });

  } catch (error) {
    next(error);
  }
}

exports.showMyPetFilter = async (req, res, next) => {
  try {
    let user = req.user;
    const  { type } = req.params;
    console.log('req.user: '+req.user);
    // not logged in
    if(!user){  
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }
    
    user = await User.findById(user._id).populate('profile');
    const pet = await Pet.find({owner: user.profile._id, type: type});
    if(!pet){
      const error = new Error('ไม่พบสัตว์เลี้ยง');
      error.statusCode = 401;
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
    // const pet = await Pet.findByIdAndDelete(id);
    // if(!pet){
    //   const error = new Error('ลบข้อมูลสัตว์เลี้ยงไม่สำเร็จ');
    //   error.statusCode = '400';
    //   throw error;
    // }
    const pet = await Pet.findById(id);
    if(!pet){
      const error = new Error('ไม่พบข้อมูลสัตว์เลี้ยง');
      error.statusCode = 400;
      throw error;
    }

    const appointment = await Appointment.deleteMany({'pet': pet._id})
    .populate({ 
      path: 'pet',
      model: 'Pet'
   })
    if(!appointment){
      throw new Error('ลบข้อมูลการนัดไม่สำเร็จ')
    }
    console.log('appointment: ' + appointment);

    const reservation = await Reservation.deleteMany({'pet': pet._id})
    if(!reservation){
      throw new Error('ลบข้อมูลการจองไม่สำเร็จ')
    }
    console.log(`reservation: ${reservation}`);

    const deletedPet = await Pet.findByIdAndDelete(pet._id);

    res.status(200).json({
      message: 'ลบข้อมูลสัตว์เลี้ยงสำเร็จ',
      appointment,
      reservation,
      deletedPet
    });

  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { name, type, breed, gender, bloodType, weight, age,sterilization, detail } = req.body;
    const pet = await Pet.findByIdAndUpdate({_id:id} ,{
      name, type, breed, gender, bloodType, weight, age, sterilization, detail
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
exports.avatar = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { avatar } = req.body;
    const pet = await Pet.findByIdAndUpdate({_id:id} ,{
      avatar
    })

    if(!pet){
      const error = new Error('แก้ไขข้อมูลสัตว์เลี้ยงไม่สำเร็จ');
      error.statusCode = '400';
      throw error;
    }

    res.status(201).json({
      message: 'แก้ไขข้อมูลสัตว์เลี้ยงสำเร็จ',
      pet
    });

  } catch (error) {
    next(error);
  }
}

exports.petCount = async (req, res, next) => {
  try {
    const result = await Pet.aggregate([{
      $group: {
        _id: '$type', 
        count: {$sum: 1}
      }
    }])
    console.log(result)
    res.send(result)

  } catch (error) {
    next(error)
  }
}

exports.allPetType = async (req, res, next) => {
  try {
    const petTypes = await PetType.find();
    console.log(petTypes)
    res.status(200).json({
      message: 'สำเร็จ', 
      petTypes
    });

  } catch (error) {
    next(error)
  }
}
exports.createPetType = async (req, res, next) => {
  try {
    const { petType } = req.body;
    console.log(req.body)
    let type = new PetType({
      petType
    })
    await type.save();
    
    res.status(201).json({
      message: 'เพิ่มประเภทสัตว์เลี้ยงสำเร็จ', 
      type
    });


  } catch (error) {
    next(error)
  }
}
exports.destroyPetType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteType = await PetType.deleteOne({'_id': id});
   
    
    res.status(201).json({
      message: 'ลบประเภทสัตว์เลี้ยงสำเร็จ', 
      deleteType
    });


  } catch (error) {
    next(error)
  }
}

exports.upload = async (req, res, next) => {
  try {
    const { id } = req.params;

    let pet = await Pet.findById(id);
    if(!pet){
      const error = new Error('ไม่พบข้อมูลสัตว์เลี้ยง')
      error.statusCode = 400;
      throw error;
    }
    console.log('req.file: '+JSON.stringify(req.file));

    if(req.file){
      console.log(`req.file: ${req.file}`)
      pet.avatar = req.file.path

      const updatedPet = await pet.save();
      if(!updatedPet){
        // if error
        throw new Error('ไม่สามารถเปลี่ยนรูปภาพโปรไฟล์ได้');
      }

      res.status(201).json({
        message: 'เปลี่ยนรูปภาพสำเร็จ',
        pet
      })
    }
    
  } catch (error) {
    next(error)
  }
}




