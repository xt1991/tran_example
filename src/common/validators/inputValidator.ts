const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export enum PositionErrorInput {
  HEADERS = 'HEADERS',
  PARAMS = 'PARAMS',
  PAYLOAD = 'PAYLOAD'
}

export const paramIdValidator = Joi.object({
  id: Joi.objectId()
    .required()
    .example('5f0fe465d994dc16c3c78bac')
});

export const InvalidInputResponse = (positionError: PositionErrorInput) =>
  Joi.object({
    statusCode: 400,
    error: 'Bad Request',
    message: `Invalid request ${positionError.toLowerCase()} input`
  });
