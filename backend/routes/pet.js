const express = require('express');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const checkRole = require('../middleware/checkRole');

const petController = require('../controllers/petController');

const upload = require('../middleware/upload');

/* GET users listing. */
router.get('/', petController.index);
router.get('/mypet', [passportJWT.isLogin], petController.showMyPet);
router.get('/petCount', petController.petCount);
router.get('/:id', petController.show);
router.get('/client/:clientId', petController.showByClient);
router.post('/', upload.single('avatar'), petController.create);
router.delete('/:id', petController.destroy);
router.patch('/:id', petController.update);


module.exports = router;
