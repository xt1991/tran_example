import { RequestConfig, BasicAuth, Response, HttpError } from './http.model';
import { AxiosHttpClient, HttpClient } from './http.client';
import { ResponseBase } from './httpResponse';
import { IError } from '../error';
import { ERROR_CODE } from '../error/error.constant';

export const createHttpClient = (config: RequestConfig): HttpClient => {
  return new AxiosHttpClient(config);
};

export { RequestConfig, Response, BasicAuth, HttpClient, HttpError };
export interface IHttpResponseBody<DataType, ErrorType> {
  data?: DataType;
  error?: IError<ErrorType>;
}
export class HttpResponse<T> extends ResponseBase<T, ERROR_CODE> {
  constructor() {
    super();
  }
}
const http = {
  ResponseBase,
  HttpResponse
};

export * from './http.enums';
export * from './http.interface';
export default http;
