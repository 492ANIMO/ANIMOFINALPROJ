// const path = require('path')
const uploadImage = require('../helpers/googleUpload');

exports.create = async (req, res, next) => {
  try {
    if (req.file){
      const imageUrl = await uploadImage(req.file);
      console.log('imageUrl: ');
      console.log(imageUrl);
      if(!imageUrl){
        throw new Error('ไม่สามารถอัพโหลดรูปภาพได้');
      }
      res.status(201).json({
          message: 'อัพโหลดรูปภาพสำเร็จ',
          imageUrl
        })
    }
    
  } catch (error) {
    next(error)
  }
}
