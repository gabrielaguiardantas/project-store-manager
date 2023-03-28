const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.createSale);

router.get('/:id', salesController.getSales);

router.delete('/:id', salesController.deleteSale);

router.get('/', salesController.listSales);

module.exports = router;