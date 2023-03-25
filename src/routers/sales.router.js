const express = require('express');
const { salesController } = require('../controllers');
// const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.post(
  '/',
  // validateNewProductFields,
  salesController.createSale,
);

module.exports = router;