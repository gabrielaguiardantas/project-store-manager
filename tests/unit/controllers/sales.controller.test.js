const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { saleMock, newSaleMock } = require('./mocks/sales.controller.mock');



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
});