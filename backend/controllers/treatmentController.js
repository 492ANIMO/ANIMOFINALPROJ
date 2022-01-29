const { validationResult } = require('express-validator');

// import models
// const Treatment = require('../models/treatment');
const Treatment = require('../models/treatment');

exports.index = async (req, res, next) => {
  try {
    const treatment = await Treatment.find();
    if(!treatment){ throw new Error('ไม่พบข้อมูลการรักษา'); }

    const count = await Treatment.countDocuments();

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      treatment,
      count
    });

  } catch (error) {
    next(error);
  }
}
exports.treatments = async (req, res, next) => {
  try {
    const treatment = await Treatment.find({type: 'การรักษา'});
    if(!treatment){ throw new Error('ไม่พบข้อมูลการรักษา'); }

    const count = await Treatment.countDocuments();

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      treatment,
      count
    });

  } catch (error) {
    next(error);
  }
}
exports.healthChecks = async (req, res, next) => {
  try {
    const treatment = await Treatment.find({type: 'การตรวจสุขภาพ'});
    if(!treatment){ throw new Error('ไม่พบข้อมูลการรักษา'); }

    const count = await Treatment.countDocuments();

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      treatment,
      count
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const treatment = await Treatment.findById(id);
    if(!treatment){ throw new Error('ไม่พบข้อมูลการรักษา'); }

    res.status(200).json({
      message: 'สำเร็จ',
      treatment
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const {name, type, manufacturer, lot_number, detail} = req.body;
    
    const treatment = new Treatment(req.body)

    await treatment.save((error, doc)=>{
      if(error) throw new Error('เพิ่มรายการการรักษาไม่สำเร็จ');

      res.status(200).json({
        message: 'เพิ่มการรักษาสำเร็จ',
        treatment: doc
      });
    })
  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name, type, manufacturer, lot_number, detail} = req.body;
    
    const treatment = await Treatment.updateOne({_id:id },{
      name,
      type,
      manufacturer,
      lot_number,
      detail
    })
    if(treatment.matchedCount===0){
      throw new Error('แก้ไขข้อมูลการรักษาไม่สำเร็จ ไม่พบการรักษา');
    }

    res.status(200).json({
      message: 'แก้ไขข้อมูลการรักษาสำเร็จ',
      treatment
    });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;
    
    const treatment = await Treatment.deleteOne({_id:id})

    if(treatment.deletedCount===0){
      throw new Error('ลบข้อมูลการรักษาไม่สำเร็จ');
    }

    res.status(200).json({
      message: 'ลบข้อมูลการรักษาสำเร็จ',
      treatment
    });

  } catch (error) {
    next(error);
  }
}



