import { StatusCode } from '../../http/http.enums';
import { displayErrorsDescription } from '../error.util';

describe('error util', () => {
  describe('display error list', () => {
    it('should return error table in markdown', () => {
      enum ErrorCode {
        ERR_1 = 'ERR_1',
        ERR_2 = 'ERR_2',
        ERR_3 = 'ERR_3'
      }

      const ErrorList = {
        [ErrorCode.ERR_1]: {
          statusCode: StatusCode.BAD_REQUEST,
          message: 'Invalid input'
        },
        [ErrorCode.ERR_2]: {
          statusCode: StatusCode.BAD_REQUEST,
          message: 'Code not found'
        },
        [ErrorCode.ERR_3]: {
          statusCode: StatusCode.NOT_FOUND,
          message: 'Object not found'
        }
      };

      expect(displayErrorsDescription(ErrorList)).toEqual(
        '| HTTP Code | Error Code | Message |\n' +
          '|---|---|---|\n' +
          '| **400** | ERR_1 | Invalid input |\n' +
          '| | ERR_2 | Code not found |\n' +
          '| | | |\n' +
          '| **404** | ERR_3 | Object not found |\n'
      );
    });
  });
});
