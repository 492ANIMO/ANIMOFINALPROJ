// import modela
const User = require('../models/user');
const Staff = require('../models/staff');

//export function here...
exports.index = async (req, res, next) => {
  try {
    const staff = await Staff.find();
    if(!staff){ throw new Error('ไม่พบข้อมูลเจ้าหน้าที่'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: staff
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const staff = await Staff.findById(id).populate('_user');
    if(!staff){ throw new Error('ไม่พบข้อมูลเจ้าหน้าที่'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: staff
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const {name, email, contact, address, role } = req.body;

    let staff = new Staff({
      name, 
      email,
      contact,
      address,
      role
    })

    if(req.file){
      staff.avatar = req.file.path
    }

    await staff.save();

    res.status(200).json({
      message: 'สำเร็จ',
      data: staff
    });

  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { name, email, contact, address } = req.body;

    let staff = await Staff.updateOne({_id:id}, {
      name,
      email,
      contact,
      address
    })
    if(staff.modifiedCount===0){
      const error = new Error('ไม่สามารถแก้ไขข้อมูลเจ้าหน้าที่ได้');
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: 'แก้ไขข้อมูลสำเร็จ',
      staff
  });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {  
  try {
    const {id} = req.params;
    // check if client have user accout
    let staff = await Staff.findById(id).populate('_user');

    if(staff._user === undefined) { //doesnt have usr account -> delete client
      let deleteStaff = await Staff.deleteOne({_id:id})
      if(deleteStaff.deletedCount === 0){ 
        throw new Error('ลบข้อมูลเจ้าหน้าที่ไม่สำเร็จ');
      }
      res.status(200).json({
        message: 'ไม่มีuser ลบข้อมูลเจ้าหน้าที่สำเร็จ',
        staff
      })
    ;} else{ //client have user account -> delete user account
      const user = await User.deleteOne({_id:staff._user});
      if(user.deletedCount === 0) throw new Error('ไม่สามารถลบบัญชีผู้ใช้เจ้าหน้าที่ได้')

      staff = await Staff.deleteOne({_id:id});
      if(staff.deletedCount === 0) throw new Error('ไม่สามารถลบข้อมูลเจ้าหน้าที่ได้')

      res.status(200).json({
        message: 'มี user ลบข้อมูลเจ้าหน้าที่และบัญชีผู้ใช้เรียบร้อย',
        user, 
        staff
      });
    }

  } catch (error) {
    next(error);
  }
}
