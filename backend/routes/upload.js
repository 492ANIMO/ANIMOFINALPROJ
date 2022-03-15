const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload'); //local storage
const uploadImage = require('../middleware/uploadImage'); //google cloud storage
const multer = require('multer');

// router.post('/:id/avatar/upload/',upload.single('avatar'), clientController.upload);
router.post('/', uploadImage.single('avatar'), uploadController.create);


module.exports = router;
