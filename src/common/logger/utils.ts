import { IGNORE_LOG_PATH } from './contants';
import { TransformFunction, TransformableInfo } from 'logform';
import { LevelEnum } from './type';

const ignoreEndpoint: TransformFunction = (
  info: TransformableInfo
): TransformableInfo | boolean => {
  if (
    info &&
    info.path &&
    (IGNORE_LOG_PATH[info.path] || info.path.endsWith('/ping'))
  ) {
    return false;
  }
  return info;
};

const getDefaultLevel = (): LevelEnum => {
  const logLevel = process.env.LOG_LEVEL;
  if (logLevel && logLevel in LevelEnum) {
    return logLevel as LevelEnum;
  }
  switch (process.env.NODE_ENV) {
    case 'preprod':
    case 'prepro':
    case 'pt':
      return LevelEnum.error;
    case 'staging':
    case 'uat':
    case 'dev':
    case 'qc':
      return LevelEnum.info;
    case 'local':
      return LevelEnum.debug;

    default:
      return LevelEnum.info;
  }
};

export { ignoreEndpoint, getDefaultLevel };
