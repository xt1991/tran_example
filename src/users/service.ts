import { AppError } from '../common/error/AppError';
import { ERROR_CODE } from '../common/errors';
// import logger from '../logger';
import { IUser } from './interface';
import { UserDocument } from './model';
import userRepository from './repository';

export class UserService {
  // public async create(data: IUser): Promise<UserDocument> {
  //   try {
  //     return await userRepository.create(data);
  //   } catch (error) {
  //     logger.error(JSON.stringify(error));
  //     throw new AppError(ERROR_CODE.INVALID_REQUEST, error as any);
  //   }
  // }

  public async get(): Promise<UserDocument[]> {
    return userRepository.get();
  }
  public async getDetail(id: string): Promise<UserDocument> {
    const data = await userRepository.getById(id);
    if (!data) {
      throw new AppError(ERROR_CODE.NOT_FOUND);
    }
    return data;
  }

  public async update(id: string, data: IUser): Promise<UserDocument> {
    const updated = await userRepository.findOneAndUpdate(id, data);
    if (!updated) {
      throw new AppError(ERROR_CODE.HAVE_NO_UPDATED);
    }
    return updated;
  }
}

export const userService = new UserService();
