const express = require('express');
const router = express.Router();

const treatmentController = require('../controllers/treatmentController');

/* GET users listing. */
router.get('/', treatmentController.index);
router.get('/:id', treatmentController.show);

router.post('/', treatmentController.create);
router.delete('/:id', treatmentController.destroy);
router.patch('/:id', treatmentController.update);


module.exports = router;
