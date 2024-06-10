const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');


router.post('/create', accountController.insert)
router.get('/search', accountController.search)
router.get('/stores', accountController.stores);
router.get('/getAccountIdByUsername', accountController.getAccountIdByUsername)
router.delete('/delete/:id', accountController.delete)
router.put('/edit/:id', accountController.update)




module.exports = router;
