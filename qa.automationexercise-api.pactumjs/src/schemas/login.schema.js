const Joi = require('joi');

const loginSuccessSchema = Joi.object({
    message: Joi.string().required(),
    authorization: Joi.string().required()
});

module.exports = { loginSuccessSchema };