import { StatusCode } from '../http/http.enums';

export interface IErrorDetail {
  message: string;
  key: string;
  code: string;
}

export interface IError<ErrorEnumType> {
  code: ErrorEnumType | number;
  message: string;
  errors?: IErrorDetail[];
  statusCode?: StatusCode;
}

export interface IErrorListDetail {
  message: string;
  statusCode: StatusCode;
}

export interface IErrorList {
  [key: string]: IErrorListDetail;
}
