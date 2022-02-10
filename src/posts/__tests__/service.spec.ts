import { AppError } from '../../common/error/AppError';
import userRepository from '../repository';
import { postService } from '../service';
import { postData } from './__mock__/mock';

jest.mock('../repository');

describe('user.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
    expect.hasAssertions();
  });

  describe('#create', () => {
    it('should call repo and create new data', async () => {
      userRepository.create = jest.fn().mockResolvedValueOnce(postData);
      const result = await postService.create(postData);

      expect(userRepository.create).toHaveBeenCalledWith(postData);
      expect(result).toEqual(postData);
    });

    it('should call repo and throw error', async () => {
      userRepository.create = jest
        .fn()
        .mockRejectedValueOnce(new Error('error'));
      const err = await postService.create(postData).catch(e => e);
      expect(err).toBeInstanceOf(AppError);
    });
  });

  describe('#getDetail', () => {
    it('should call repo and return data', async () => {
      userRepository.get = jest.fn().mockResolvedValueOnce([postData]);
      const result = await postService.get();

      expect(result).toEqual([postData]);
    });
  });

  describe('#getDetail', () => {
    it('should call repo and return data', async () => {
      userRepository.getById = jest.fn().mockResolvedValueOnce(postData);
      const result = await postService.getDetail('1');

      expect(userRepository.getById).toHaveBeenCalledWith('1');
      expect(result).toEqual(postData);
    });

    it('should call repo and return empty', async () => {
      userRepository.getById = jest.fn().mockResolvedValueOnce(undefined);
      const err = await postService.getDetail('1').catch(e => e);

      expect(userRepository.getById).toHaveBeenCalledWith('1');
      expect(err).toBeInstanceOf(AppError);
    });
  });

  describe('#update', () => {
    it('should call repo and update data', async () => {
      userRepository.findOneAndUpdate = jest
        .fn()
        .mockResolvedValueOnce(postData);
      const result = await postService.update('1', postData);

      expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith(
        '1',
        postData
      );
      expect(result).toEqual(postData);
    });

    it('should call repo and throw error', async () => {
      userRepository.findOneAndUpdate = jest.fn().mockResolvedValue(undefined);
      const err = await postService.update('1', postData).catch(e => e);

      expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith(
        '1',
        postData
      );
      expect(err).toBeInstanceOf(AppError);
    });
  });
});
