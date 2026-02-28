const Joi = require('joi');

const usuarioCreateSuccessSchema = Joi.object({
    message: Joi.string().required(),
    _id: Joi.string().required()
}).required();

module.exports = { usuarioCreateSuccessSchema };