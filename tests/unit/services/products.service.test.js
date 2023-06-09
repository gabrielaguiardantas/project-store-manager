const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProducts, invalidName } = require('./mocks/products.service.mock');

describe('Verificando service products', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModel, 'findAll').resolves(allProducts);
      
      // act
      const result = await productsService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });
  describe('busca de um produto pelo ID', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productsService.findById('a');
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
     
      // act
      const result = await productsService.findById(1);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
      
      // act
      const result = await productsService.findById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });
  describe('busca de um produto pelo termo pesquisado', function () {
    it('retorna listagem de produtos que o name inclui o termo pesquisado', async function () {
      // arrange
      sinon.stub(productsModel, 'findByTerm').resolves(allProducts);
      
      // act
      const result = await productsService.findByTerm('Ma');

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    })
  })
  describe('cadastro de um produto com valores inválidos', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      // arrange: Novamente não precisamos de um arranjo pois esse é um fluxo que não chama o model!

      // act
      const result = await productsService.createProduct(invalidName);

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });
  describe('atualização de um produto', function () {
    it('retorna o produto atualizado', async function () {
      // arrange
      sinon.stub(productsModel, 'update').resolves();
      sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Martelo do Batman' });
      // act
      const result = await productsService.updateProduct(1, "Martelo do Batman");
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 1, name: 'Martelo do Batman' });
    });
  });
  describe('deleção de um produto', function () {
    it('não tem retorno ao receber que uma linha foi afetada (caso de sucesso)', async function () {
      // arrange
      sinon.stub(productsModel, 'deleteProduct').resolves(1);
      // act
      const result = await productsService.deleteProduct(2);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).equal(null);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
})