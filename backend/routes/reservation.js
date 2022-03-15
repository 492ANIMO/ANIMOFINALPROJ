const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController.js');

/* GET users listing. */
router.get('/', reservationController.index);
router.get('/today', reservationController.filterTodayReservation);
router.get('/:id', reservationController.show);

router.post('/', reservationController.create);
router.delete('/:id', reservationController.destroy);
// router.patch('/:id', reservationController.update);
router.patch('/confirm/:id', reservationController.confirm);
router.patch('/cancel/:id', reservationController.cancel);


module.exports = router;
