const express = require('express');
const router = express.Router();

const passportJWT = require('../middleware/passportJWT');
 

const historyController = require('../controllers/historyController');

/* GET users listing. */
router.get('/', historyController.index);
router.get('/myHistory/', [passportJWT.isLogin], historyController.myHistory);
router.get('/:id', historyController.show);
router.get('/pet/:petId', historyController.showByPetId);
// router.get('/:id', clientController.show);
// router.post('/', clientController.create);
// router.delete('/:id', clientController.destroy);
// router.delete('/', clientController.destroyAll);
// router.patch('/:id', clientController.update);



module.exports = router;
