// src/services/validations/validationsInputValues.js

const { productsModel } = require('../../models');
const { idSchema, addProductSchema, addSaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate(name);
  if (error) {
    if (!error.message
      .includes('least 5')) {
      return { type: 'MISSING_ARGUMENTS', message: error.message };
    }
    return { type: 'INVALID_VALUE', message: error.message };
  }
  return { type: null, message: '' };
};

const validateNewSale = async (arraySale) => {
  const { error } = addSaleSchema.validate(arraySale);
  if (error) {
    if (!error.message
      .includes('greater')) return { type: 'MISSING_ARGUMENTS', message: error.message };
    return { type: 'INVALID_VALUE', message: error.message };
  }
  const allProducts = await productsModel.findAll();
  if (!arraySale.every((itemSold) => allProducts
    .some((product) => product.id === itemSold
      .productId))) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
};