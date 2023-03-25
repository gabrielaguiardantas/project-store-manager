const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const itemSale = Joi.object({
  productId: idSchema.label('productId'),
  quantity: idSchema.label('quantity').messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

const addSaleSchema = Joi.array().min(1).items(itemSale);

module.exports = {
  idSchema,
  addProductSchema,
  addSaleSchema,
};