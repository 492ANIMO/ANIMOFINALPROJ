const express = require('express');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const checkRole = require('../middleware/checkRole');

const petController = require('../controllers/petController');

const upload = require('../middleware/upload');

/* GET users listing. */
router.get('/', petController.index);
router.get('/mypet/', [passportJWT.isLogin], petController.showMyPet);
router.get('/mypet/:type', [passportJWT.isLogin], petController.showMyPetFilter);
router.get('/petCount', petController.petCount);

router.get('/petType', petController.allPetType);
router.post('/petType', petController.createPetType);
router.delete('/petType/:id', petController.destroyPetType);

router.get('/:id', petController.show);
router.get('/client/:clientId', petController.showByClient);
router.post('/', upload.single('avatar'), petController.create);
router.post('/:id/avatar/upload/',upload.single('avatar'), petController.upload);
router.delete('/:id', petController.destroy);
router.patch('/:id', petController.update);
router.patch('/avatar/:id', petController.avatar);


module.exports = router;
