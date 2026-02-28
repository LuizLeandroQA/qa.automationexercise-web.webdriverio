const assert = require('assert');

function validateJoi(schema, payload, options = {}) {
    const { error } = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
    ...options
    });

    if (error) {
    assert.fail(
    `Contrato inválido (Joi):\n${error.details
        .map((d) => d.message)
        .join('\n')}`
    );
    }
}

module.exports = { validateJoi };