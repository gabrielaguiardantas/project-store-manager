const express = require('express');
const { productsController } = require('../controllers');
const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get(
  '/:id',
  productsController.getProducts,
);

router.put('/:id', productsController.updateProduct);

router.post(
  '/',
  validateNewProductFields,
  productsController.createProduct,
);

module.exports = router;