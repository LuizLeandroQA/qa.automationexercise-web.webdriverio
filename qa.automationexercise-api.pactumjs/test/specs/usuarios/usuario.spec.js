// test/specs/usuarios/usuario.spec.js
const { spec } = require('pactum');
const { usuarioCreateSuccessSchema } = require('../../../src/schemas/usuario.schema.js');
const { validateJoi } = require('../../../src/utils/validator');

describe('Usuários', () => {
    it('POST /usuarios - Criação do usuário + contrato', async () => {
    // Arrange
    const payload = {
        nome: `Usuario QA ${Date.now()}`,
        email: `qa${Date.now()}@teste.com`,
        password: '123456',
        administrador: 'true'
    };

    // Act
    const response = await spec()
        .post('https://serverest.dev/usuarios')
        .withJson(payload)
        .expectStatus(201)
        .toss();

    // Assert contrato
    const { error } = usuarioCreateSuccessSchema.validate(response.json, { abortEarly: false });
    if (error) throw error;
    });

    it('DELETE /usuarios/{_id} - Exclusão do usuário por Id', async () => {
    // Arrange: cria usuário
    const created = await spec()
        .post('https://serverest.dev/usuarios')
        .withJson({
        nome: `Usuario QA ${Date.now()}`,
        email: `qa${Date.now()}@teste.com`,
        password: '123456',
        administrador: 'true'
        })
        .expectStatus(201)
        .toss();

    const userId = created.json._id; // ✅ sem created.json()

    // Act
    await spec()
        .delete(`https://serverest.dev/usuarios/${userId}`)
        .expectStatus(200);
    });
});