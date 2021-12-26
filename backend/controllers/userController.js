const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
// import models
const User = require('../models/user');
const Client = require('../models/client');
const Staff = require('../models/staff');


exports.index = async (req, res, next) => {
  try {

    const user = await User.find().select('email role');
    if(!user){ throw new Error('ไม่พบข้อมูลผู้ใช้งาน'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: user
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id).select('email role').populate('_client', 'name contact address -_user ').populate('_staff', 'name contact address -_user ');
    if(!user){ throw new Error('ไม่พบข้อมูลผู้ใช้งาน'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: user
    });

  } catch (error) {
    next(error);
  }
}

exports.getCurrentProfile = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).select('email role').populate('_client', 'name contact address -_user ').populate('_staff', 'name contact address -_user ');
    if(!user){ throw new Error('ไม่พบข้อมูลผู้ใช้งาน'); }
    

    res.status(200).json({
      message: 'สำเร็จ',
      data: user
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }

    //check email ซ้ำ
    const existEmail = await User.findOne({email: email});
    if (existEmail){
      const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
      error.statusCode = 400;
      throw error;
  }
    // encrypt password
    const encryptPassword = bcrypt.hashSync(password, 10);

    let user = new User({
      email: email,
      password: encryptPassword,
      role: role
    })

    await user.save();

    res.status(200).json({
      message: 'เพิ่มผู้ใช้สำเร็จ',
      data: user
    });

  } catch (error) {
    next(error);
  }
}

exports.createClientUser = async (req, res, next) => {
  try {
    const { name, email, password, address, contact } = req.body
    //check email ซ้ำ
    const existEmail = await User.findOne({email: email});
    if (existEmail){
      const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
      error.statusCode = 400;
      throw error;
  }
    // encrypt password
    const encryptPassword =  bcrypt.hashSync(password, 10);

    let user = new User({
      email: email,
      password: encryptPassword,
      role: 'client',
    })
    await user.save(
      (error) => {
        if(error) throw new Error(error);

        const client = new Client({
          name,
          contact,
          address,
          role: 'client',
          _user: user._id
        })
        client.save((error) => {
          if(error) throw new Error(error);
        })
      }
    );

    res.status(200).json({
      message: 'เพิ่มผู้ใช้สำเร็จ',
      data: user
    });

  } catch (error) {
    next(error);
  }

}

exports.createStaffUser = async (req, res, next) => {
  try {
    const { name, email, password, address, contact, role } = req.body
    //check email ซ้ำ
    const existEmail = await User.findOne({email: email});
    if (existEmail){
      const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
      error.statusCode = 400;
      throw error;
  }

    // encrypt password
    const encryptPassword = await bcrypt.hashSync(password, 10);

    let user = new User({
      email: email,
      password: encryptPassword,
      role: 'staff',

    })

    await user.save(
      (error) => {
        if(error) throw new Error(error);

        const staff = new Staff({
          name,
          contact,
          address,
          role: role,
          _user: user._id
        })

        staff.save((error) => {
          if(error) throw new Error(error);
        })
      }
    );

    res.status(200).json({
      message: 'เพิ่มผู้ใช้สำเร็จ',
      data: user
    });

  } catch (error) {
    next(error);
  }

}


exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {email, password, name, contact, address, role} = req.body;

    //validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    } 
    
    // encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);
    let user = await User.updateOne({_id:id},{
        email, 
        password: encryptPassword,
        role
    });

    user = await User.findById(id).populate('_client');

    if(!user) { throw new Error('แก้ไขข้อมูลไม่สำเร็จ เนื่องจากไม่พบข้อมูลเจ้าของสัตว์เลี้ยง') }

    // get clientId of user
    const clientId = user._client[0]._id;
    const client = await Client.updateOne({_id:clientId},{
      name,
      email,
      contact,
      address
    })
    // get new user profile
    user = await User.findById(id).populate('_client');

    res.status(201).json({
      message: 'แก้ไขข้อมูลผู้ใช้สำเร็จ',
      data: {
        newUser: user
      }
    });

  } catch (error) {
    next(error);
  }
}

exports.updateStaffUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {email, password, name, contact, address} = req.body;

    //validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    } 
    //check email ซ้ำ
    const existEmail = await User.findOne({email: email});
    if (existEmail){
      const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
      error.statusCode = 400;
      throw error;
  }
    // encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);
    let user = await User.updateOne({_id:id},{
        email, 
        password: encryptPassword
    });

    user = await User.findById(id).populate('_staff');

    if(!user) { throw new Error('แก้ไขข้อมูลไม่สำเร็จ เนื่องจากไม่พบข้อมูลเจ้าหน้าที่') }

    // get staffId of user
    const staffId = user._staff[0]._id;
    const staff = await Staff.updateOne({_id:staffId},{
      name,
      email,
      contact,
      address
    })
    // get new user profile
    user = await User.findById(id).populate('_staff');

    res.status(200).json({
      message: 'แก้ไขข้อมูลผู้ใช้สำเร็จ',
      data: {
        newUser: user
      }
    });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} =  req.params;
    let user = await User.findById(id).populate('_client');
    if(!user) throw new Error('ไม่พบข้อมูลผู้ใช้');
    // get client id
    const clientId = user._client[0]._id;
    // unlink user and client
    let client = await Client.updateOne({_id:clientId}, {
      _user: null
    });

    user = await User.deleteOne({_id:id});
    if(!user) throw new Error('ไม่สามารถลบบัญชีผู้ใช้เจ้าของสัตว์เลี้ยงได้')
    client = await Client.findById(clientId)

    res.status(200).json({
      message: 'ลบผู้ใช้สำเร็จ',
      data: {
        user,
        client
      }
    });

  } catch (error) {
    next(error);
  }
}

exports.destroyStaff = async (req, res, next) => {
  try {
    const {id} =  req.params;
    let user = await User.findById(id).populate('_staff');
    if(!user) throw new Error('ไม่พบข้อมูลผู้ใช้');
    // get client id
    const staffId = user._staff[0];
    // unlink user and client
    let staff = await Staff.updateOne({_id:staffId}, {
      _user: null
    });

    user = await User.deleteOne({_id:id});
    if(!user) throw new Error('ไม่สามารถลบบัญชีผู้ใช้พนักงานได้')
    staff = await Staff.findById(staffId)

    res.status(200).json({
      message: 'ลบผู้ใช้สำเร็จ',
      data: {
        user,
        staff
      }
    });

  } catch (error) {
    next(error);
  }
}

