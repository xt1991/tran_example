import moment from 'moment';
import { utils } from '../index';

describe('common - util', () => {
  afterEach(() => {
    expect.hasAssertions();
    jest.resetAllMocks();
  });

  describe('utils', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    describe('getPaggingMetadata', () => {
      it('should return metadata pagging when totalData greater than page', () => {
        const totalData = 10;
        const limit = 2;
        const page = 1;
        const result = utils.getPaggingMetadata(totalData, limit, page);
        expect(result).toEqual({
          hasNextPage: true,
          hasPrevPage: false,
          limit: 2,
          nextPage: 2,
          page: 1,
          prevPage: null,
          totalPage: 5
        });
      });

      it('should return metadata pagging', () => {
        const totalData = 10;
        const limit = 20;
        const page = 1;
        const result = utils.getPaggingMetadata(totalData, limit, page);
        expect(result).toEqual({
          hasNextPage: false,
          hasPrevPage: false,
          limit: 20,
          nextPage: null,
          page: 1,
          prevPage: null,
          totalPage: 1
        });
      });

      it('should return metadata pagging', () => {
        const totalData = 10;
        const limit = 2;
        const page = 2;
        const result = utils.getPaggingMetadata(totalData, limit, page);
        expect(result).toEqual({
          hasNextPage: true,
          hasPrevPage: true,
          limit: 2,
          nextPage: 3,
          page: 2,
          prevPage: 1,
          totalPage: 5
        });
      });

      it('should return metadata pagging when totalData zero', () => {
        const totalData = 0;
        const limit = 2;
        const page = 2;
        const result = utils.getPaggingMetadata(totalData, limit, page);
        expect(result).toEqual({
          hasNextPage: false,
          hasPrevPage: true,
          limit: 2,
          nextPage: null,
          page: 2,
          prevPage: 1,
          totalPage: 1
        });
      });

      it('should return metadata pagging', () => {
        const totalData = 10;
        const limit = 20;
        const page = 2;
        const result = utils.getPaggingMetadata(totalData, limit, page);
        expect(result).toEqual({
          hasNextPage: false,
          hasPrevPage: true,
          limit: 20,
          nextPage: null,
          page: 2,
          prevPage: 1,
          totalPage: 1
        });
      });
    });

    describe('wrapperMoment', () => {
      it('should reuturn moment when moment valid', () => {
        const result = utils.wrapperMoment(moment());

        expect(result).toBeDefined();
      });

      it('should return null when moment invalid', () => {
        const result = utils.wrapperMoment(moment(null));

        expect(result).toBeNull();
      });
    });
  });
});
