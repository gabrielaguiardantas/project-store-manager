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

  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;
  
  const updatedProduct = await productsModel.findById(productId);
  console.log(updatedProduct, productId, name);
  if (updatedProduct) {
    await productsModel.update(productId, name);
   const updatedProduct2 = await productsModel.findById(productId); 
    return { type: null, message: updatedProduct2 };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};