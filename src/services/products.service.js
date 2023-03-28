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

const findByTerm = async (term) => {
  const products = await productsModel.findByTerm(term);
  return { type: null, message: products };
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
  if (updatedProduct) {
   await productsModel.update(productId, name);
   const updatedProduct2 = await productsModel.findById(productId); 
   return { type: null, message: updatedProduct2 };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const deleteProduct = async (id) => {
  const productBeforeDeletion = await productsModel.findById(id);
  if (productBeforeDeletion) {
    await productsModel.deleteProduct(id);
    const productAfterDeletion = await productsModel.findById(id);
    if (productBeforeDeletion === productAfterDeletion) {
      return {
        type: 'DELETION ERROR',
        message: 'DELETION METHOD UNSUCCESSFULL',
      };
    }
    return { type: null, message: null };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  findByTerm,
};