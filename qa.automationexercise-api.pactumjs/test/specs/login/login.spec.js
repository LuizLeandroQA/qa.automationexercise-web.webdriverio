// test/specs/login/login.spec.js
const { spec } = require('pactum');
const { novoUsuario } = require('../../../src/utils/factory.js');
const { loginSuccessSchema } = require('../../../src/schemas/login.schema.js');

describe('Login - POST /login', () => {
    it('Cadastro com sucesso (pré-condição) + login com sucesso', async () => {
    const user = novoUsuario();

    await spec()
    .post('https://serverest.dev/usuarios')
    .withJson(user)
    .expectStatus(201);

    const s = spec()
    .post('https://serverest.dev/login')
    .withJson({ email: user.email, password: user.password });

    await s.expectStatus(200).expectJsonSchema(loginSuccessSchema);
});
});