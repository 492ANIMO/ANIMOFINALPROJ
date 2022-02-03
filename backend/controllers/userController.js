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

    const count = await User.countDocuments();

    res.status(200).json({
      message: 'สำเร็จ',
      user,
      count
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
      message: 'สำเร็จ',
      user
    });

  } catch (error) {
    next(error);
  }
}

exports.getCurrentProfile = async (req, res, next) => {
  try {
    // const id = req.user._id;
    
    const {_id, email, role} = req.user

    const user = await User.findById(_id).select('-password').populate({ 
      path: 'profile'
    })
    if(!user){ throw new Error('ไม่พบข้อมูลผู้ใช้งาน'); }

    res.status(200).json({
      message: 'สำเร็จ',
      user: {
        id: _id,
        email,
        role,
        // firstName: user.profile.firstName,
        // lastName: user.profile.lastName,
        // position: user.profile.position,
      }
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { email, password, role, firstName, lastName, contact, address, position } = req.body;

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

    // check role
    if(role === 'client'){
      let client = await Client.create({
        firstName, 
        lastName,
        email,
        contact,
        address,
      })
      if(req.file){
        client.avatar = req.file.path
      }
      await client.save((error) => {
        if(error) throw new Error(error);
      })

        user = new User({
        email: email,
        password: encryptPassword,
        role: role,
        profile: client._id,
        onModel: 'Client'
      })

    }else if(role === 'staff' || role === 'admin'){
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
        await staff.save((error) => {
          if(error) throw new Error(error);
        })

        user = new User({
        email: email,
        password: encryptPassword,
        role: role,
        profile: staff._id,
        onModel: 'Staff'
      })

    }else{
        user = new User({
        email: email,
        password: encryptPassword,
        role: role
      })
      
    }
    await user.save();

    res.status(200).json({
      message: 'เพิ่มผู้ใช้สำเร็จ',
      user
    });

  } catch (error) {
    next(error);
  }
}

// exports.createClientUser = async (req, res, next) => {
//   try {
//     const { name, email, password, address, contact, avatar } = req.body
//     //check email ซ้ำ
//     const existEmail = await User.findOne({email: email});
//     if (existEmail){
//       const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
//       error.statusCode = 400;
//       throw error;
//   }
//     // encrypt password
//     const encryptPassword =  bcrypt.hashSync(password, 10);

//     let user = new User({
//       email: email,
//       password: encryptPassword,
//       role: 'client',
//     })
//     await user.save(
//       (error) => {
//         if(error) throw new Error(error);

//         let client = new Client({
//           name,
//           contact,
//           address,
//           role: 'client',
//           _user: user._id,
//         })
//         if(req.file){
//           client.avatar = req.file.path
//         }
//         client.save((error) => {
//           if(error) throw new Error(error);
//         })
//       }
//     );

//     res.status(200).json({
//       message: 'เพิ่มผู้ใช้สำเร็จ',
//       user
//     });

//   } catch (error) {
//     next(error);
//   }

// }

// exports.createStaffUser = async (req, res, next) => {
//   try {
//     const { name, email, password, address, contact, role } = req.body
//     //check email ซ้ำ
//     const existEmail = await User.findOne({email: email});
//     if (existEmail){
//       const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
//       error.statusCode = 400;
//       throw error;
//   }

//     // encrypt password
//     const encryptPassword = await bcrypt.hashSync(password, 10);

//     let user = new User({
//       email: email,
//       password: encryptPassword,
//       role: 'staff',

//     })

//     await user.save(
//       (error) => {
//         if(error) throw new Error(error);

//         let staff = new Staff({
//           name,
//           contact,
//           address,
//           role: role,
//           _user: user._id
//         })

//         if(req.file){
//           staff.avatar = req.file.path
//         }

//         staff.save((error) => {
//           if(error) throw new Error(error);
//         })
//       }
//     );

//     res.status(200).json({
//       message: 'เพิ่มผู้ใช้สำเร็จ',
//       data: user
//     });

//   } catch (error) {
//     next(error);
//   }

// }


exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {email, password, firstName, lastName, contact, address} = req.body;

    //check email ซ้ำ
    const existEmail = await User.findOne({email: email});
    if (existEmail){
      const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
      error.statusCode = 400;
      throw error;
    }

    // encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);
    let user = await User.updateOne({_id:id},{ email,  password: encryptPassword }, {
      returnOriginal: false //option
    });
  
    user = await User.findById(id).populate('profile');
    if(!user) { throw new Error('แก้ไขข้อมูลไม่สำเร็จ เนื่องจากไม่พบข้อมูลเจ้าของสัตว์เลี้ยง') }

    // get profile id of user
    const profileId = user.profile._id;
    console.log("this "+user.profileId)

    switch (user.role) {
      case 'client':
        let client = await Client.findByIdAndUpdate({ _id: profileId },{
          firstName,
          lastName,
          email,
          contact,
          address,
        }, )

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

// exports.updateStaffUser = async (req, res, next) => {
//   try {
//     const {id} = req.params;
//     const {email, password, name, contact, address} = req.body;

//     //validation input
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
//         error.statusCode = 422;
//         error.validation = errors.array();
//         throw error;
//     } 
//     //check email ซ้ำ
//     const existEmail = await User.findOne({email: email});
//     if (existEmail){
//       const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
//       error.statusCode = 400;
//       throw error;
//   }
//     // encrypt password
//     const encryptPassword = await bcrypt.hash(password, 10);
//     let user = await User.updateOne({_id:id},{
//         email, 
//         password: encryptPassword
//     });

//     user = await User.findById(id).populate('_staff');

//     if(!user) { throw new Error('แก้ไขข้อมูลไม่สำเร็จ เนื่องจากไม่พบข้อมูลเจ้าหน้าที่') }

//     // get staffId of user
//     const staffId = user._staff[0]._id;
//     const staff = await Staff.updateOne({_id:staffId},{
//       name,
//       email,
//       contact,
//       address
//     })
//     // get new user profile
//     user = await User.findById(id).populate('_staff');

//     res.status(200).json({
//       message: 'แก้ไขข้อมูลผู้ใช้สำเร็จ',
//       data: {
//         newUser: user
//       }
//     });

//   } catch (error) {
//     next(error);
//   }
// }

// exports.destroy1 = async (req, res, next) => {
//   try {
//     const {id} =  req.params;
//     let user = await User.findById(id).populate({ 
//       path: 'profile',
//     })
//     if(!user) throw new Error('ไม่พบข้อมูลผู้ใช้');
//     // get client id
//     const clientId = user.profile
//     // unlink user and client
//     let client = await Client.updateOne({_id:clientId}, {
//       _user: null
//     });

//     user = await User.deleteOne({_id:id});
//     if(!user) throw new Error('ไม่สามารถลบบัญชีผู้ใช้เจ้าของสัตว์เลี้ยงได้')
//     client = await Client.findById(clientId)

//     res.status(200).json({
//       message: 'ลบผู้ใช้สำเร็จ',
//       data: {
//         user,
//         client
//       }
//     });

//   } catch (error) {
//     next(error);
//   }
// }

// exports.destroyStaff = async (req, res, next) => {
//   try {
//     const {id} =  req.params;
//     let user = await User.findById(id).populate('profile');
//     if(!user) throw new Error('ไม่พบข้อมูลผู้ใช้');
//     // get client id
//     const staffId = user.profile;
//     // unlink user and client
//     let staff = await Staff.updateOne({_id:staffId}, {
//       _user: null
//     });

//     user = await User.deleteOne({_id:id});
//     if(!user) throw new Error('ไม่สามารถลบบัญชีผู้ใช้พนักงานได้')
//     staff = await Staff.findById(staffId)

//     res.status(200).json({
//       message: 'ลบผู้ใช้สำเร็จ',
//       data: {
//         user,
//         staff
//       }
//     });

//   } catch (error) {
//     next(error);
//   }
// }

exports.destroy = async (req, res, next) => {
  try {
    const {id} =  req.params;
    let user = await User.findById(id).populate({ 
      path: 'profile',
    })
    if(!user) throw new Error('ไม่พบข้อมูลผู้ใช้');

    const profileId = user.profile._id;
    
    switch (user.role) {
      case 'client':
        // unlink user and client
        let client = await Client.updateOne({_id:profileId}, {
          _user: null
        });

        user = await User.deleteOne({_id:id});
        if(!user) throw new Error('ไม่สามารถลบบัญชีผู้ใช้เจ้าของสัตว์เลี้ยงได้')
        client = await Client.findById(profileId)

        res.status(200).json({
          message: 'ลบผู้ใช้สำเร็จ',
          user,
          client
          
        });

        break;

      case 'staff':
        // unlink user and client
        let staff = await Staff.updateOne({_id:profileId}, {
          _user: null
        });
        // delete user data
        user = await User.deleteOne({_id:id});
        if(!user) throw new Error('ไม่สามารถลบบัญชีผู้ใช้เจ้าหน้าที่ได้ได้')
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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    console.log('user: '+user);
    if(!user){
      const error = new Error('ไม่พบผู้ใช้งานในระบบ');
      error.statusCode = 404;
      throw error;
    }
    // check password
    const isValid = bcrypt.compareSync(password, user.password);
    if(!isValid){
      const error = new Error('รหัสผ่านไม่ถูกต้อง');
      error.statusCode = 401;
      throw error;
    }

    // generate token
    const token = await jwt.sign({
      id: user._id,
      role: user.role
    }, config.SECRET, {expiresIn: '1 days'})

     //decode วันหมดอายุ
     const expires_in = jwt.decode(token);

     return res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: 'Bearer'
  }); 
    

  } catch (error) {
    next(error)
  }
}

exports.logout = (req,res) => {
  try {
  
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.clearCookie('jwt')
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
    
  } catch (error) {
    next(error)
  }
  
};