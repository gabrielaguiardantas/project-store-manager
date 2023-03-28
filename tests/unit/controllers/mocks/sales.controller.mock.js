const saleMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newSaleMock = { id: 1, itemsSold: saleMock };

const allSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }];

const specificSale = [
  {
    "date": '2023-03-26T21:31:14.000Z',
    "productId": 3,
    "quantity": 15
  }
];

const updateSaleMock = [
  {
    "productId": 3,
    "quantity": 20
  }
];

const updateSaleMockConverted = {
  "saleId": 2,
  "itemsUpdated": [
    {
      "productId": 3,
      "quantity": 20
    }
  ]
};

module.exports = {
  saleMock,
  newSaleMock,
  allSales,
  specificSale,
  updateSaleMock,
  updateSaleMockConverted
}