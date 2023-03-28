const newSale = {
  salesId: 1,
  productId: 1,
  quantity: 3
};

const allSales = [[
  { sale_id: 1, product_id: 1, quantity: 5 },
  { sale_id: 1, product_id: 2, quantity: 10 },
  { sale_id: 2, product_id: 3, quantity: 15 }
]];

const updateSaleMock = [
  {
    "productId": 1,
    "quantity": 10
  }
];

module.exports = {
  newSale,
  allSales,
  updateSaleMock,
};