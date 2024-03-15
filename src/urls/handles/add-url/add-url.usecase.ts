import { Inject, Injectable } from '@nestjs/common';

import { CreateUrlDto } from './dto/add-url.dto.js';
import { RESOLVE_SERVICE_TOKEN } from '../../../resolve/resolve.constants.js';
import { IResolverService } from '../../../resolve/resolve.interfaces.js';
import { IUrlRepository } from '../../urls.interfaces.js';
import { UrlsRepository } from '../../urls.repository.js';

@Injectable()
export class AddUrlUsecase {
  constructor(
    @Inject(RESOLVE_SERVICE_TOKEN)
    private readonly resolverService: IResolverService,
    @Inject(UrlsRepository) private readonly urlRepo: IUrlRepository,
  ) {}

  async execute(dto: CreateUrlDto): Promise<{
    id: number;
    url: string;
    lastResolvedIp: string;
  }> {
    const hostname = new URL(dto.url).hostname;
    const { ip } = await this.resolverService.resolve(hostname);
    const savedResult = await this.urlRepo.save({
      url: dto.url,
      lastResolvedIp: ip,
    });
    return {
      id: savedResult.id,
      url: savedResult.url,
      lastResolvedIp: savedResult.lastResolvedIp,
    };
  }
}
