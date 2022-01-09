const express = require('express');
const router = express.Router();

const healthCheckController = require('../controllers/healthCheckController');

/* GET users listing. */
router.get('/', healthCheckController.index);
router.get('/:id', healthCheckController.show);

router.post('/', healthCheckController.create);
router.delete('/:id', healthCheckController.destroy);
router.patch('/:id', healthCheckController.update);


module.exports = router;
