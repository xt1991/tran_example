import { retry } from '../retry';

describe('retry.ts', () => {
  afterEach(() => {
    expect.hasAssertions();
  });
  describe('retry', () => {
    it('should retry without any error', async () => {
      // Given
      const randomFunc = async (prefix: string, suffix: string) =>
        `${prefix} bobo ${suffix}`;

      // When
      const result = await retry({}, randomFunc, 'param1', 'param2');

      // Then
      expect(result).toEqual('param1 bobo param2');
    });

    it('should throw error on calling the function with default retries times', async () => {
      // Given
      let counter = 0;
      const err = new Error('some error');
      const randomFunc = () => {
        counter++;
        throw err;
      };

      // When
      await retry({}, randomFunc).catch((error: any) => {
        // Then
        expect(counter).toEqual(3);
        expect(error).toEqual(err);
      });
    });

    it('should throw error on calling the function three times', async () => {
      // Given
      let counter = 0;
      const err = new Error('some error');
      const randomFunc = (dummyArg: string) => {
        counter++;
        dummyArg;
        throw err;
      };

      // When
      await retry(
        { numberOfTries: 10, isExponentialBackOff: false },
        randomFunc,
        'awesome'
      ).catch((error: any) => {
        // Then
        expect(counter).toEqual(10);
        expect(error).toEqual(err);
      });
    });

    it('should not retry if the retry condition returns false', async () => {
      // Given
      let counter = 0;
      const err = new Error('some error');
      const randomFunc = (dummyArg: string) => {
        counter++;
        dummyArg;
        throw err;
      };
      const shouldRetry = () => false;

      // When
      await retry(
        { numberOfTries: 10, isExponentialBackOff: false, shouldRetry },
        randomFunc,
        'awesome'
      ).catch((error: any) => {
        // Then
        expect(counter).toEqual(1);
        expect(error).toEqual(err);
      });
    });
  });
});
