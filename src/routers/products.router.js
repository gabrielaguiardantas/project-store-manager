const express = require('express');
const { productsController } = require('../controllers');
const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/search', productsController.getProductsByTerm);

router.get(
  '/:id',
  productsController.getProducts,
);

router.delete('/:id', productsController.deleteProduct);

router.put('/:id', productsController.updateProduct);

router.post(
  '/',
  validateNewProductFields,
  productsController.createProduct,
);

module.exports = router;