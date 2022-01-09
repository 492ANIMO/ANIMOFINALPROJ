const express = require('express');
const router = express.Router();

const annoucementController = require('../controllers/annoucementController.js');

const upload = require('../middleware/upload');

/* GET users listing. */
router.get('/', annoucementController.index);
router.get('/:id', annoucementController.show);
router.post('/', upload.single('img'), annoucementController.create);
router.delete('/:id', annoucementController.destroy);
router.patch('/:id', annoucementController.update);

module.exports = router;
