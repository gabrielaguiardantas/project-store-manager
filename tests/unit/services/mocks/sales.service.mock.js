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

const specificSale = [
  {
    "date": '2023-03-26T21:31:14.000Z',
    "productId": 3,
    "quantity": 15
  }
];

const allSales = [
  { quantity: 5, sale_id: 1, product_id: 1 }
]

const allSalesConverted = [{
  date: '2023-03-26T21:31:14.000Z',
  quantity: 5,
  saleId: 1,
  productId: 1
}];

const dateMock = [
 { id: 1, date: '2023-03-26T21:31:14.000Z' } 
];

const updatedSaleMock = [
  {
    "productId": 3,
    "quantity": 20
  }
];

const updatedSaleMockConverted = {
  "saleId": 2,
  "itemsUpdated": [
    {
      "productId": 3,
      "quantity": 20
    }
  ]
};

module.exports = {
  saleWithoutProductId,
  saleWithoutQuantity,
  saleWithInvalidQuantity,
  validSale,
  validSaleResult,
  allSales,
  allSalesConverted,
  dateMock,
  specificSale,
  updatedSaleMock,
  updatedSaleMockConverted
}