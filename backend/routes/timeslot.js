const express = require('express');
const router = express.Router();

const timeslotController = require('../controllers/timeslotController');



router.post('/', timeslotController.showBookableTime );




module.exports = router;
