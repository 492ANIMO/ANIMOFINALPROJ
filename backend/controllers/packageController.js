const { validationResult } = require('express-validator');

// import models
const Package = require('../models/package');
const Vaccine = require('../models/vaccine');
const Treatment = require('../models/treatment');
const HealthCheck = require('../models/healthCheck');

exports.index = async (req, res, next) => {
  try {
    const package = await Package.find()
    .populate('vaccineObj')
    .populate('treatmentObj')
    .populate('healthCheckObj');
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
    const package = await Package.findById(id).populate('vaccineObj')
    .populate('treatmentObj')
    .populate('healthCheckObj');
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
    const { name, vaccineId, treatmentId, healthCheckId, detail, price } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }

    const vaccineObj = await Vaccine.find().where('_id').in(vaccineId).exec();
    const treatmentObj = await Treatment.find().where('_id').in(treatmentId).exec();
    const healthCheckObj = await HealthCheck.find().where('_id').in(healthCheckId).exec();

    const package = new Package({
      name,
      vaccineObj,
      treatmentObj,
      healthCheckObj,
      detail,
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
    const { name, vaccineId, treatmentId, healthCheckId, detail, price } = req.body;

    const vaccineObj = await Vaccine.find().where('_id').in(vaccineId).exec();
    const treatmentObj = await Treatment.find().where('_id').in(treatmentId).exec();
    const healthCheckObj = await HealthCheck.find().where('_id').in(healthCheckId).exec();

    const package = await Package.updateOne({_id:id}, {
      name, 
      vaccineObj, 
      treatmentObj, 
      healthCheckObj, 
      detail, 
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


