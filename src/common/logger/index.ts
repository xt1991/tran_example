import WinstonLogger from './winstonLogger';
import { InitOptions, Logger, LevelEnum } from './type';
import { createEventLogStream } from './eventStream';
import BaseLogWrapper from './baseLoggerWrapper';
// expose classes
export { createEventLogStream };

// expose methods
export const createLogger = (options: InitOptions): Logger => {
  return new WinstonLogger(options);
};

// expose types
export * from './type';
export { InitOptions, Logger, LevelEnum, BaseLogWrapper };
