const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const getProductsByTerm = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.findByTerm(q);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  
  const { type, message } = await productsService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id: productId } = req.params;

  const { type, message } = await productsService.updateProduct(productId, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json(message);
};

module.exports = {
  listProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByTerm,
};