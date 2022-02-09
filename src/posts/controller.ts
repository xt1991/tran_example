import express from 'express';
import { postService } from './service';
const postController = express.Router();

postController.post(
  '/',
  async (req: express.Request, res: express.Response) => {
    try {
      const result = await postService.create(req.body);
      return res.json(result);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
);

postController.get(
  '/',
  async (_req: express.Request, res: express.Response) => {
    try {
      const result = await postService.get();
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

postController.get(
  '/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const result = await postService.getDetail(req.params.id);
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

postController.patch(
  '/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const result = await postService.update(req.params.id, req.body);
      return res.json(result);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
);

export default postController;
