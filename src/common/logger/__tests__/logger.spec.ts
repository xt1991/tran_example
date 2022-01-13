import { createNamespace, destroyNamespace } from 'cls-hooked';

import { BaseLogWrapper, createLogger } from '..';
import WinstonLogger from '../winstonLogger';
import { ITracing } from '../type';

describe('index logger', () => {
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
  describe('createLogger', () => {
    it('should return an instance of winstonLogger', () => {
      const logger = createLogger({ tracing });
      expect(logger instanceof WinstonLogger).toBeTruthy();
    });
  });

  describe('BaseLogWrapper', () => {
    it('should define BaseLogWrapper', () => {
      expect(BaseLogWrapper).toBeDefined();
    });
  });
});
