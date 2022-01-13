import BaseLogWrapper from '../baseLoggerWrapper';
import { ILogInstance, IMaskConfiguration } from '../type';
const logger: ILogInstance = {
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn()
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('logger wrapper', () => {
  describe('logger wrapper without mask', () => {
    const wrapLogs = new BaseLogWrapper(logger).getWrapper();
    describe('with arguments', () => {
      it('should wrap the log decorator around the module', () => {
        // given
        const service = {
          getName: () => ['name1', 'name2'],
          getNameById: (id: string) => {
            return 'name1' + id;
          }
        };
        //   when
        const resultGetNameById = wrapLogs(service).getNameById('34');
        //   then
        expect(resultGetNameById).toEqual('name134');
        expect(logger.debug).toHaveBeenCalledTimes(2);
        expect(logger.debug).toHaveBeenNthCalledWith(
          1,
          '>>>> Entering getNameById( id: "34")'
        );
        expect(logger.debug).toHaveBeenNthCalledWith(
          2,
          '<<<< Existing getNameById'
        );
      });
    });
    describe('without arguments', () => {
      it('should wrap the log decorator around the module', () => {
        // given
        const service = {
          getName: () => ['name1', 'name2'],
          getNameById: (id: string) => {
            return 'name1' + id;
          }
        };
        //   when
        const resultGetName = wrapLogs(service).getName();
        //   then
        expect(resultGetName).toEqual(['name1', 'name2']);
        expect(logger.debug).toHaveBeenCalledTimes(2);
        expect(logger.debug).toHaveBeenNthCalledWith(
          1,
          '>>>> Entering getName with no arguments'
        );
        expect(logger.debug).toHaveBeenNthCalledWith(
          2,
          '<<<< Existing getName'
        );
      });
    });
    describe('promise retunable function', () => {
      it('should generate the entry and exit logs with no args when service returns promise', () => {
        // given
        const service = {
          getName: async () => Promise.resolve('data'),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getNameById: async (_id: string) => Promise.resolve('id data')
        };

        //    when
        const resultGetName = wrapLogs(service).getName();
        //   then
        expect(resultGetName instanceof Promise).toBeTruthy();
        expect(logger.debug).toHaveBeenCalledTimes(1);
        expect(logger.debug).toHaveBeenNthCalledWith(
          1,
          '>>>> Entering getName with no arguments'
        );
      });
      it('should generate the entry and exit logs with args when service returns promise', () => {
        // given
        const service = {
          getName: async () => Promise.resolve('data'),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getNameById: async (_id: number) => Promise.resolve('id data')
        };
        const ID = 45;
        //    when
        const resultGetNameById = wrapLogs(service).getNameById(ID);
        //   then
        expect(resultGetNameById instanceof Promise).toBeTruthy();
        expect(logger.debug).toHaveBeenCalledTimes(1);
        expect(logger.debug).toHaveBeenNthCalledWith(
          1,
          `>>>> Entering getNameById( _id: ${ID})`
        );
      });
    });
    describe('function throwing error', () => {
      it('should log the entry, log error and no exit log when function throws error', () => {
        // given
        const service = {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getNameById: (_id: string) => {
            throw new Error('APP ERROR');
          }
        };
        // when
        try {
          wrapLogs(service).getNameById('ID');
        } catch (err) {
          // then
          expect(logger.debug).toHaveBeenCalledTimes(1);
          expect(logger.debug).toHaveBeenNthCalledWith(
            1,
            '>>>> Entering getNameById( _id: "ID")'
          );
          expect(logger.error).toHaveBeenCalledTimes(1);
          expect(logger.error).toHaveBeenCalledWith(
            '!!!! Caught error while executing getNameById, hence throwing error',
            new Error('APP ERROR')
          );
        }
      });
    });
    describe('rejected promise', () => {
      it('should log with entry and error', done => {
        const service = {
          getName: async () => Promise.reject('some error')
        };

        wrapLogs(service)
          .getName()
          .catch(error => {
            expect(error).toEqual('some error');
            expect(logger.debug).toHaveBeenCalledTimes(1);
            expect(logger.error).toHaveBeenCalledTimes(1);
            done();
          });
      });
    });
    describe('Await Asynchronous function', () => {
      // it('should log debug twice when the promise resolves when promise resolves', async () => {
      //   const service = wrapLogs({
      //     getName: async () => Promise.resolve('Name')
      //   });
      //   expect(await service.getName()).toEqual('Name');
      //   expect(logger.debug).toHaveBeenCalledTimes(2);
      // });
      it('should log debug once and error once when promise rejects', async () => {
        const service = wrapLogs({
          getName: () => Promise.reject('Name')
        });
        try {
          await service.getName();
        } catch (err) {
          expect(err).toEqual('Name');
          expect(logger.debug).toHaveBeenCalledTimes(1);
          expect(logger.error).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  describe('log wrapper with mask', () => {
    it('should mask the arguments when the configuration is passed', () => {
      const maskConfiguration: IMaskConfiguration = ['name', 'city'];
      const wrapLogs = new BaseLogWrapper(
        logger,
        maskConfiguration
      ).getWrapper();
      const service = wrapLogs({
        getUser: (id: string, name: string) => {
          return id + name;
        }
      });
      expect(service.getUser('ID', 'name')).toEqual('IDname');
      expect(logger.debug).toHaveBeenCalledTimes(2);
      expect(logger.debug).toHaveBeenNthCalledWith(
        1,
        '>>>> Entering getUser( id: "ID", name: ****)'
      );
      expect(logger.debug).toHaveBeenNthCalledWith(2, '<<<< Existing getUser');
    });
  });
});
