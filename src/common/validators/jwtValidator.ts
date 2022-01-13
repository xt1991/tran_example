import { HttpHeaders } from '../constants';
const Joi = require('@hapi/joi');

export const jwtValidator = Joi.object({
  [HttpHeaders.AUTH]: Joi.string()
    .trim()
    .required()
}).options({ allowUnknown: true });

export const jwtValidatorResponse = Joi.object({
  accessToken: Joi.string()
    .trim()
    .required(),
  idToken: Joi.string().trim(),
  refreshToken: Joi.string().trim()
});
