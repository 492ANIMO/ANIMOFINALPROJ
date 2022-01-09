const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

/* GET users listing. */
router.get('/', appointmentController.index);
router.get('/:id', appointmentController.show);
router.get('/pet/:petId', appointmentController.showByPet);
router.get('/client/:clientId', appointmentController.showByOwner);
router.post('/', appointmentController.create);
router.delete('/:id', appointmentController.destroy);
// router.delete('/', appointmentController.destroyAll);
router.patch('/:id', appointmentController.update);
router.patch('/:id/confirm', appointmentController.confirm);



module.exports = router;
