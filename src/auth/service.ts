import { AppError } from '../common/error/AppError';
import { ERROR_CODE } from '../common/errors';
import logger from '../logger';
import { IUser } from '../users/interface';
import { UserDocument } from '../users/model';
import userRepository from '../users/repository';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

// const jwt = require("jsonwebtoken");

export class AuthService {
  public async register(data: IUser): Promise<UserDocument> {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      data.pass = bcrypt.hashSync(data.pass, salt);

      return await userRepository.create(data);
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw new AppError(ERROR_CODE.INVALID_REQUEST, error as any);
    }
  }

  public async login(email: string, pass: string): Promise<UserDocument> {
    const userLogin = await userRepository.getByEmail(email);
    if (!userLogin) {
      throw new AppError(ERROR_CODE.NOT_FOUND);
    }

    const result = bcrypt.compareSync(pass, userLogin.pass);
    if (!result) {
      throw new AppError(ERROR_CODE.NOT_FOUND);
    }

    return userLogin;
  }
}

export const authService = new AuthService();
