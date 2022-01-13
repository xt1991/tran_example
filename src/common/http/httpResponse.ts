import { StatusCode } from './http.enums';
import { IHttpResponseBody } from './http.interface';
import { IError } from '../error/error.interface';

export class ResponseBase<DataType, ErrorEnumType> {
  private body: IHttpResponseBody<DataType, ErrorEnumType> = {};
  private statusCode: StatusCode;
  constructor() {
    this.body.data = undefined;
    this.body.error = undefined;
    this.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
  }
  success(data: DataType, statusCode: StatusCode = StatusCode.OK): void {
    this.body.data = data;
    this.statusCode = statusCode;
  }

  fail(
    error: IError<ErrorEnumType>,
    statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR
  ): void {
    this.body.error = error;
    this.statusCode = statusCode;
  }

  getData(): DataType | undefined {
    return this.body.data;
  }

  getBody(): IHttpResponseBody<DataType, ErrorEnumType> {
    return this.body;
  }

  getError(): IError<ErrorEnumType> | undefined {
    return this.body.error;
  }

  getStatusCode(): StatusCode {
    return this.statusCode;
  }
}
