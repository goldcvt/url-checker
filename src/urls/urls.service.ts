import { Injectable } from '@nestjs/common';

import { UrlsDomainFactory } from './urls.factory.js';
import { RawUrl } from './entities/url.entity.js';
import { CheckerService } from '../checker/checker.service.js';

@Injectable()
export class UrlsService {
  constructor(
    private readonly urlDomainFactory: UrlsDomainFactory,
    private readonly checkerService: CheckerService,
  ) {}

  async checkUrl(raw: RawUrl): Promise<{
    lastCheckedAt: Date | null;
    lastCheckStatus: number | null;
    lastResolvedIp: string;
  }> {
    const urlDomainModel = this.urlDomainFactory.fromRaw(raw);
    const checkResults =
      await this.checkerService.getResultsFromChecks(urlDomainModel);
    return {
      lastCheckStatus:
        checkResults.statusCodeCheckResult.resultBody?.statusCode ?? null,
      lastCheckedAt: checkResults.statusCodeCheckResult.hasRun
        ? new Date()
        : null,
      lastResolvedIp: urlDomainModel.ip,
    };
  }
}
