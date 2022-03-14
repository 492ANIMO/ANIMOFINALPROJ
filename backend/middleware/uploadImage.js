const mime =  require('mime-types');
const {Storage} = require('@google-cloud/storage');
const uuidv4 = require('uuid');
const path = require('path')
const multer = require('multer')
const config = require('../config/index')

const serviceKey = path.join(__dirname, './keys.json')

const storage = new Storage({
  keyFilename: serviceKey,
  // projectId: config.GOOGLE_PROJECT_ID, 
  projectId: 'animo-344110', 
})

//file = req.file
const uploadImage = (file) => new Promise((resolve, reject) => {

  // const storage = new Storage({
  //   keyFilename: serviceKey,
  //   // projectId: config.GOOGLE_PROJECT_ID, 
  //   projectId: 'animo-344110', 
  // })

  const {originalname, buffer} =  file;
  console.log('originaleName')
  console.log(originalname)
  const type = mime.lookup(originalname);

  const bucket = storage.bucket(config.GOOGLE_BUCKET_NAME);
  const blob = bucket.file(`${uuidv4()}.${mime.extensions[type][0]}`);

  const blobStream = blob.createWriteStream({
    resumable: true,
		contentType: type,
		predefinedAcl: 'publicRead',
  })

  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  }).on('error', () => {
    console.log('error')
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
}) 

module.exports = uploadImage;