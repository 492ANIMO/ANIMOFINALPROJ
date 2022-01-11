const { validationResult } = require('express-validator');

// import models
const Package = require('../models/package');
const Vaccine = require('../models/vaccine');
const Treatment = require('../models/treatment');
const HealthCheck = require('../models/healthCheck');

exports.index = async (req, res, next) => {
  try {
   
    const package = await Package.find()
    .populate({ 
      path: 'vaccines',
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'treatments',
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'healthChecks',
     select: '-createdAt -updatedAt -__v', 
    })
    if(!package){ throw new Error('ไม่พบข้อมูลแพ็คเกจ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      package
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const package = await Package.findById(id)
    .populate({ 
      path: 'vaccines',
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'treatments',
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'healthChecks',
     select: '-createdAt -updatedAt -__v', 
    })
    if(!package){ throw new Error('ไม่พบข้อมูลแพ็คเกจ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      package
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

    const vaccines = await Vaccine.find().where('_id').in(vaccineId).exec();
    const treatments = await Treatment.find().where('_id').in(treatmentId).exec();
    const healthChecks = await HealthCheck.find().where('_id').in(healthCheckId).exec();

    const package = new Package({
      name,
      vaccines,
      treatments,
      healthChecks,
      detail,
      price
    })
    await package.save();

    res.status(200).json({
      message: 'บันทึกข้อมูลสำเร็จ',
      package
    });

  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { name, vaccineId, treatmentId, healthCheckId, detail, price } = req.body;

    const vaccines = await Vaccine.find().where('_id').in(vaccineId).exec();
    const treatments = await Treatment.find().where('_id').in(treatmentId).exec();
    const healthChecks = await HealthCheck.find().where('_id').in(healthCheckId).exec();
    const package = await Package.findOneAndUpdate({
      _id: id
    }, {
      name,
      vaccines,
      treatments,
      healthChecks,
      detail,
      price
    }, {
      returnDocument: 'after'
    }).populate({ 
      path: 'vaccines',
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'treatments',
     select: '-createdAt -updatedAt -__v', 
    })
    .populate({ 
      path: 'healthChecks',
     select: '-createdAt -updatedAt -__v', 
    })
    if(!package){ throw new Error('เปลี่ยนแปลงข้อมูลแพ็คเกจไม่สำเร็จ'); }

    res.status(200).json({
      message: 'เปลี่ยนแปลงข้อมูลแพ็คเกจสำเร็จ',
      package
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
      package
    });

  } catch (error) {
    next(error);
  }
}


