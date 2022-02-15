// const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
//config
const config = require('../config/index');

// import models
const User = require('../models/user');
const Client = require('../models/client');
const Staff = require('../models/staff');


exports.index = async (req, res, next) => {
  try {

    const user = await User.find().select('-password ').populate({ 
      path: 'profile',
      select: '-email -role -createdAt -updatedAt -__v ',
    });
    if(!user){ throw new Error('ไม่พบข้อมูลผู้ใช้งาน'); }

    res.status(200).json({
      message: 'ดึงข้อมูลผู้ใช้งานสำเร็จ',
      user,
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id).select('-password ').populate({ 
      path: 'profile',
      select: '-email -role -createdAt -updatedAt -__v ',
    })
    if(!user){ throw new Error('ไม่พบข้อมูลผู้ใช้งาน'); }

    res.status(200).json({
      message: 'ดึงข้อมูลผู้ใช้งานสำเร็จสำเร็จ',
      user
    });

  } catch (error) {
    next(error);
  }
}

exports.getCurrentProfile = async (req, res, next) => {
  try {
    // destructoring
    const {_id} = req.user
    console.log('req.user: '+req.user);

    const user = await User.findById(_id).select('-password').populate({ 
      path: 'profile'
    })
    if(!user){ throw new Error('ไม่พบข้อมูลผู้ใช้งาน'); }

    res.status(200).json({
      message: 'สำเร็จ',
      user
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { email, password, role, firstName, lastName, contact, address } = req.body;
    let position = 'staff';
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
    let user;

    // check role : client user | clinic user
    if(role === 'client'){
      // create client instance
      let client = await Client.create({
        firstName, 
        lastName,
        email,
        contact,
        address,
        uid: new Date().getTime().toString()
      })
      if(req.file){
        client.avatar = req.file.path
      }
      // save client to database
      await client.save((error) => {
        if(error) throw new Error(error);
      })
      // create user instance
        user = new User({
        email: email,
        password: encryptPassword,
        role: role,
        profile: client._id,
        onModel: 'Client'
      })

    }else if(role === 'staff' || role === 'admin' || role === 'vet'){

      // set position
      if(role === 'admin') {
        position = 'admin'
      }else if(role === 'vet'){
        position = 'vet'
      }else{
        position = 'staff'
      }
      // create staff instance
      const staff = await Staff.create({
        firstName, 
        lastName,
        email,
        contact,
        address,
        position
      })
        if(req.file){
          staff.avatar = req.file.path
        }
        // save staff to database
        await staff.save((error) => {
          if(error) throw new Error(error);
        })
        // create user instance
        user = new User({
        email: email,
        password: encryptPassword,
        role: role,
        profile: staff._id,
        onModel: 'Staff'
      })
    }else{
      // create user instance
        user = new User({
        email: email,
        password: encryptPassword,
        role: role
      })
    }

    // save user to database
    await user.save((err, doc) => {
      if(err){ 
        const error = new Error('เพิ่มบัญชีผู้ใช้ไม่สำเร็จ');
        error.statusCode = 500;
        throw error;
      } else{
        res.status(200).json({
          message: 'เพิ่มผู้ใช้สำเร็จ',
          user
        });
      }
    });
  
  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {email, password, firstName, lastName, contact, address} = req.body;

    let user = await User.findById(id).populate('profile');
    if(!user) { throw new Error('แก้ไขข้อมูลไม่สำเร็จ เนื่องจากไม่พบข้อมูลผู้ใช้') }

    //check email ซ้ำ
    const existEmail = await User.findOne({email: email});
    console.log(`existEmail: ${existEmail}`)
    console.log(`=? ${existEmail._id != id}`)
    
    if (existEmail && existEmail._id != id){
      const error = new Error('อีเมลล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
      error.statusCode = 400;
      throw error;
    }
  
    // encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);
    user = await User.updateOne({_id:id},{ email,  password: encryptPassword }, {
      returnOriginal: false //option
    });
  
    // get profile id of user
    const profileId = user.profile;
    console.log("this "+user.profileId)

    switch (user.role) {
      case 'client':
        let client = await Client.findByIdAndUpdate({ _id: profileId }, req.body)

        user = await User.findById(id).populate('profile');
        
        break;

      case 'staff':
        let staff = await Staff.findByIdAndUpdate({ _id: profileId },{
          firstName,
          lastName,
          email,
          contact,
          address,
        })
        user = await User.findById(id).populate('profile');
        break;
    
      default:
        break;
    }

    res.status(201).json({
      message: 'แก้ไขข้อมูลผู้ใช้สำเร็จ',
      data: {
        updatedUser: user
      }
    });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} =  req.params;
    let user = await User.findById(id).populate({ 
      path: 'profile',
    })
    if(!user) throw new Error('ไม่พบข้อมูลผู้ใช้');

    const profileId = user.profile;
    
    switch (user.role) {
      case 'client':
        // unlink user and client
        let client = await Client.updateOne({_id: profileId}, {
          _user: null
        });


        user = await User.deleteOne({_id:id});
        if(!user) throw new Error('ไม่สามารถลบบัญชีผู้ใช้เจ้าของสัตว์เลี้ยงได้')

        // recheck on client
        client = await Client.findById(profileId)

        res.status(200).json({
          message: 'ลบบัญชีผู้ใช้สำเร็จ',
          user,
          client
        });

        break;

      case 'staff':
      case 'vet':
        // unlink user and client
        let staff = await Staff.updateOne({_id: profileId}, {
          _user: null
        });
        // delete user data
        user = await User.deleteOne({_id:id});
        if(!user) throw new Error('ไม่สามารถลบบัญชีผู้ใช้เจ้าหน้าที่ได้ได้')

        // recheck on client
        staff = await Staff.findById(profileId)

        res.status(200).json({
          message: 'ลบผู้ใช้สำเร็จ',
          staff
        });
        break;

      default:
        res.status(200).json({
          message: 'ไม่มีข้อมูลที่ถูกลบ',
          data: {}
        });
        break;
    }

  } catch (error) {
    next(error);
  }
}
