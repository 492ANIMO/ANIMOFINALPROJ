const express = require('express');
const router = express.Router();

const passportJWT = require('../middleware/passportJWT');

const clientController = require('../controllers/clientController');
const upload = require('../middleware/upload');
const uploadImage = require('../middleware/uploadImage');
const multer = require('multer');
/* GET users listing. */
router.get('/',  clientController.index);
router.get('/:id', clientController.show);
router.post('/',upload.single('avatar') , clientController.create);
router.delete('/:id', clientController.destroy);
router.delete('/', clientController.destroyAll);

// router.post('/:id/avatar/upload/',upload.single('avatar'), clientController.upload);
router.post('/:id/avatar/upload/', uploadImage.single('avatar'), clientController.upload);

router.patch('/:id', clientController.update);
router.patch('/avatar/:id', clientController.avatar);

module.exports = router;
