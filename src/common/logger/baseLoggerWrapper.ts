/* eslint-disable @typescript-eslint/ban-types */
import { transform } from 'lodash';
import { utils } from '../utils';
import { ILogInstance, IMaskConfiguration } from './type';
/* this will export a function to get a wrapper which will wrap around services or repositories
 with {key: Function} type of modules*/
const REGEX_GET_PARAMS = /\([^)]+\)/;
const REGEX_GET_BRACKETS = /[\(\)']+/g;
const ARG_SEPARATOR = ',';
const EMPTY_STRING = '';
const MASK_STRING = '****';

export default class BaseLogWrapper {
  private logInstance: ILogInstance;
  private maskConfiguration: IMaskConfiguration;
  constructor(
    logInstance: ILogInstance,
    maskConfiguration: IMaskConfiguration = undefined
  ) {
    this.logInstance = logInstance;
    this.maskConfiguration = maskConfiguration;
  }

  public getWrapper() {
    return <T>(module: T): T => {
      return transform(
        module as any,
        (result: any, value: Function, key: string) => {
          result[key] = this.logAspect(key, value);
        }
      );
    };
  }

  private getArgumentsDetail(args: unknown[], argNames: string[]) {
    const maskedArguments = argNames.reduce((result: any, nextArg, index) => {
      result.push(
        ` ${nextArg}: ${
          this.maskConfiguration &&
          this.maskConfiguration.includes(argNames[index])
            ? MASK_STRING
            : JSON.stringify(args[index])
        }`
      );
      return result;
    }, []);
    return args.length ? `(${maskedArguments})` : ' with no arguments';
  }

  private logAspect(targetName: string, wrapped: Function) {
    return (...args: unknown[]) =>
      utils.isAsync(wrapped)
        ? (async () => await this.asyncExecuter(targetName, wrapped, args))()
        : this.syncExecuter(targetName, wrapped, args);
  }

  private syncExecuter(targetName: string, wrapped: Function, args: unknown[]) {
    this.logEntry(targetName, args, wrapped);
    let result;
    try {
      result = wrapped(...args);
      if (result instanceof Promise) {
        // in case the function is like () => Promise.resolve("data")
        // i.e. looks sync from defination and returns Promise
        return result
          .then(res => {
            this.logExit(targetName);
            result = res;
          })
          .catch(err => {
            this.logError(targetName, err);
            throw err;
          });
      } else {
        this.logExit(targetName);
        return result;
      }
    } catch (error) {
      this.logError(targetName, error);
      throw error;
    }
  }

  private async asyncExecuter(
    targetName: string,
    wrapped: Function,
    args: unknown[]
  ) {
    this.logEntry(targetName, args, wrapped);
    let result;
    try {
      result = await wrapped(...args);
    } catch (error) {
      this.logError(targetName, error);
      throw error;
    }
    this.logExit(targetName);
    return result;
  }
  private getParamsFromFunction(wrapped: Function): string {
    const params: RegExpMatchArray | null = wrapped
      .toString()
      .match(REGEX_GET_PARAMS);
    return (params && params[0]) || EMPTY_STRING;
  }
  private getParamAsArray(wrapped: Function): string[] {
    return this.getParamsFromFunction(wrapped)
      .replace(REGEX_GET_BRACKETS, EMPTY_STRING)
      .split(ARG_SEPARATOR)
      .map((argName: string) => argName.trim());
  }
  private logEntry(
    targetName: string,
    args: unknown[],
    wrapped: Function
  ): void {
    // Todo debug level check
    const argNameList: string[] = this.getParamAsArray(wrapped);
    this.logInstance.debug(
      `>>>> Entering ${targetName}${this.getArgumentsDetail(args, argNameList)}`
    );
  }

  private logExit(targetName: string): void {
    this.logInstance.debug(`<<<< Existing ${targetName}`);
  }

  private logError(targetName: string, error: unknown): void {
    this.logInstance.error(
      `!!!! Caught error while executing ${targetName}, hence throwing error`,
      error
    );
  }
}
