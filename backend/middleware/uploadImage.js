const mime =  require('mime-types');
const {Storage} = require('@google-cloud/storage');
const uuidv4 = require('uuid');
const path = require('path')
const multer = require('multer')
const config = require('../config/index')

//file = req.file
const uploadImage = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

module.exports = uploadImage;