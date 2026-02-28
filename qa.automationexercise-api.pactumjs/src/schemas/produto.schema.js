const Joi = require('joi');

const produtoCreateSuccessSchema = Joi.object({
    message: Joi.string().required(),
    _id: Joi.string().required()
}).required();

module.exports = { produtoCreateSuccessSchema };