import constants from '../constants';
import { RetryOptions, VariadicFunction } from './type';

const {
  DEFAULT_RETRY_OPTIONS: { DELAY_IN_MS, NUMBER_OF_RETRIES }
} = constants;

const defaultShouldRetry = () => true;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retry = async <T extends VariadicFunction>(
  retryOptions: RetryOptions,
  functionToExecute: T,
  ...args: Parameters<T>
): Promise<ReturnType<T>> => {
  const {
    numberOfTries = NUMBER_OF_RETRIES,
    delayInMS = DELAY_IN_MS,
    isExponentialBackOff = true
  } = retryOptions;
  let error: unknown;
  const shouldRetry = retryOptions.shouldRetry || defaultShouldRetry;
  for (let iter = 0; iter < numberOfTries; iter++) {
    try {
      return await functionToExecute(...args);
    } catch (err) {
      if (!shouldRetry(err)) {
        throw err;
      }
      let totalDelay = delayInMS;
      if (isExponentialBackOff) totalDelay *= iter + 1;
      error = err;
      await delay(totalDelay);
    }
  }
  throw error;
};

export { retry, delay };
