/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createHttpClient, HttpClient, RequestConfig } from '../index';

describe('Axios Wrapper', () => {
  const httpConfig: RequestConfig = {
    url: 'test url',
    data: 'test data'
  };

  let underTest: HttpClient;
  const mockInstance = {
    request<T = any, _R = AxiosResponse<T>>(_config: AxiosRequestConfig) {}
  } as AxiosInstance;
  let mockedUseRequestInterceptor: any;
  const defaultTimeout = 60000;

  beforeEach(() => {
    const spyCreate = jest.spyOn(axios, 'create');
    mockedUseRequestInterceptor = jest.fn();
    (mockInstance as AxiosInstance).interceptors = {
      request: {
        use: mockedUseRequestInterceptor
      } as any
    } as any;
    spyCreate.mockReturnValue(mockInstance);
    underTest = createHttpClient(httpConfig);
  });

  afterEach(() => {
    expect.hasAssertions();
    jest.clearAllMocks();
  });
  it('should call request with GET method on get', () => {
    const spyHttpRequest = jest.spyOn(mockInstance, 'request');
    underTest.get('get url', {
      params: {
        id: 1
      }
    });
    expect(spyHttpRequest).toBeCalledWith({
      url: 'get url',
      method: 'GET',
      data: 'test data',
      timeout: defaultTimeout,
      headers: {},
      params: {
        id: 1
      }
    });
  });

  it('should call request with DELETE method on delete', () => {
    const spyHttpRequest = jest.spyOn(mockInstance, 'request');
    underTest.delete('delete url');
    expect(spyHttpRequest).toBeCalledWith({
      url: 'delete url',
      method: 'DELETE',
      timeout: defaultTimeout,
      headers: {},
      data: 'test data'
    });
  });

  it('should call request with POST method on post', () => {
    const spyHttpRequest = jest.spyOn(mockInstance, 'request');
    underTest.post('post url', 'post data');
    expect(spyHttpRequest).toBeCalledWith({
      url: 'post url',
      timeout: defaultTimeout,
      headers: {},
      method: 'POST',
      data: 'post data'
    });
  });

  it('should call request with PUT method on put', () => {
    const spyHttpRequest = jest.spyOn(mockInstance, 'request');
    underTest.put('put url', 'put data');
    expect(spyHttpRequest).toBeCalledWith({
      url: 'put url',
      timeout: defaultTimeout,
      headers: {},
      method: 'PUT',
      data: 'put data'
    });
  });

  it('should call request with patch method', () => {
    const spyHttpRequest = jest.spyOn(mockInstance, 'request');
    underTest.patch('some/url', 'someData');
    expect(spyHttpRequest).toBeCalledWith({
      url: 'some/url',
      timeout: defaultTimeout,
      headers: {},
      method: 'PATCH',
      data: 'someData'
    });
  });

  it('should throw HttpError', async () => {
    const spyHttpRequest = jest.spyOn(mockInstance, 'request');
    const expectedError = {
      response: {
        status: 400,
        error: {
          message: 'The Customer has been registered',
          code: 'CUSTOMER_HAS_BEEN_REGISTERED'
        }
      }
    };
    spyHttpRequest.mockRejectedValue(expectedError);
    const error = await underTest.get('test').catch(e => e);
    expect(error).toEqual({
      response: {
        error: {
          code: 'CUSTOMER_HAS_BEEN_REGISTERED',
          message: 'The Customer has been registered'
        },
        status: 400
      }
    });
  });

  it('should throw HttpError on timeout', async () => {
    const spyHttpRequest = jest.spyOn(mockInstance, 'request');
    const expectedError = {
      code: 'ECONNABORTED',
      message: 'timeout of 500ms exceeded'
    };
    spyHttpRequest.mockRejectedValue(expectedError);
    const error = await underTest.get('test').catch(e => e);
    expect(error).toEqual(expectedError);
  });

  it('should allow to set request interceptor', () => {
    const fn = jest.fn();
    underTest.setRequestInterceptor(fn);

    expect(mockedUseRequestInterceptor).toHaveBeenCalledWith(fn);
  });
});
