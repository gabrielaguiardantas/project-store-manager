const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    // Act
    const result = await productsModel.insert(newProduct);
    // Assert
    expect(result).to.equal(4);
  });
  it('Atualizando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    // Act
    const result = await productsModel.update(1, {
      "name": "Martelo do Batman"
    });
    // Assert
    expect(result).to.equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
});