// src/config/env.js
module.exports = {
    baseUrl: process.env.BASE_URL || 'https://serverest.dev',
    timeout: Number(process.env.TIMEOUT || 10000),
};