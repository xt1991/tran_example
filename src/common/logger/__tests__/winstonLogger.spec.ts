import DailyRotateFile from 'winston-daily-rotate-file';

import WinstonLogger from '../winstonLogger';
import { createNamespace, destroyNamespace } from 'cls-hooked';
import { ITracing, LevelEnum } from '../type';

jest.mock('winston-daily-rotate-file', () => {
  const consoleTransport = jest.requireActual('winston').transports.Console;
  return class MockTransport extends consoleTransport {};
});

describe('WinstonLogger', () => {
  let tracing: ITracing;
  const session = 'test-session';
  beforeAll(() => {
    createNamespace(session);
    tracing = {
      tracerSessionName: session,
      requestId: 'QWESRTYUIOP'
    };
  });
  afterAll(() => {
    destroyNamespace(session);
  });

  it('should have file transporter if having filename', () => {
    const logger = new WinstonLogger({
      fileAppender: true,
      tracing
    });
    expect(
      logger.logger.transports[logger.logger.transports.length - 1].constructor
    ).toBe(DailyRotateFile);
  });

  it('should call winston info on info', () => {
    const logger = new WinstonLogger({ tracing });
    const spyWinstonInfo = jest.spyOn(logger.logger, 'info');
    spyWinstonInfo.mockImplementation(() => logger.logger);
    logger.info('message', {
      meta: 'meta data'
    });
    expect(spyWinstonInfo).toBeCalledWith('message', {
      meta: 'meta data'
    });
  });

  it('should call winston error on error', () => {
    const logger = new WinstonLogger({ tracing });
    const spyWinstonError = jest.spyOn(logger.logger, 'error');
    spyWinstonError.mockImplementation(() => logger.logger);
    logger.error('message', {
      meta: 'meta data'
    });
    expect(spyWinstonError).toBeCalledWith('message', {
      meta: 'meta data'
    });
  });

  it('should call winston critical on critical', () => {
    const logger = new WinstonLogger({ tracing });
    const spyWinstonCritical = jest.spyOn(logger.logger, 'log');
    spyWinstonCritical.mockImplementation(() => logger.logger);
    logger.critical('message', {
      meta: 'meta data'
    });
    expect(spyWinstonCritical).toBeCalledWith(LevelEnum.critical, 'message', {
      meta: 'meta data'
    });
  });

  it('should call winston warn on warn', () => {
    const logger = new WinstonLogger({ tracing });
    const spyWinstonWarn = jest.spyOn(logger.logger, 'warn');
    spyWinstonWarn.mockImplementation(() => logger.logger);
    logger.warn('message', {
      meta: 'meta data'
    });
    expect(spyWinstonWarn).toBeCalledWith('message', {
      meta: 'meta data'
    });
  });

  it('onFinished should register callback on finish event', () => {
    const callback = jest.fn();
    const logger = new WinstonLogger({ tracing });
    logger.onFinished(callback);
    expect(logger.logger.listeners('finish')).toEqual([callback]);
  });

  it('should call winston debug on debug', () => {
    const logger = new WinstonLogger({ tracing });
    const spyWinstonError = jest.spyOn(logger.logger, 'debug');
    spyWinstonError.mockImplementation(() => logger.logger);
    logger.debug('message', {
      meta: 'meta data'
    });
    expect(spyWinstonError).toBeCalledWith('message', {
      meta: 'meta data'
    });
  });

  it('should call winston debug on debug with requestId empty when getNamespace do not have value', () => {
    const logger = new WinstonLogger({
      tracing: {
        tracerSessionName: 'name',
        requestId: 'res'
      }
    });
    const spyWinstonError = jest.spyOn(logger.logger, 'debug');
    spyWinstonError.mockImplementation(() => logger.logger);
    logger.debug('message', {
      meta: 'meta data',
      requestId: ''
    });
    expect(spyWinstonError).toBeCalledWith('message', {
      meta: 'meta data',
      requestId: ''
    });
  });
});

describe('should format the structure for non object types to group under meta', () => {
  const logger = new WinstonLogger({
    tracing: {
      tracerSessionName: 'name',
      requestId: ''
    }
  });
  const cases = [
    {
      input: new Error('error'),
      output: {
        meta: new Error('error'),
        requestId: ''
      }
    },
    {
      input: 'random string',
      output: {
        meta: 'random string',
        requestId: ''
      }
    },
    {
      input: [1, 2, 3, 4],
      output: {
        meta: [1, 2, 3, 4],
        requestId: ''
      }
    }
  ];
  const spyWinstonError = jest.spyOn(logger.logger, 'debug');

  it.each(cases)('given %p as arguments', testCases => {
    logger.debug('message', testCases.input);
    expect(spyWinstonError).toBeCalledWith('message', testCases.output);
  });
});
