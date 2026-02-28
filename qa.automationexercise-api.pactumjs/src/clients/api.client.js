// src/clients/api.client.js
const pactum = require('pactum');
const { baseUrl, timeout } = require('../config/env');

/**
 * Configurações globais do Pactum
 * - Define baseUrl da API
 * - Define timeout padrão
 */
pactum.request.setBaseUrl(baseUrl);
pactum.request.setDefaultTimeout(timeout);

module.exports = { pactum };