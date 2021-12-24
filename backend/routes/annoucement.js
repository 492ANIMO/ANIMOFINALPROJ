const express = require('express');
const router = express.Router();

const annoucementController = require('../controllers/annoucementController.js');

/* GET users listing. */
router.get('/', annoucementController.index);
// router.get('/:id', annoucementController.show);
// router.get('/pet/:petId', annoucementController.showByPet);
// router.get('/client/:clientId', annoucementController.showByOwner);
// router.post('/', annoucementController.create);
// router.delete('/:id', annoucementController.destroy);
// // router.delete('/', annoucementController.destroyAll);
// router.patch('/:id', annoucementController.update);
// router.patch('/:id/confirm', annoucementController.confirm);



module.exports = router;
