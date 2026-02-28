// src/utils/factory.js
function uniqueEmail() {
  return `qa_${Date.now()}_${Math.floor(Math.random() * 1000)}@test.com`;
}

function novoUsuario() {
    return {
    nome: `Usuário QA ${Date.now()}`,
    email: uniqueEmail(),
    password: '123456',
    administrador: 'true'
    };
}

function novoProduto() {
    return {
    nome: `Produto QA ${Date.now()}`,
    preco: 10,
    descricao: 'Produto criado via teste automatizado',
    quantidade: 1
    };
}

module.exports = { novoUsuario, novoProduto };