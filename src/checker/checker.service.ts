import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UrlDomainModel } from '../urls/urls.domain.js';
import { ICheckData } from './checks/checks.interfaces.js';
import { statusCodeCheck } from './checks/status-code/status-code.check.js';
import { HTTP_SERVICE_TOKEN } from './checker.constants.js';
import { IHttpService } from './http/http.interfaces.js';
import { ChecksPipeline } from './checks/checks.pipeline.js';

@Injectable()
export class CheckerService implements OnModuleInit {
  constructor(
    @Inject(HTTP_SERVICE_TOKEN)
    private readonly httpService: IHttpService,
    private readonly checksPipeline: ChecksPipeline,
  ) {}

  onModuleInit() {
    this.checksPipeline.apply(statusCodeCheck);
  }

  private runChecksOnSourceData(sourceData: ICheckData) {
    return this.checksPipeline.run(sourceData);
  }

  private getSourceForChecks(urlDomainModel: UrlDomainModel) {
    return this.httpService.getData(urlDomainModel);
  }

  async getResultsFromChecks(urlDomainModel: UrlDomainModel) {
    const sourceData = await this.getSourceForChecks(urlDomainModel);
    console.log(sourceData);
    return this.runChecksOnSourceData(sourceData);
  }
}
