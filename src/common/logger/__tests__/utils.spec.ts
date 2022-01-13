import { ignoreEndpoint, getDefaultLevel } from '../utils';
import { TransformableInfo } from 'logform';
import { LevelEnum } from '../type';

describe('utils', () => {
  describe('ignoreEndpoint', () => {
    it('should return false if path to be ignored is passed', () => {
      const input: TransformableInfo = {
        path: '/ping',
        level: 'info',
        message: 'string'
      };
      expect(ignoreEndpoint(input)).toEqual(false);
    });

    const cases: TransformableInfo[] = [
      {
        path: '/random',
        level: 'info',
        message: 'string'
      },
      {
        level: 'info',
        message: 'string'
      },
      {
        path: '',
        level: 'info',
        message: 'string'
      }
    ];

    it.each(cases)(
      'should return info if path to be ignored is not passed',
      input => {
        expect(ignoreEndpoint(input)).toEqual(input);
      }
    );
  });

  describe('isWarnLevel', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });

    afterAll(() => {
      process.env = OLD_ENV;
    });
    it('should return info if Node_Env is dev', () => {
      // given
      process.env.NODE_ENV = 'dev';
      // when
      const result = getDefaultLevel();
      //Then
      expect(result).toEqual(LevelEnum.info);
    });

    it('should return info if Node_Env is prod', () => {
      // given
      process.env.NODE_ENV = 'prod';
      // when
      const result = getDefaultLevel();
      //Then
      expect(result).toEqual(LevelEnum.info);
    });

    it('should return info if Node_Env is staging', () => {
      // given
      process.env.NODE_ENV = 'staging';
      // when
      const result = getDefaultLevel();
      //Then
      expect(result).toEqual(LevelEnum.info);
    });

    it('should return info if Node_Env is uat', () => {
      // given
      process.env.NODE_ENV = 'uat';
      // when
      const result = getDefaultLevel();
      //Then
      expect(result).toEqual(LevelEnum.info);
    });
  });
});
