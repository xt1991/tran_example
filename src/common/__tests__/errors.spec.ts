import { ERROR_CODE, ErrorList, errorTranslator } from '../errors';
import { AppError } from '../error/AppError';

describe('common - errors', () => {
  describe('ErrorList', () => {
    it('should have all description of ERROR_CODE', () => {
      Object.keys(ERROR_CODE).forEach(key => {
        const error = ErrorList[key];
        expect(error).toBeDefined();
        expect(error.message).toBeDefined();
        expect(error.statusCode).toBeDefined();
      });
    });
  });
});

describe('errorTranslator', () => {
  it('should throw mongo error other than duplicate key', async () => {
    // When
    try {
      errorTranslator(new AppError(ERROR_CODE.KAFKA_UNEXPECTED_ERROR));
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.errorCode).toEqual(ERROR_CODE.KAFKA_UNEXPECTED_ERROR);
    }
  });
});
