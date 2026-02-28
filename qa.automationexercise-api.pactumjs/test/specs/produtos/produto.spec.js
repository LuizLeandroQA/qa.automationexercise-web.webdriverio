// test/specs/produtos/produto.spec.js
const { spec } = require('pactum');
const { novoUsuario, novoProduto } = require('../../../src/utils/factory.js');
const { produtoCreateSuccessSchema } = require('../../../src/schemas/produto.schema.js');
const { validateJoi } = require('../../../src/utils/validator.js');

describe('Produtos', () => {
    it('POST /produtos - Cadastro de produto + contrato', async () => {
    // Arrange
    const user = novoUsuario();

    // pré-condição: cria usuário
    await spec()
    .post('https://serverest.dev/usuarios')
    .withJson(user)
    .expectStatus(201);

    // login (PEGANDO RESPOSTA COMPLETA)
    const loginRes = await spec()
    .post('https://serverest.dev/login')
    .withJson({ email: user.email, password: user.password })
    .expectStatus(200)
    .toss();

    const token = loginRes?.body?.authorization;

    // segurança extra (pra você enxergar o que veio)
    if (!token) {
    throw new Error(
        `Login não retornou authorization. Body: ${JSON.stringify(loginRes?.body)}`
    );
    }

    const produto = novoProduto();

    // Act (cria produto)
    const createRes = await spec()
    .post('https://serverest.dev/produtos')
      // O token já vem "Bearer ...." do Serverest, então manda ELE direto
    .withHeaders({ Authorization: token })
    .withJson(produto)
    .expectStatus(201)
    .toss();

    // Assert (contrato com Joi)
    validateJoi(produtoCreateSuccessSchema, createRes.body);
    });
});