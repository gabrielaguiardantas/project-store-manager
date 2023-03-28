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

const updateSaleProducts = async (saleId, arraySale) => {
  const error = await schema.validateNewSale(arraySale);
  if (error.type) return error;

  const saleBeforeDeletion = await salesModel.findById(saleId);
  if (saleBeforeDeletion.length >= 1) {
    await Promise.all(
      arraySale.map(async ({ productId, quantity }) => {
        await salesModel.updateSaleProducts(saleId, productId, quantity);
      }),
    );
    const saleAfterDeletion = await salesModel.findById(saleId);
    if (saleBeforeDeletion === saleAfterDeletion) {
      return {
        type: 'UPDATE ERROR',
        message: 'UPDATE METHOD UNSUCCESSFULL',
      };
    } return { type: null, message: { saleId, itemsUpdated: arraySale } };
  }
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const deleteSale = async (id) => {
  const saleBeforeDeletion = await salesModel.findById(id);
  if (saleBeforeDeletion.length >= 1) {
    await salesModel.deleteSale(id);
    const saleAfterDeletion = await salesModel.findById(id);
    if (saleBeforeDeletion === saleAfterDeletion) {
      return {
        type: 'DELETION ERROR',
        message: 'DELETION METHOD UNSUCCESSFULL',
      };
    }
    return { type: null, message: null };
  }
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const findAll = async () => {
  const sales = await salesModel.findAll();

  const newArray = [];

  await Promise.all(
    sales.map(async (sale) => {
      const [{ date }] = await salesModel.findById(sale.sale_id);
      newArray.push({
        date,
        saleId: sale.sale_id,
        quantity: sale.quantity,
        productId: sale.product_id,
      });
    }),
  );
  return { type: null, message: newArray };
};

const findBySaleId = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const sale = await salesModel.findBySaleId(id);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const newArray = [];

  await Promise.all(
    sale.map(async (itemSold) => {
      const [{ date }] = await salesModel.findById(itemSold.sale_id);
      newArray.push({
        date,
        quantity: itemSold.quantity,
        productId: itemSold.product_id,
      });
    }),
  );

  return { type: null, message: newArray };
 };

module.exports = {
  createSale,
  findAll,
  findBySaleId,
  deleteSale,
  updateSaleProducts,
};