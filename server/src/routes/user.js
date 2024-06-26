const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');



router.get('/stores', userController.stores);
router.post('/create', userController.create);
router.post('/find', userController.find);
router.get('/getInfoByAccId', userController.getInfoByAccId);
router.put('/edit/:id', userController.edit);
router.delete('/delete/:id', userController.delete);
router.delete('/deleteByAccId/:id', userController.deleteByAccId);

module.exports = router;
