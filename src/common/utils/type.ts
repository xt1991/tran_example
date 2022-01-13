export interface RetryOptions {
  shouldRetry?: (err: any) => boolean;
  numberOfTries?: number;
  isExponentialBackOff?: boolean;
  delayInMS?: number;
}

export type VariadicFunction = (...args: any[]) => any;
