import { name } from '../package.json';
import { Tracing } from './common/constants';
import { BaseLogWrapper, createLogger } from './common/logger';

const logger = createLogger({
  defaultMeta: {
    service: name
  },
  tracing: {
    tracerSessionName: Tracing.TRACER_SESSION,
    requestId: Tracing.TRANSACTION_ID
  }
});

export const wrapLogs = new BaseLogWrapper(logger).getWrapper();
export default logger;
