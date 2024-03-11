import { Inject, Injectable } from '@nestjs/common';
import { IUrlRepository } from '../../urls.types.js';
import { UrlsRepository } from '../../urls.repository.js';
import { UrlsService } from '../../urls.service.js';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CheckAllUrlsUsecase {
  constructor(
    @Inject(UrlsRepository) private readonly repo: IUrlRepository,
    private readonly urlService: UrlsService,
  ) {}

  @Cron('*/2 * * * *')
  async execute() {
    const rawUrls = await this.repo.getAll();
    for (const url of rawUrls) {
      const checkRes = await this.urlService.checkUrl(url);
      await this.repo.updateCheckResults({ ...checkRes, id: url.id });
    }
  }
}
