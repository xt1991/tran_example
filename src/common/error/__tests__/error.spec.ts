import { AppError } from '../error';
import { ERROR_CODE } from '../error.constant';

describe('Error', () => {
  it('should implement AppError', () => {
    const appError = new AppError(ERROR_CODE.KAFKA_UNEXPECTED_ERROR, [
      {
        message: 'string',
        key: 'string',
        code: 'string'
      }
    ]);
    expect(appError.getErrors).toBeDefined();
  });
});
