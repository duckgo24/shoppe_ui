
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/stores',categoryController.getAll);
router.post('/create', categoryController.create);
router.get('/search', categoryController.searchByName)
router.put('/edit/:id', categoryController.edit)
router.delete('/delete/:id', categoryController.delete)

module.exports = router;
