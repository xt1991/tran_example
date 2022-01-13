import { Writable } from 'stream';
import { Logger } from './type';

export const createEventLogStream = (logger: Logger) =>
  new Writable({
    objectMode: true,
    write: (data, _, done) => {
      if (data && data.event) {
        const { event } = data;
        switch (event) {
          case 'error':
            logger.error('Service error', data);
            break;
          case 'debug':
            logger.debug('Service debug', data);
            break;
          case 'critical':
            logger.critical('Service critical', data);
            break;
          default:
            logger.info(`Service ${event}`, data);
        }
      } else {
        logger.warn(`Not an event`, data);
      }
      done();
    }
  });
