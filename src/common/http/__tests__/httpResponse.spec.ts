import { StatusCode } from '../http.enums';

import { HttpResponse, ERROR_CODE } from '../__mocks__/httpResponse';
import { ResponseBase } from '../httpResponse';
import { IError } from '../../error';
describe('HttpResponse', () => {
  const data = { name: 'test' };
  describe('creation of base response', () => {
    it('should create a new HttpResponse object, with default response', () => {
      const httpResponse = new HttpResponse();
      expect(httpResponse.getData()).toEqual(undefined);
      expect(httpResponse.getBody().error).toEqual(undefined);
      expect(httpResponse.getError()).toEqual(undefined);
      expect(httpResponse.getStatusCode()).toEqual(
        StatusCode.INTERNAL_SERVER_ERROR
      );
    });
  });
  describe('set success information', () => {
    it('should set data and OK statuscode when data and OK is passed', () => {
      const httpResponse = new HttpResponse();
      httpResponse.success(data, StatusCode.OK);
      expect(httpResponse.getData()).toEqual(data);
      expect(httpResponse.getStatusCode()).toEqual(StatusCode.OK);
      expect(httpResponse.getError()).toEqual(undefined);
    });
    it('should return OK if no statusCode is passed to success', () => {
      const httpReponse = new HttpResponse();
      httpReponse.success(data);
      expect(httpReponse.getData()).toEqual(data);
      expect(httpReponse.getStatusCode()).toEqual(StatusCode.OK);
    });
    it('should return the data and the CreateCode when CreatedCode is passed', () => {
      const httpResponse = new HttpResponse();
      httpResponse.success(data, StatusCode.CREATED);
      expect(httpResponse.getStatusCode()).toEqual(StatusCode.CREATED);
    });
  });
  describe('set error information', () => {
    it('should set the statusCode from the error object passed', () => {
      const err: IError<ERROR_CODE> = {
        code: ERROR_CODE.CODE,
        message: 'Some message',
        statusCode: StatusCode.SERVICE_UNAVAILABLE
      };
      const httpResponse = new ResponseBase<any, ERROR_CODE>();
      httpResponse.fail(err, StatusCode.SERVICE_UNAVAILABLE);

      expect(httpResponse.getError()).toEqual(err);
      expect(httpResponse.getStatusCode()).toEqual(
        StatusCode.SERVICE_UNAVAILABLE
      );
      expect(httpResponse.getData()).toEqual(undefined);

      err.errors = [
        {
          message: 'details',
          key: 'key',
          code: 'code'
        }
      ];
      httpResponse.fail(err, StatusCode.SERVICE_UNAVAILABLE);

      expect(httpResponse.getError()).toEqual(err);
    });

    it('should set 500 when no statusCode is passed', () => {
      const err: IError<ERROR_CODE> = {
        code: ERROR_CODE.CODE,
        message: 'Some message',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR
      };
      const httpResponse = new ResponseBase<any, ERROR_CODE>();
      httpResponse.fail(err);
      expect(httpResponse.getError()).toEqual(err);
      expect(httpResponse.getStatusCode()).toEqual(
        StatusCode.INTERNAL_SERVER_ERROR
      );
    });
  });
  describe('create a wrapper with error enum passed automaticall', () => {
    const httpResponse = new HttpResponse<any>();
    const err: IError<ERROR_CODE> = {
      code: ERROR_CODE.CODE,
      message: 'Some message',
      statusCode: StatusCode.SERVICE_UNAVAILABLE
    };
    httpResponse.fail(err, StatusCode.SERVICE_UNAVAILABLE);
    expect(httpResponse.getStatusCode()).toEqual(
      StatusCode.SERVICE_UNAVAILABLE
    );
  });
});
