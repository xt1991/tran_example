import express from 'express';
import { authService } from './service';
import jwt from '.././jwt';

const authController = express.Router();

const Joi = require('joi');

authController.post(
  '/register',
  async (req: express.Request, res: express.Response) => {
    const schema = Joi.object({
      fullName: Joi.string()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      pass: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required()
    }).with('fullName', 'email');

    try {
      await schema.validateAsync(req.body);
      const result = await authService.register(req.body);
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

authController.post(
  '/login',
  async (req: express.Request, res: express.Response) => {
    try {
      const userLogin = await authService.login(req.body.email, req.body.pass);
      const codeToken = jwt(userLogin.id);

      res.json({ userLogin, codeToken });
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

export default authController;
