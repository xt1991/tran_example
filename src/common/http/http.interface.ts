import { IError } from '../error';
export interface IHttpResponseBody<DataType, ErrorType> {
  data?: DataType;
  error?: IError<ErrorType>;
}
