import { StatusCode } from '../http';

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
  HAVE_NO_UPDATED = 'HAVE_NO_UPDATED'
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
  [ERROR_CODE.HAVE_NO_UPDATED]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Have no update was made',
    code: StatusCode.BAD_REQUEST
  }
};

export {
  ERROR_CODE,
  ErrorList,
  JoiValidationErrors,
  MONGO_ERROR,
  MONGO_ERROR_CODE
};
