const express = require('express');
const router = express.Router();

const vaccineController = require('../controllers/vaccineController');

/* GET users listing. */
router.get('/', vaccineController.index);
router.get('/:id', vaccineController.show);

router.post('/', vaccineController.create);
router.delete('/:id', vaccineController.destroy);
router.patch('/:id', vaccineController.update);


module.exports = router;
