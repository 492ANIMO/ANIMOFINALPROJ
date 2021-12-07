const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

/* GET users listing. */
router.get('/', clientController.index);
router.get('/:id', clientController.show);
router.post('/', clientController.create);
router.delete('/:id', clientController.destroy);
router.delete('/', clientController.destroyAll);
router.patch('/:id', clientController.update);



module.exports = router;
