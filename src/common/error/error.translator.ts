/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import logger from '../logger/loggerInstance';
import { AppError, createErrorDetail } from './error';
import { ERROR_CODE, MONGO_ERROR, MONGO_ERROR_CODE } from './error.constant';
import { IErrorDetail } from './error.interface';

const errorTranslator = (error: any): any => {
  // handle MongoDB error
  if (
    error.name === MONGO_ERROR &&
    error.code === MONGO_ERROR_CODE.DUPLICATED_KEY
  ) {
    logger.error('Mongo error', error);

    const errorList: IErrorDetail[] = [];
    Object.keys((error as any).keyValue).forEach(key => {
      errorList.push(createErrorDetail(key, ERROR_CODE.DUPLICATED_KEY));
    });
    throw new AppError(ERROR_CODE.INVALID_REQUEST, errorList);
  }
  throw error;
};

export { errorTranslator };
