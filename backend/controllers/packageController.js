const { validationResult } = require('express-validator');

// import models
const Package = require('../models/package');
const Vaccine = require('../models/vaccine');
const Treatment = require('../models/treatment');
const HealthCheck = require('../models/healthCheck');

exports.index = async (req, res, next) => {
  try {
   
    const package = await Package.find()
    .sort({updatedAt: -1})
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
    let { name, type, vaccines, treatments, healthChecks, detail, price } = req.body;

    // check if input value is empty string
    if (req.body.detail === '') {
      detail = '-';
    }

    const package = new Package({
      name,
      type,
      vaccines,
      treatments,
      healthChecks, //
      detail,
      price
    })
    await package.save();

    res.status(200).json({
      message: 'บันทึกข้อมูลสำเร็จ',
      package,
      packageDetail: detail
    });

  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    let { name, vaccines, treatments, healthChecks, detail, price, type } = req.body;
    console.log(req.body);

     // check if input value is empty string
     if (req.body.detail === '') {
      req.body.detail = '-';
    }

    const package = await Package.findOneAndUpdate({
      _id: id
    }, req.body, {
      returnDocument: 'after'
    })
    if(!package){ throw new Error('เปลี่ยนแปลงข้อมูลแพ็คเกจไม่สำเร็จ'); }

    const count = await Package.countDocuments();

    res.status(200).json({
      message: 'เปลี่ยนแปลงข้อมูลแพ็คเกจสำเร็จ',
      package,
      count
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

exports.filterByType = async (req, res, next) => {
  try {
    const {type} = req.params;
    const package = await Package.find({
      type: type
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


