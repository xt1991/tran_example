import { AppError } from '../common/error/AppError';
import { ERROR_CODE } from '../common/errors';
import logger from '../logger';
import { IPost } from './interface';
import { PostDocument } from './model';
import postRepository from './repository';

export class PostService {
  public async create(data: IPost): Promise<PostDocument> {
    try {
      return await postRepository.create(data);
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw new AppError(ERROR_CODE.INVALID_REQUEST, error as any);
    }
  }

  public async get(): Promise<PostDocument[]> {
    return postRepository.get();
  }

  public async getDetail(id: string): Promise<PostDocument> {
    const data = await postRepository.getById(id);
    if (!data) {
      throw new AppError(ERROR_CODE.NOT_FOUND);
    }
    return data;
  }

  public async update(id: string, data: IPost): Promise<PostDocument> {
    const updated = await postRepository.findOneAndUpdate(id, data);
    if (!updated) {
      throw new AppError(ERROR_CODE.HAVE_NO_UPDATED);
    }
    return updated;
  }
}

export const postService = new PostService();
