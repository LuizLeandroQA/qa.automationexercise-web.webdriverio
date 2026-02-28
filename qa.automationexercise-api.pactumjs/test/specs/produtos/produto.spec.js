// test/specs/produtos/produto.spec.js
const { spec } = require('pactum');
const { novoUsuario, novoProduto } = require('../../../src/utils/factory.js');
const { produtoCreateSuccessSchema } = require('../../../src/schemas/produto.schema.js');

describe('Produtos', () => {
    it('POST /produtos - Cadastro de produto + contrato', async () => {
    // Arrange
    const user = novoUsuario();

    await spec()
        .post('https://serverest.dev/usuarios')
        .withJson(user)
        .expectStatus(201);

    const loginRes = await spec()
        .post('https://serverest.dev/login')
        .withJson({ email: user.email, password: user.password })
        .expectStatus(200)
        .returns('body');

    const token = loginRes.authorization;
    const produto = novoProduto();

    // Act
    const s = spec()
        .post('https://serverest.dev/produtos')
        .withHeaders('Authorization', 'Bearer ${token}')
        .withJson(produto);

    // Assert
    await s.expectStatus(201).expectJsonSchema(produtoCreateSuccessSchema);
    });
});