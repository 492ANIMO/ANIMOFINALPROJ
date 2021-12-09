const { validationResult } = require('express-validator');

// import models
const Package = require('../models/package');
const Vaccine = require('../models/vaccine');

exports.index = async (req, res, next) => {
  try {
    const package = await Package.find();
    if(!package){ throw new Error('ไม่พบข้อมูลแพ็คเกจ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: package
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const package = await Package.findById(id).populate('vaccineObj', '-createdAt -updatedAt');
    if(!package){ throw new Error('ไม่พบข้อมูลแพ็คเกจ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: package
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { name, vaccineId, treatmentId, healthCheckId, detail, time, price } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }

    const vaccineObj = await Vaccine.find().where('_id').in(vaccineId).exec();

    const package = new Package({
      name,
      vaccineObj,
      // treatmentObj,
      // healthCheckObj,
      detail,
      time,
      price
    })
    await package.save();

    res.status(200).json({
      message: 'บันทึกข้อมูลสำเร็จ',
      data: package
    });

  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { name, vaccine, treatment, healthCheck, detail, time, price } = req.body;
    const package = await Package.updateOne({_id:id}, {
      name, 
      vaccine, 
      treatment, 
      healthCheck, 
      detail, 
      time, 
      price
    })

    if(package.modifiedCount===0){ throw new Error('เปลี่ยนแปลงข้อมูลแพ็คเกจไม่สำเร็จ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: package
    });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;
    const package = await Package.deleteOne({_id:id})
    if(package.deletedCount===0){ throw new Error('ลบข้อมูลแพ็คเกจไม่สำเร็จ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: package
    });

  } catch (error) {
    next(error);
  }
}


