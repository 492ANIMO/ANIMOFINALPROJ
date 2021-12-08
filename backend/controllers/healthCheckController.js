const { validationResult } = require('express-validator');

// import models
// const HealthCheck = require('../models/healthcheck');
const HealthCheck = require('../models/healthCheck');

exports.index = async (req, res, next) => {
  try {
    const healthcheck = await HealthCheck.find();
    if(!healthcheck){ throw new Error('ไม่พบข้อมูลการตรวจสุขภาพ'); }

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      data: healthcheck
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const healthcheck = await HealthCheck.findById(id);
    if(!healthcheck){ throw new Error('ไม่พบข้อมูลการตรวจสุขภาพ'); }

    res.status(200).json({
      message: 'สำเร็จ',
      data: healthcheck
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const {name, type, manufacturer, lot_number, detail} = req.body;
    
    const healthcheck = new HealthCheck({
      name,
      type,
      manufacturer,
      lot_number,
      detail
    })

    healthcheck.save((error)=>{
      if(error) throw error;
    })

    res.status(200).json({
      message: 'เพิ่มการตรวจสุขภาพสำเร็จ',
      data: healthcheck
    });

  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name, type, manufacturer, lot_number, detail} = req.body;
    
    const healthcheck = await HealthCheck.updateOne({_id:id },{
      name,
      type,
      manufacturer,
      lot_number,
      detail
    })
    if(healthcheck.matchedCount===0){
      throw new Error('แก้ไขข้อมูลการตรวจสุขภาพไม่สำเร็จ ไม่พบการตรวจสุขภาพ');
    }

    res.status(200).json({
      message: 'แก้ไขข้อมูลการตรวจสุขภาพสำเร็จ',
      data: healthcheck
    });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;
    
    const healthcheck = await HealthCheck.deleteOne({_id:id})

    if(healthcheck.deletedCount===0){
      throw new Error('ลบข้อมูลการตรวจสุขภาพไม่สำเร็จ');
    }

    res.status(200).json({
      message: 'ลบข้อมูลการตรวจสุขภาพสำเร็จ',
      data: healthcheck
    });

  } catch (error) {
    next(error);
  }
}



