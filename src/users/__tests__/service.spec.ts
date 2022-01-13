import { AppError } from '../../common/error/AppError';
import userRepository from '../repository';
import { userService } from '../service';
import { userData } from './__mock__/mock';

jest.mock('../repository');

describe('user.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
    expect.hasAssertions();
  });

  describe('#create', () => {
    it('should call repo and create new data', async () => {
      userRepository.create = jest.fn().mockResolvedValueOnce(userData);
      const result = await userService.create(userData);

      expect(userRepository.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(userData);
    });

    it('should call repo and throw error', async () => {
      userRepository.create = jest
        .fn()
        .mockRejectedValueOnce(new Error('error'));
      const err = await userService.create(userData).catch(e => e);
      expect(err).toBeInstanceOf(AppError);
    });
  });

  describe('#getDetail', () => {
    it('should call repo and return data', async () => {
      userRepository.get = jest.fn().mockResolvedValueOnce([userData]);
      const result = await userService.get();

      expect(result).toEqual([userData]);
    });
  });

  describe('#getDetail', () => {
    it('should call repo and return data', async () => {
      userRepository.getById = jest.fn().mockResolvedValueOnce(userData);
      const result = await userService.getDetail('1');

      expect(userRepository.getById).toHaveBeenCalledWith('1');
      expect(result).toEqual(userData);
    });

    it('should call repo and return empty', async () => {
      userRepository.getById = jest.fn().mockResolvedValueOnce(undefined);
      const err = await userService.getDetail('1').catch(e => e);

      expect(userRepository.getById).toHaveBeenCalledWith('1');
      expect(err).toBeInstanceOf(AppError);
    });
  });

  describe('#update', () => {
    it('should call repo and update data', async () => {
      userRepository.findOneAndUpdate = jest
        .fn()
        .mockResolvedValueOnce(userData);
      const result = await userService.update('1', userData);

      expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith(
        '1',
        userData
      );
      expect(result).toEqual(userData);
    });

    it('should call repo and throw error', async () => {
      userRepository.findOneAndUpdate = jest.fn().mockResolvedValue(undefined);
      const err = await userService.update('1', userData).catch(e => e);

      expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith(
        '1',
        userData
      );
      expect(err).toBeInstanceOf(AppError);
    });
  });
});
