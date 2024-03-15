import assert from 'node:assert';

import { UrlDomainModel } from './urls.domain.js';
import { IResolverService } from '../resolve/resolve.interfaces.js';

const makeResolverServiceMock = (
  expectedResolvedIp: string,
): IResolverService => ({
  resolve: async () => ({ ip: expectedResolvedIp }),
});

describe('UrlsDomain', () => {
  describe('create', () => {
    it('should create an instance of UrlDomainModel', () => {
      // Arrange
      const expectedResolvedIp = '127.0.0.1';

      const urlsDomain = UrlDomainModel.create(
        {
          id: 1,
          url: 'https://example.com',
          lastResolvedIp: expectedResolvedIp,
          lastCheckedAt: new Date(),
          lastCheckStatus: 200,
        },
        makeResolverServiceMock(expectedResolvedIp),
      );

      assert.equal(
        urlsDomain.lastResolvedUrl,
        `https://${expectedResolvedIp}:443`,
      );
    });
    it('should not create if resolved IP contains port', () => {
      assert.throws(() => {
        UrlDomainModel.create(
          {
            id: 1,
            url: 'https://example.com',
            lastResolvedIp: '1.1.1.1:80',
            lastCheckedAt: null,
            lastCheckStatus: null,
          },
          makeResolverServiceMock('127.1.1.1'),
        );
      });
    });
  });
  describe('lastResolvedUrl', () => {
    it('should resolve to correct url', async () => {
      // Arrange
      const expectedResolvedIp = '127.0.0.1';

      const urlsDomain = UrlDomainModel.create(
        {
          id: 1,
          url: 'https://example.com',
          lastResolvedIp: '192.168.0.1',
          lastCheckedAt: new Date(),
          lastCheckStatus: 200,
        },
        makeResolverServiceMock(expectedResolvedIp),
      );

      assert.equal(urlsDomain.lastResolvedUrl, 'https://192.168.0.1:443');

      await urlsDomain.refreshResolvedIp();
      assert.equal(
        urlsDomain.lastResolvedUrl,
        `https://${expectedResolvedIp}:443`,
      );
    });
  });
  describe('refreshResolvedIp', () => {
    it('should update the lastResolvedIp property', async () => {
      // Arrange
      const expectedResolvedIp = '127.0.0.1';

      const urlsDomain = UrlDomainModel.create(
        {
          id: 1,
          url: 'https://example.com',
          lastResolvedIp: '192.168.0.1',
          lastCheckedAt: new Date(),
          lastCheckStatus: 200,
        },
        makeResolverServiceMock(expectedResolvedIp),
      );

      assert.notEqual(urlsDomain.ip, expectedResolvedIp);

      // Act
      await urlsDomain.refreshResolvedIp();

      // Assert
      assert.equal(urlsDomain.ip, expectedResolvedIp);
    });
  });
});
