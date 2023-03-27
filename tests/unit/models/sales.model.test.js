const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { newSale, allSales } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de Sales', function () {
  describe('cadastrando nas tabelas sales e sales_products', function () {
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
  });
  describe('listando as sales na tabela sales_products', function () {
    it('listando todas as sales', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([allSales]);
      // act
      const result = await salesModel.findAll();
      // assert
      expect(result).to.be.deep.equal(allSales);
    });
    it('listando sale específica pelo Id', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([allSales]);
      // act
      const result = await salesModel.findById(2);
      // assert
      expect(result).to.be.deep.equal(allSales);    
    })
  })
  afterEach(function () {
    sinon.restore();
  });
})