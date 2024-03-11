import { Inject, Injectable } from '@nestjs/common';
import { UrlDomainModel } from '../urls/urls.domain.js';
import { ICheckData } from './checks/checks.interfaces.js';
import { statusCodeCheck } from './checks/status-code/status-code.check.js';
import { ISourceService } from './sources/sources.interfaces.js';
import { CHECKER_SERVICE_SOURCE_PROVIDER } from './checker.constants.js';

@Injectable()
export class CheckerService {
  constructor(
    @Inject(CHECKER_SERVICE_SOURCE_PROVIDER)
    private readonly httpGetSource: ISourceService,
  ) {}

  runChecksOnSourceData(sourceData: ICheckData) {
    return statusCodeCheck.check(sourceData, {});
  }

  private getSourceForChecks(urlDomainModel: UrlDomainModel) {
    return this.httpGetSource.extractData(urlDomainModel);
  }

  async getResultsFromChecks(urlDomainModel: UrlDomainModel) {
    const sourceData = await this.getSourceForChecks(urlDomainModel);
    return this.runChecksOnSourceData(sourceData);
  }
}
