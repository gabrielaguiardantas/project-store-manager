const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.createSale(sale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const listSales = async (req, res) => { 
  const { type, message } = await salesService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findBySaleId(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const arraySale = req.body;

  const { type, message } = await salesService.updateSaleProducts(id, arraySale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  createSale,
  listSales,
  getSales,
  deleteSale,
  updateSale,
};