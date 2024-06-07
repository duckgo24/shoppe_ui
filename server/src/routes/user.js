const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');



router.post('/create', userController.create);
router.get('/getInfoByAccId', userController.getInfoByAccId);
router.put('/edit/:id', userController.edit);

module.exports = router;
