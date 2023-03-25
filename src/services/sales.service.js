const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createSale = async (arraySale) => {
  const error = await schema.validateNewSale(arraySale);
  if (error.type) return error;

  const newSaleId = await salesModel.createNewSale();

  await Promise.all(
    arraySale.map(async ({ productId, quantity }) => {
      await salesModel.insertSaleProducts(newSaleId, productId, quantity);
    }),
  );
  return { type: null, message: { id: newSaleId, itemsSold: arraySale } };
};

module.exports = {
  createSale,
};