import { ERROR_CODE, ErrorList } from './error.constant';
import { IError, IErrorDetail } from './error.interface';

export class AppError extends Error {
  public errorCode: ERROR_CODE;
  errors?: IErrorDetail[];
  constructor(errorCode: ERROR_CODE, errors?: IErrorDetail[]) {
    super(errorCode);
    this.errorCode = errorCode;
    this.name = AppError.name;
    this.errors = errors;
  }

  getErrors(): IError<ERROR_CODE> {
    const error = ErrorList[this.errorCode];
    return {
      errors: this.errors,
      statusCode: error.statusCode,
      message: error.message,
      code: error.code
    };
  }
}

export const createErrorDetail = (
  key: string,
  errorCode: ERROR_CODE
): IErrorDetail => {
  return {
    key,
    code: errorCode,
    message: ErrorList[errorCode].message
  };
};
