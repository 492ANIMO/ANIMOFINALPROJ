const express = require('express');
const router = express.Router();

const passportJWT = require('../middleware/passportJWT');

const clientController = require('../controllers/clientController');
const upload = require('../middleware/upload');
/* GET users listing. */
router.get('/',  clientController.index);
router.get('/:id', clientController.show);
router.post('/',upload.single('avatar') , clientController.create);
router.delete('/:id', clientController.destroy);
router.delete('/', clientController.destroyAll);
router.patch('/:id', clientController.update);



module.exports = router;
