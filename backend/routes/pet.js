const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');

/* GET users listing. */
router.get('/', petController.index);
router.get('/mypet', petController.showMyPet);
router.get('/:id', petController.show);
router.get('/client/:clientId', petController.showByClient);
router.post('/', petController.create);
router.delete('/:id', petController.destroy);
router.put('/:id', petController.update);


module.exports = router;
