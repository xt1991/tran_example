import express from 'express';
import { userService } from './service';
// const Joi = require('joi');

const userController = express.Router();

userController.get(
  '/',
  async (_req: express.Request, res: express.Response) => {
    try {
      const result = await userService.get();
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

userController.get(
  '/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const result = await userService.getDetail(req.params.id);
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

// userController.post(
//   '/',
//   async (req: express.Request, res: express.Response) => {
//     const schema = Joi.object({
//       fullName: Joi.string()
//         .min(3)
//         .max(30)
//         .required(),
//       email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//         .required()
//     }).with('fullName', 'email');

//     try {
//       await schema.validateAsync(req.body);
//       const result = await userService.create(req.body);
//       return res.json(result);
//     } catch (e) {
//       return res.status(500).json(e);
//     }
//   }
// );

userController.patch(
  '/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const result = await userService.update(req.params.id, req.body);
      return res.json(result);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
);

export default userController;
