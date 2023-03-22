const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

  // it('Recuperando um produto a partir do seu id', async function () {
  //   // Arrange
  //   sinon.stub(connection, 'execute').resolves([[passengers[0]]]);
  //   // Act
  //   const result = await passengerModel.findById(1);
  //   // Assert
  //   expect(result).to.be.deep.equal(passengers[0]);
  // });

  // it('Cadastrando um produto', async function () {
  //   // Arrange
  //   sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
  //   // Act
  //   const result = await passengerModel.insert(newPassenger);
  //   // Assert
  //   expect(result).to.equal(42);
  // });

  afterEach(function () {
    sinon.restore();
  });
});