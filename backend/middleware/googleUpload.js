const path = require('path')
const multer = require('multer')
const uuidv4 = require('uuid');
const { Storage } = require('@google-cloud/storage');

const serviceKey = path.join(__dirname, './keys.json')

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'animo-344110', 
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

module.exports = upload;


