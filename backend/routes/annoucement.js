const express = require('express');
const router = express.Router();

const annoucementController = require('../controllers/annoucementController.js');

/* GET users listing. */
router.get('/', annoucementController.index);
router.get('/:id', annoucementController.show);
router.post('/', annoucementController.create);
router.delete('/:id', annoucementController.destroy);
router.patch('/:id', annoucementController.update);



module.exports = router;
