const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
];

const productMock = {
  name: 'Armadura de Ouro do cavaleiro de Gêmeos'
};

const newProductMock = { id: 1, ...productMock };

const productsListMock = [newProductMock];

module.exports = {
  allProducts,
  productMock,
  newProductMock,
  productsListMock,
}