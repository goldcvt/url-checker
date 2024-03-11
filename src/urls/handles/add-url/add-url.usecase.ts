import { Inject, Injectable } from '@nestjs/common';
import { RESOLVE_SERVICE_TOKEN } from '../../../resolve/resolve.constants.js';
import { IResolverService } from '../../../resolve/resolve.interfaces.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from '../../entities/url.entity.js';
import { CreateUrlDto } from './dto/add-url.dto.js';

@Injectable()
export class AddUrlUsecase {
  constructor(
    @Inject(RESOLVE_SERVICE_TOKEN)
    private readonly resolverService: IResolverService,
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  async execute(dto: CreateUrlDto): Promise<{
    id: number;
    url: string;
    lastResolvedIp: string;
  }> {
    const { ip } = await this.resolverService.resolve(dto.url);
    const urlEntity = this.urlRepo.create({ url: dto.url, lastResolvedIp: ip });
    const entity = await this.urlRepo.save(urlEntity);
    return {
      id: entity.id,
      url: entity.url,
      lastResolvedIp: entity.lastResolvedIp,
    };
  }
}
