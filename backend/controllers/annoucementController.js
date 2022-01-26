const { validationResult } = require('express-validator');

// import models
const Annoucement = require('../models/annoucement');

exports.index = async (req, res, next) => {
  try {
    const annoucement = await Annoucement.find().sort({updatedAt: -1});
    if(!annoucement || annoucement==''){ throw new Error('ไม่พบข้อมูลข่าวสาร'); }

    // docs count
    const count = await Annoucement.countDocuments();

    res.status(200).json({
      message: 'ดึงข้อมูลข่าวสารสำเร็จ',
      annoucement,
      count
    });

  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const annoucement = await Annoucement.findById(id); 
    if(!annoucement){ throw new Error('ไม่พบข้อมูลข่าวสาร'); }

    res.status(200).json({
      message: 'สำเร็จ',
      annoucement
    });

  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const {title, body, author, img, type} = req.body;
    let annoucement = new Annoucement(req.body)
    if(req.file){
      annoucement.img = req.file.path
    }

    await annoucement.save((error, doc)=>{
      if(error) throw new Error('เพิ่มไม่สำเร็จ');

      res.status(200).json({
        message: 'เพิ่มข่าวสารสำเร็จ',
        annoucement: doc
      });
    })
  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {title, body, author, img, type} = req.body;

    // const annoucement = await Annoucement.findByIdAndUpdate({_id:id },{
    //   title,
    //   body, 
    //   author, 
    //   img,
    //   type,
    // },
    // { 
    //   new: true 
    // })

    const annoucement = await Annoucement.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body,
      {
        new: true,
      },
    );
    if(!annoucement){
      const error = new Error('แก้ไขข้อมูลข่าวสารไม่สำเร็จ')
      throw error;
    }

    res.status(200).json({
      message: 'แก้ไขข้อมูลข่าวสารสำเร็จ',
      annoucement, body: req.body
    });

  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params;
    
    const annoucement = await Annoucement.deleteOne({_id:id})

    if(annoucement.deletedCount===0){
      throw new Error('ลบข้อมูลข่าวสารไม่สำเร็จ');
    }

    res.status(200).json({
      message: 'ลบข่าวสารสำเร็จ',
      annoucement
    });

  } catch (error) {
    next(error);
  }
}




