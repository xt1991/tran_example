import { ResponseType } from 'axios';

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export interface BasicAuth {
  username: string;
  password: string;
}

export interface RequestConfig {
  url?: string;
  method?: Method;
  baseURL?: string;
  headers?: any;
  params?: any;
  data?: any;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  auth?: BasicAuth;
  paramsSerializer?: (params: any) => string;
}

export interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: RequestConfig;
  request?: any;
}

export class HttpError extends Error {
  public status: number;
  public error: any;
  constructor(status: number, error: any) {
    super();
    this.status = status;
    this.error = error;
    // hapi Boom needs message field
    this.message = 'HttpError';
  }
}

export interface ResponsePromise<T = any> extends Promise<Response<T>> {}
