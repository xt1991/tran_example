import logger from '../logger';
import { AppError, createErrorDetail, ErrorDetails } from './error/AppError';
import { StatusCode } from './http/http.enums';

const MONGO_ERROR = 'MongoError';
enum MONGO_ERROR_CODE {
  DUPLICATED_KEY = 11000
}

enum ERROR_CODE {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DUPLICATED_KEY = 'DUPLICATED_KEY',
  FIELD_REQUIRED = 'FIELD_REQUIRED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  KAFKA_UNEXPECTED_ERROR = 'KAFKA_UNEXPECTED_ERROR',
  INVALID_FIELD = 'INVALID_FIELD',
  INVALID_STATE = 'INVALID_STATE',
  SERVICE_NOT_AVAILABLE_IN_ZONE = 'SERVICE_NOT_AVAILABLE_IN_ZONE',
  DELIVERY_NOT_FOUND = 'DELIVERY_NOT_FOUND',
  CITY_CODE_INVALID = 'CITY_CODE_INVALID',
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  ORDER_DISTANCE_TOO_FAR = 'ORDER_DISTANCE_TOO_FAR',
  ORDER_DATA_INVALID = 'ORDER_DATA_INVALID',
  HAVE_NO_UPDATED = 'HAVE_NO_UPDATED',
  INVALID_LEVEL = 'INVALID_LEVEL',
  BATTLE_END = 'BATTLE_END'
}

// customized error message for joi
const JoiValidationErrors = {
  required: ERROR_CODE.FIELD_REQUIRED
};

const ErrorList = {
  // Common Errors
  [ERROR_CODE.NOT_FOUND]: {
    statusCode: StatusCode.NOT_FOUND,
    message: 'Not Found',
    code: StatusCode.NOT_FOUND
  },
  [ERROR_CODE.INTERNAL_ERROR]: {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    message: 'Internal Error',
    code: StatusCode.INTERNAL_SERVER_ERROR
  },
  [ERROR_CODE.INVALID_REQUEST]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Request format incorrect',
    code: StatusCode.BAD_REQUEST
  },
  [ERROR_CODE.INVALID_FIELD]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'This field does not have the correct format.',
    code: StatusCode.BAD_REQUEST
  },
  [ERROR_CODE.KAFKA_UNEXPECTED_ERROR]: {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    message: 'Kafka Unexpected error initialized',
    code: StatusCode.INTERNAL_SERVER_ERROR
  },
  [ERROR_CODE.FIELD_REQUIRED]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'This field is required.',
    code: 50003
  },
  [ERROR_CODE.DUPLICATED_KEY]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Key Mongo Id is Duplicated',
    code: 50001
  },
  // Details Errors
  [ERROR_CODE.DELIVERY_NOT_FOUND]: {
    statusCode: StatusCode.NOT_FOUND,
    message: 'Delivery Order could not be founded.',
    code: 50101
  },
  [ERROR_CODE.ORDER_NOT_FOUND]: {
    statusCode: StatusCode.NOT_FOUND,
    message: 'Order not found.',
    code: 50102
  },

  [ERROR_CODE.INVALID_STATE]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Entity has an invalid status',
    code: 50103
  },
  [ERROR_CODE.SERVICE_NOT_AVAILABLE_IN_ZONE]: {
    statusCode: StatusCode.NOT_FOUND,
    message: 'Service not available in zone',
    code: 50104
  },
  [ERROR_CODE.CITY_CODE_INVALID]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'City must be in 63 provinces of VN',
    code: 50105
  },
  [ERROR_CODE.ORDER_DISTANCE_TOO_FAR]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: `Delivery distance too far`,
    code: 50106
  },
  [ERROR_CODE.ORDER_DATA_INVALID]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Delivery Order data invalid',
    code: 50107
  },
  [ERROR_CODE.HAVE_NO_UPDATED]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Have no update was made',
    code: StatusCode.BAD_REQUEST
  },
  [ERROR_CODE.INVALID_LEVEL]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Level is invalid with currentRank',
    code: StatusCode.BAD_REQUEST
  },
  [ERROR_CODE.BATTLE_END]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Battle was end',
    code: StatusCode.BAD_REQUEST
  }
};

const errorTranslator = (error: any): any => {
  // handle MongoDB error
  if (
    error.name === MONGO_ERROR &&
    error.code === MONGO_ERROR_CODE.DUPLICATED_KEY
  ) {
    logger.error('Mongo error', error);

    const errorList: ErrorDetails[] = [];
    Object.keys((error as any).keyValue).forEach(key => {
      errorList.push(createErrorDetail(key, ERROR_CODE.DUPLICATED_KEY));
    });
    throw new AppError(ERROR_CODE.INVALID_REQUEST, errorList);
  }
  throw error;
};

export {
  ERROR_CODE,
  ErrorList,
  JoiValidationErrors,
  MONGO_ERROR,
  MONGO_ERROR_CODE,
  errorTranslator
};
