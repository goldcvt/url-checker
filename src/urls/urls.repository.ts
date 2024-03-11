import { IUrlRepository, UrlDomainModel } from './urls.types.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity.js';
import { URLS_DATA_SOURCE_TOKEN } from './urls.constants.js';
import { Repository } from 'typeorm';
import { UrlsMapper } from './urls.mapper.js';

export class UrlsRepository implements IUrlRepository {
  constructor(
    @InjectRepository(UrlEntity, URLS_DATA_SOURCE_TOKEN)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  public async saveCheckResults(
    urlModel: Omit<UrlDomainModel, 'id'>,
  ): Promise<UrlDomainModel> {
    const { schema, lastCheckedAt, lastResolvedAs, address } = urlModel;
    return await this.dataSource.transaction(async (em) => {
      const insertRes = await em
        .createQueryBuilder()
        .insert()
        .into(UrlEntity)
        .values([{ schema, lastCheckedAt, lastResolvedAs, address }])
        .returning('*')
        .execute();
      const urlDomainModel = UrlsMapper.toUnmarshalled(insertRes.raw.at(0));
      await this.cacheService.set(
        urlDomainModel.address,
        JSON.stringify(urlDomainModel),
      );
      return urlDomainModel;
    });
  }

  async updateCheckResultsAndCache(
    urlPartialModel: Pick<
      UrlDomainModel,
      'id' | 'lastCheckedAt' | 'lastResolvedAs'
    >,
  ): Promise<void> {
    await this.dataSource.transaction(async (em) => {
      const updateRes = await em
        .createQueryBuilder()
        .update<UrlEntity>(UrlEntity)
        .set({
          lastCheckedAt: urlPartialModel.lastCheckedAt,
          lastResolvedAs: urlPartialModel.lastResolvedAs,
        })
        .where('id = :urlId', { urlId: urlPartialModel.id })
        .returning('*')
        .execute();
      const domainModel = UrlsMapper.toUnmarshalled(updateRes.raw.at(0));
      await this.cacheService.set(
        domainModel.address,
        JSON.stringify(domainModel),
      );
    });
  }
}
