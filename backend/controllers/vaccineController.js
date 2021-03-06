const { validationResult } = require('express-validator');

// import models
const Vaccine = require('../models/vaccine');

exports.index = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.find().sort({updatedAt: -1});
    if(!vaccine){ throw new Error('ไม่พบข้อมูลวัคซีน'); }

    const count = await Vaccine.countDocuments();

    res.status(200).json({
      message: 'ดึงข้อมูลสำเร็จ',
      vaccine,
      count
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const vaccine = await Vaccine.findById(id);
    if(!vaccine){ throw new Error('ไม่พบข้อมูลวัคซีน'); }

    res.status(200).json({
      message: 'สำเร็จ',
      vaccine
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const {name, type, manufacturer, lot_number, detail} = req.body;
    
    const vaccine = new Vaccine(req.body)

    await vaccine.save((error, doc)=>{
      if(error) throw error;

      res.status(200).json({
        message: 'เพิ่มวัคซีนสำเร็จ',
        vaccine: doc
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
    
    const vaccine = await Vaccine.updateOne({_id:id },{
      name,
      type,
      manufacturer,
      lot_number,
      detail
    })

    res.status(200).json({
      message: 'แก้ไขข้อมูลวัคซีนสำเร็จ',
      vaccine
    });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;
    
    const vaccine = await Vaccine.deleteOne({_id:id})

    if(vaccine.deletedCount===0){
      throw new Error('ลบข้อมูลวัคซีนไม่สำเร็จ');
    }

    res.status(200).json({
      message: 'ลบข้อมูลวัคซีนสำเร็จ',
      vaccine
    });

  } catch (error) {
    next(error);
  }
}



