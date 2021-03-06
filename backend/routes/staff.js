const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staffController');

const upload = require('../middleware/upload');


router.get('/', staffController.index);
router.get('/vets', staffController.showVet);
router.get('/:id', staffController.show);
router.post('/', upload.single('avatar'), staffController.create);
router.delete('/:id', staffController.destroy);
router.patch('/:id', staffController.update);



module.exports = router;
