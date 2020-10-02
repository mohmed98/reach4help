import {getAuthenticatedKey} from  '../../src/algolia/getAuthenticatedKey';
describe('getAuthenticatedKey', () => {
  it('returns a string', async () => {
    expect (typeof await getAuthenticatedKey()).toBe("string");
  });
});
