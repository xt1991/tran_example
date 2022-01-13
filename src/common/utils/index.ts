/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { retry } from './retry';
import { getPaggingMetadata } from './paging';
import { Moment } from 'moment';

const isAsync = (wrapped: Function) =>
  wrapped.constructor.name === 'AsyncFunction';

const getMongoUri = (
  user: string,
  password: string,
  dbName: string,
  hosts: string[]
): string => {
  const hostsString = hosts.join(',');
  let credential = '';
  if (user && password) {
    credential = `${user}:${password}@`;
  }
  return `mongodb://${credential}${hostsString}/${dbName}`;
};

const wrapperMoment = (dateMomemt: Moment) =>
  dateMomemt.isValid() ? dateMomemt : null;

const utils = {
  getMongoUri,
  isAsync,
  retry,
  getPaggingMetadata,
  wrapperMoment
};

export * from './type';
export { utils };
