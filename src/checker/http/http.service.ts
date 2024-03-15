import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { IHttpResultData, IHttpService } from './http.interfaces.js';
import { UrlDomainModel } from '../../urls/urls.domain.js';
import { checkerConfig } from '../checker.config.js';

@Injectable()
export class HttpGetCheckerSourceService implements IHttpService {
  private readonly logger = new Logger(HttpGetCheckerSourceService.name);
  constructor(
    private readonly httpClient: HttpService,
    @Inject(checkerConfig.KEY)
    private readonly config: ConfigType<typeof checkerConfig>,
  ) {}

  // Wrapper for retries, timeout.
  // Timeout and not throwing at non-2xx code
  // are configured for HttpService in the module
  private async request(dest: string) {
    let retries = this.config.retries;

    while (retries) {
      const response = await firstValueFrom(this.httpClient.get(dest));

      if (response.status >= 200 || response.status < 300) {
        return response;
      }

      retries--;
    }
    return firstValueFrom(this.httpClient.get(dest));
  }

  async getData(dest: UrlDomainModel): Promise<IHttpResultData> {
    // try to extract from lastly cached ip
    // could've used recursion, but this will do
    try {
      const { status } = await this.request(dest.lastResolvedUrl);
      return { statusCode: status, decodedJsonBody: undefined };
    } catch (error: any) {
      this.logger.warn(
        `Couldn't GET the destination ${dest}, reason: ${error?.message ?? error}`,
      );
    }

    try {
      await dest.refreshResolvedIp();
      // extract from the latest resolved ip
      const { status } = await this.request(dest.lastResolvedUrl);
      return { statusCode: status, decodedJsonBody: undefined };
    } catch (error) {
      return { statusCode: undefined, decodedJsonBody: undefined };
    }
  }
}
