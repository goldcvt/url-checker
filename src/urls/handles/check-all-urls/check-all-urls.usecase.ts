import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { IUrlRepository } from '../../urls.interfaces.js';
import { UrlsRepository } from '../../urls.repository.js';
import { UrlsService } from '../../urls.service.js';

@Injectable()
export class CheckAllUrlsUsecase {
  constructor(
    @Inject(UrlsRepository) private readonly repo: IUrlRepository,
    private readonly urlService: UrlsService,
  ) {}

  @Cron('*/2 * * * *')
  async execute() {
    const plainUrls = await this.repo.getAll();
    // Could've used a something like p-defer OR bottleneck to
    // limit the concurrency
    await Promise.all(
      plainUrls.map(async (url) => {
        const checkRes = await this.urlService.checkUrl(url);
        return this.repo.updateCheckResults({ ...checkRes, id: url.id });
      }),
    );
  }
}
