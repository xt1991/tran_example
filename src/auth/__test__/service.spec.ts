import { AppError } from '../../common/error/AppError';
import userRepository from '../../users/repository';
import { authService } from '../service';
import { userData } from '../../users/__tests__/__mock__/mock';

// const bcrypt = require('bcryptjs');

jest.mock('../../users/repository');

describe('auth.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
    expect.hasAssertions();
  });

  describe('#register', () => {
    it('should call repo and create new data', async () => {
      userRepository.create = jest.fn().mockResolvedValueOnce(userData);
      const result = await authService.register(userData);

      expect(userRepository.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(userData);
    });

    it('should call repo and throw error', async () => {
      userRepository.create = jest
        .fn()
        .mockRejectedValueOnce(new Error('error'));
      const err = await authService.register(userData).catch(e => e);
      expect(err).toBeInstanceOf(AppError);
    });
  });

  describe('#login', () => {
    it('should call repo and return data', async () => {
      userRepository.getByEmail = jest.fn().mockResolvedValueOnce(userData);
      const result = await authService.login(userData.email, userData.pass);

      expect(userRepository.getByEmail).toHaveBeenCalledWith(userData.email);
      expect(result).toEqual(userData);
    });

    it('should call repo and return empty', async () => {
      userRepository.getByEmail = jest.fn().mockResolvedValueOnce(undefined);
      const err = await authService
        .login(userData.email, userData.pass)
        .catch(e => e);

      expect(userRepository.getByEmail).toHaveBeenCalledWith(userData.email);
      expect(err).toBeInstanceOf(AppError);
    });

    //
  });
});
