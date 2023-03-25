const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { newSale } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de Sales', function () {
  it('Cadastrando uma nova sale na tabela sales', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    // act
    const result = await salesModel.createNewSale();
    // assert
    expect(result).equal(3);
  });
  it('Cadastrando uma nova sale na tabela sales_products', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    // act
    const result = await salesModel.insertSaleProducts(newSale);
    // assert
    expect(result).equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
})