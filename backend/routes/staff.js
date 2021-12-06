const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staffController');

/* GET users listing. */
router.get('/', staffController.index);
router.get('/:id', staffController.show);
router.post('/', staffController.create);
router.delete('/:id', staffController.destroy);
// router.delete('/', clientController.destroyAll);
router.put('/:id', staffController.update);



module.exports = router;
