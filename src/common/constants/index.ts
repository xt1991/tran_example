const Tracing = {
  TRACER_SESSION: 'TRACER_SESSION',
  REQUEST_ID: 'REQUEST_ID',
  TRANSACTION_ID: 'x-request-id',
  TRACKING: 'TRACKING',
  TRACKING_BATCH_ID: 'x-batch-id'
};

const HttpHeaders = {
  AUTH: 'authorization',
  X_API_KEY: 'x-api-key',
  CHARSET: 'charset',
  CONTENT_TYPE: 'content-type',
  LANGUAGE: 'x-language',
  CURRENCY: 'x-currency',
  X_ERROR_MESSAGE: 'x-error-message',
  X_ERROR_CODE: 'x-error-code',
  X_ERROR_LIST: 'x-error-list'
};

const AuthMode = {
  API_KEY: 'x-api-key',
  JWT: 'jwt'
};

const Kafka = {
  CONSUMER_GROUP: 'consumer_group',
  TOPIC: 'topic'
};

const Cache = {
  MAX_TIME_DEFAULT: 360000, // 1h
  MAX_SIZE_DEFAULT: 1024
};

const EnableSwaggerEnvs = [
  'default',
  'local',
  'dev',
  'qc',
  'staging',
  'stg',
  'uat',
  'pt',
  'prepro',
  'preprod'
];

export default {
  DECIMAL_PRECISION: 2,
  DEFAULT_RETRY_OPTIONS: {
    NUMBER_OF_RETRIES: 3,
    DELAY_IN_MS: 100
  },
  EMPTY_STRING: '',
  EXECUTION_TYPE: 'execution-type',
  REGEX_NUMERIC: /^[0-9]*$/,
  AUTH_CREDENTIALS: 'auth.credentials',
  LOCALE_DEFAULT: 'vi',
  FORMAT_DATE_INPUT: 'YYYY-MM-DDTHH:mm:ss.sssZ' // ISO8061,
};

const LongDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

export {
  Kafka,
  Tracing,
  HttpHeaders,
  AuthMode,
  Cache,
  EnableSwaggerEnvs,
  LongDateTimeFormat
};
