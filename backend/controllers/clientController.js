// import models
const User = require('../models/user');
const Client = require('../models/client');

exports.index = async (req, res, next) => {
  try {
    const client = await Client.find();
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
      client
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { name, email, contact, address, role } = req.body;
    //check email ซ้ำ
    const existClient = await Client.findOne({name: name});
    if (existClient){
      const error = new Error('มีข้อมูลเจ้าของสัตว์เลี้ยงในระบบแล้ว');
      error.statusCode = 400;
      throw error;
  }

    let client = new Client({
      name,
      email,
      contact,
      address,
      role: 'client'
    })

    if(req.file){
      client.avatar = req.file.path
    }
    await client.save();

    res.status(201).json({
      message: 'เพิ่มข้อมูลเจ้าของสัตว์เลี้ยงสำเร็จ',
      client
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

    if(client.user === undefined) { //doesnt have usr account -> delete client
      let deleteClient = await Client.deleteOne({_id:id});
      if(deleteClient.deletedCount === 0){ 
        throw new Error('ลบข้อมูลเจ้าของสัตว์เลี้ยงไม่สำเร็จ');
      }
      res.status(200).json({
        message: 'ไม่มีuser ลบข้อมูลเจ้าของสัตว์เลี้ยงสำเร็จ',
        client
      });
    } else{ //client have user account -> delete user account
      const user = await User.deleteOne({_id:client.user});
      if(user.deletedCount === 0) throw new Error('ไม่สามารถลบบัญชีผู้ใช้ของสัตว์เลี้ยงได้')

      client = await Client.deleteOne({_id:id});
      if(client.deletedCount === 0) throw new Error('ไม่สามารถลบข้อมูลเจ้าของสัตว์เลี้ยงได้')

      res.status(200).json({
        message: 'ลบข้อมูลเจ้าของสัตว์เลี้ยงและบัญชีผู้ใช้เรียบร้อย',
        user, 
        client
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
    const { name, email, contact, address, role } = req.body;

    let client = await Client.findByIdAndUpdate({_id:id}, {
      name,
      email,
      contact,
      address
    }, { returnDocument: 'after' });
    if(!client){
      const error = new Error('ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง')
      throw error;
    }

    res.status(200).json({
      message: 'แก้ไขข้อมูลสำเร็จ',
      client
  });

  } catch (error) {
    next(error);
  }
}