import { createEventLogStream } from '../eventStream';
import { Logger } from '../type';

describe('createEventLogStream', () => {
  const logger: Logger = {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    critical: jest.fn(),
    onFinished: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log error on error event', () => {
    const stream = createEventLogStream(logger);
    const event = {
      event: 'error',
      data: 'data'
    };
    stream.write(event);
    stream.end();
    expect(logger.error).toBeCalledWith('Service error', event);
  });

  it('should log critical on critical event', () => {
    const stream = createEventLogStream(logger);
    const event = {
      event: 'critical',
      data: 'data'
    };
    stream.write(event);
    stream.end();
    expect(logger.critical).toBeCalledWith('Service critical', event);
  });

  it('should log info on not error event', () => {
    const stream = createEventLogStream(logger);
    const event = {
      event: 'info',
      data: 'data'
    };
    stream.write(event);
    stream.end();
    expect(logger.info).toBeCalledWith('Service info', event);
  });

  it('should log warn on not event shape', () => {
    const stream = createEventLogStream(logger);
    const event = {
      data: 'data'
    };
    stream.write(event);
    stream.end();
    expect(logger.warn).toBeCalledWith('Not an event', event);
  });

  it('should log debug when its not error event', () => {
    const stream = createEventLogStream(logger);
    const event = {
      event: 'debug',
      data: 'data'
    };
    stream.write(event);
    stream.end();
    expect(logger.debug).toBeCalledWith('Service debug', event);
  });
});
