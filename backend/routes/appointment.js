const express = require('express');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');

const appointmentController = require('../controllers/appointmentController');

/* GET users listing. */
router.get('/', appointmentController.index);

router.get('/myAppointment', [passportJWT.isLogin], appointmentController.showMyAppointment);
router.get('/:id', appointmentController.show);
router.get('/pet/:petId', appointmentController.showByPet);
router.get('/client/:clientId', appointmentController.showByOwner);
router.post('/', appointmentController.create);
router.delete('/:id', appointmentController.destroy);
router.patch('/confirm/:id', appointmentController.confirm);
router.patch('/:id', appointmentController.update);




module.exports = router;
