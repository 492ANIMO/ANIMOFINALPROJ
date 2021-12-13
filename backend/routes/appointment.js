const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

/* GET users listing. */
router.get('/', appointmentController.index);
router.get('/:id', appointmentController.show);
router.post('/', appointmentController.create);
router.delete('/:id', appointmentController.destroy);
// router.delete('/', appointmentController.destroyAll);
router.patch('/:id', appointmentController.update);



module.exports = router;
