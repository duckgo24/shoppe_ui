
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/stores', productController.show);
router.post('/create', productController.insert);
router.get('/search', productController.searchByName)
router.get('/search/:id', productController.searhbyId)
router.put('/edit/:id', productController.edit)
router.delete('/delete/:id', productController.delete)

module.exports = router;
