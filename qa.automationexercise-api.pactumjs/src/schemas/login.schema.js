const Joi = require('joi');

const loginSuccessSchema = Joi.object({
    authorization: Joi.string().min(10).required(),
    message: Joi.string().required()
}).required();

module.exports = { loginSuccessSchema };