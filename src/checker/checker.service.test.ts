import assert from 'assert';

import { CheckerService } from './checker.service';
import { ChecksPipeline } from './checks/checks.pipeline.js';
import { IHttpService } from './http/http.interfaces.js';
import { UrlDomainModel } from '../urls/urls.domain.js';
import { UrlsDomainFactory } from '../urls/urls.factory.js';

const mockHttpServiceFactory: (
  urlToStatusMap: Record<string, number>,
) => IHttpService = (urlToStatusMap: Record<string, number>) => ({
  getData: async (dest: UrlDomainModel) => {
    if (!(dest.lastResolvedUrl in urlToStatusMap)) {
      return {
        statusCode: 404,
        decodedJsonBody: undefined,
      };
    }
    return {
      statusCode: urlToStatusMap[dest.lastResolvedUrl],
      decodedJsonBody: undefined,
    };
  },
});

const checkerServiceFactory = (urlToStatusMap: Record<string, number>) => {
  const service = new CheckerService(
    mockHttpServiceFactory(urlToStatusMap),
    new ChecksPipeline(),
  );
  service.onModuleInit();

  return service;
};

const urlDomainModelFactory = new UrlsDomainFactory({
  resolve: async (url: string) => {
    const urlObj = new URL(url);
    return { ip: urlObj.hostname };
  },
});

describe('CheckerService', () => {
  describe('runChecksOnSourceData', () => {
    it('Can check domainUrl', async () => {
      // Arrange
      const urlToStatusMap = {
        'http://1.1.1.1:80': 302,
        'https://121.1.2.3:443': 201,
      };
      const checkService = checkerServiceFactory(urlToStatusMap);
      const domainUrl = urlDomainModelFactory.fromPlain({
        id: 1,
        lastCheckedAt: null,
        lastCheckStatus: null,
        lastResolvedIp: '1.1.1.1',
        url: 'http://1.1.1.1:80',
      });

      // Act
      const checkResult = await checkService.getResultsFromChecks(domainUrl);

      // Assert
      assert.deepStrictEqual(checkResult, {
        statusCodeCheckResult: {
          passed: false,
          hasRun: true,
          resultBody: {
            statusCode: 302,
          },
        },
        hasBodyCheckResult: {
          hasRun: false,
          passed: false,
        },
      });
    });
  });
});
