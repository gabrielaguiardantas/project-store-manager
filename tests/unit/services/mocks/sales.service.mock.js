const saleWithoutProductId = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const saleWithoutQuantity = [
  {
    "productId": 1,
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const saleWithInvalidQuantity = [
  {
    "productId": 1,
    "quantity": 2
  },
  {
    "productId": 2,
    "quantity": -3
  }
];

const validSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const validSaleResult = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = {
  saleWithoutProductId,
  saleWithoutQuantity,
  saleWithInvalidQuantity,
  validSale,
  validSaleResult
}