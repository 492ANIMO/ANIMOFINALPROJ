const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController.js');

/* GET users listing. */
router.get('/', reservationController.index);
router.get('/:id', reservationController.show);

router.post('/', reservationController.create);
// router.delete('/:id', reservationController.destroy);
// router.patch('/:id', reservationController.update);


module.exports = router;
