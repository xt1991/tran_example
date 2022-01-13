import { createLogger } from './index';

const Tracing = {
  TRACER_SESSION: 'TRACER_SESSION',
  TRANSACTION_ID: 'x-request-id'
};

const logger = createLogger({
  defaultMeta: {
    service: 'common'
  },
  tracing: {
    tracerSessionName: Tracing.TRACER_SESSION,
    requestId: Tracing.TRANSACTION_ID
  }
});
export default logger;
