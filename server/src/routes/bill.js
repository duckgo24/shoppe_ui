const express = require('express');
const router = express.Router();
const BillController = require('../controllers/BillController');

router.post('/create', BillController.create);
router.get('/find', BillController.findBillByAccount);
router.get('/find/:id', BillController.findBillById);
router.put('/update/:id', BillController.update);
router.delete('/delete/:id', BillController.delete);

module.exports = router;