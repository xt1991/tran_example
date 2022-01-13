import { utils } from '../';

describe('Is Async function', () => {
  // it('should return true if function is async', () => {
  //   // given
  //   const func = async () => Promise.resolve('data');

  //   // when
  //   const isAsync = utils.isAsync(func);

  //   // then
  //   expect(isAsync).toBeTruthy();
  // });

  it('should return false when function is not async', () => {
    // given
    const fun = () => 'data';

    // when
    const result = utils.isAsync(fun);

    // then
    expect(result).toBeFalsy();
  });

  it('Should generate mongo uris with single host', () => {
    // given
    const dbName = 'common_db';
    const hosts = ['test-mongo-0.com:27017'];
    const username = 'user';
    const password = 'password';

    // when
    const dbUri = utils.getMongoUri(username, password, dbName, hosts);

    // then
    expect(dbUri).toEqual(
      `mongodb://${username}:${password}@${hosts[0]}/${dbName}`
    );
  });

  it('Should generate mongo uris with more than one hosts', () => {
    // given
    const dbName = 'common_db';
    const hosts = ['test-mongo-0.com:27017', 'test-mongo-1.com:27017'];
    const username = 'user';
    const password = 'password';

    // when
    const dbUri = utils.getMongoUri(username, password, dbName, hosts);

    // then
    expect(dbUri).toEqual(
      `mongodb://${username}:${password}@${hosts[0]},${hosts[1]}/${dbName}`
    );
  });
});
