const { productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newPassengerId = await productsModel.insert({ name });
  const newPassenger = await productsModel.findById(newPassengerId);

  return { type: null, message: newPassenger };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};