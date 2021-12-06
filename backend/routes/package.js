const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');
const packageController = require('../controllers/packageController');

/* GET users listing. */
router.get('/', packageController.index);
router.get('/:id', packageController.show);

router.post('/', packageController.create);
router.delete('/:id', packageController.destroy);
router.put('/:id', packageController.update);


module.exports = router;
