const Joi = require('@hapi/joi');

export const MongooseBase = {
  _id: Joi.string().required(),
  createdAt: Joi.date()
    .required()
    .example('2020-10-10T00:00:00.000Z'),
  updatedAt: Joi.date()
    .required()
    .example('2020-10-15T00:00:00.000Z')
};
