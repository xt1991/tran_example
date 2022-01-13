import { ErrorList, ERROR_CODE } from '../error.constant';
import { AppError } from '../error';
import { errorTranslator } from '../error.translator';

describe('common - errors', () => {
  describe('ErrorList', () => {
    it('should have all description of ERROR_CODE', () => {
      Object.values(ERROR_CODE).forEach(key => {
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
