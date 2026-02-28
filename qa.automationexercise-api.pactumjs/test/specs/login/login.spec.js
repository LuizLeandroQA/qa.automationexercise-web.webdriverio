// test/specs/login/login.spec.js
const { spec } = require('pactum');
const { novoUsuario } = require('../../../src/utils/factory');
const { loginSuccessSchema } = require('../../../src/schemas/login.schema');
const { validateJoi } = require('../../../src/utils/validator');

describe('Login - POST /login', () => {
    it('Cadastro com sucesso (pré-condição) + login com sucesso', async () => {
    // Arrange
    const user = novoUsuario();

    await spec()
    .post('https://serverest.dev/usuarios')
    .withJson(user)
    .expectStatus(201);

    // Act
    const body = await spec()
    .post('https://serverest.dev/login')
    .withJson({ email: user.email, password: user.password })
    .expectStatus(200)
    .returns('body');

    // Assert (Contrato Joi)
    validateJoi(loginSuccessSchema, body);
    });
});