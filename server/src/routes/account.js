const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');

router.get('/getAccountIdByUsername', accountController.getAccountIdByUsername)
router.get('/stores', accountController.stores);
router.post('/create', accountController.insert)
router.get('/search', accountController.search)



module.exports = router;
