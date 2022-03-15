const mime =  require('mime-types');
const {Storage} = require('@google-cloud/storage');
const uuid = require('uuid');
const path = require('path')
const config = require('../config/index')

const serviceKey = path.join(__dirname, './keys.json')

const uploadImage = (file) => new Promise((resolve, reject) => {

  const {originalname, buffer} = file;
  const type = mime.lookup(originalname);
  console.log(type);

  const storage = new Storage({
    keyFilename: serviceKey,
    projectId: config.GOOGLE_PROJECT_ID, 
    // projectId: 'animo-344110', 
  })

  const bucket = storage.bucket(config.GOOGLE_BUCKET_NAME);
  const blob = bucket.file(`${uuid.v4()}.${mime.extensions[type][0]}`)
  console.log(`type: ${JSON.stringify(type)}`)

  const blobStream = blob.createWriteStream({
    resumable: false,
		contentType: type,
		// predefinedAcl: 'publicRead',
  })

  blobStream.on('finish', () => {
    const publicUrl =  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    
    resolve(publicUrl)
  }).on('error', () => {
    console.log('error')
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
}) 

module.exports = uploadImage;