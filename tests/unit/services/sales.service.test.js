const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { saleWithoutProductId, saleWithoutQuantity, saleWithInvalidQuantity, validSale, validSaleResult, allSales, allSalesConverted, dateMock, specificSale } = require('./mocks/sales.service.mock');


describe('Testes de unidade do service de Sales', function () {
  describe('cadastro de uma sale com valores inválidos', function () {
    it('retorna um erro ao passar uma sale sem productId', async function () {
      // arrange: Novamente não precisamos de um arranjo pois esse é um fluxo que não chama o model!
      // act
      const result = await salesService.createSale(saleWithoutProductId);

      // assert
      expect(result.type).to.equal('MISSING_ARGUMENTS');
      expect(result.message).to.equal("\"productId\" is required");
    });
    it('retorna um erro ao passar uma sale sem quantity', async function () {
      // arrange: Novamente não precisamos de um arranjo pois esse é um fluxo que não chama o model!
      // act
      const result = await salesService.createSale(saleWithoutQuantity);

      // assert
      expect(result.type).to.equal('MISSING_ARGUMENTS');
      expect(result.message).to.equal('"quantity" is required');
    });
    it('retorna um erro ao passar uma quantity menor ou igual a 0', async function () {
      // arrange: Novamente não precisamos de um arranjo pois esse é um fluxo que não chama o model!
      // act
      const result = await salesService.createSale(saleWithInvalidQuantity);

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });
  });
  describe('cadastro de uma sale com valores válidos', function () {
    it('retorna a sale que foi inserida com sucesso', async function () {
      // arrange
      sinon.stub(salesModel, 'createNewSale').resolves(3);
      sinon.stub(salesModel, 'insertSaleProducts').resolves();
      // act
      const result = await salesService.createSale(validSale);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(validSaleResult);
    });
  });
  describe('listando todas as sales da sales_products', function () {
    it('retorna todas as sales', async function () {
      // arrange
      sinon.stub(salesModel, 'findAll').resolves(allSales);
      sinon.stub(salesModel, 'findById').resolves(dateMock);
      // act
      const result = await salesService.findAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(allSalesConverted);
    });
    it('retorna uma sale específica ao passar o SaleId', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(dateMock);
      // act
      const result = await salesService.findBySaleId(2);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(specificSale);
    })
  });
  afterEach(function () {
    sinon.restore();
  });
});