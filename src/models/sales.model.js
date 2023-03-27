const connection = require('./connection');

const createNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?', [saleId],
  );
  return result;
};

const insertSaleProducts = async (newSaleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [newSaleId, productId, quantity],
  );

  return affectedRows;
};

const findBySaleId = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [saleId],
  );
  return result;
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return result;
};

module.exports = {
  createNewSale,
  insertSaleProducts,
  findBySaleId,
  findAll,
  findById,
};