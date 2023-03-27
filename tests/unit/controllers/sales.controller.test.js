const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { saleMock, newSaleMock, allSales, specificSale } = require('./mocks/sales.controller.mock');



const { expect } = chai;
chai.use(sinonChai);

describe('Teste de unidade do salesController', function () {
  describe('Cadastrando uma nova sale', function () {
    it('ao enviar dados válidos deve salvar com sucesso!', async function () {
      // Arrange
      const res = {};
      // Aqui o mock do objeto req, atribui o objeto `productMock` ao atributo body
      const req = {
        body: saleMock,
      };

      /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      /* Definimos um dublê para `passengerService.createPassenger` para retornar o objeto
      de uma pessoa passageira com o id. */
      sinon
        .stub(salesService, 'createSale')
        .resolves({ type: null, message: newSaleMock });

      // Act
      await salesController.createSale(req, res);

      // Assert
      /* Fazemos a asserção para garantir que o status retornado vai ser 201
      e que o json é o objeto newPassengerMock. */
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleMock);
    });
  });
  describe('listando todas as sales da tabela sales_products', function () {
    it('deve retornar 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves({ type: null, message: allSales });

      // act
      await salesController.listSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });
  describe('buscando uma sale', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findBySaleId')
        .resolves({ type: null, message: specificSale });

      // Act
      await salesController.getSales(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(specificSale);
    });
    it('ao passar um id inválido deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'abc' }, // passamos aqui um id inválido para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido.
      sinon
        .stub(salesService, 'findBySaleId')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await salesController.getSales(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 422
      expect(res.status).to.have.been.calledWith(422);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido para esse cenário
      sinon
        .stub(salesService, 'findBySaleId')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      // Act
      await salesController.getSales(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});