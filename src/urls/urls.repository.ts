import { IUrlRepository, UrlPlain } from './urls.interfaces.js';
import { InjectRepository } from '@nestjs/typeorm';
import { RawUrl, UrlEntity } from './entities/url.entity.js';
import { Repository } from 'typeorm';
import { UrlMapper } from './urls.mapper.js';

export class UrlsRepository implements IUrlRepository {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  async updateCheckResults(
    urlPartialModel: Pick<
      UrlPlain,
      'id' | 'lastCheckedAt' | 'lastResolvedIp' | 'lastCheckStatus'
    >,
  ): Promise<void> {
    const setProperties: Partial<UrlEntity> = {};
    if (urlPartialModel.lastCheckedAt) {
      setProperties.lastCheckedAt = urlPartialModel.lastCheckedAt;
    }
    if (urlPartialModel.lastResolvedIp) {
      setProperties.lastResolvedIp = urlPartialModel.lastResolvedIp;
    }
    if (urlPartialModel.lastCheckStatus) {
      setProperties.lastCheckStatus = urlPartialModel.lastCheckStatus;
    }

    await this.urlRepo
      .createQueryBuilder()
      .update<UrlEntity>(UrlEntity)
      .set(setProperties)
      .where('id = :urlId', { urlId: urlPartialModel.id })
      .returning('*')
      .execute();
  }

  async getAll(): Promise<UrlPlain[]> {
    // Could've used cursor, but why when you could just
    // scale the workers and each would get dedicated batch
    // from a dispatcher service
    // as probably the CPU will be the limiting factor anyways
    const allRawUrls: RawUrl[] = await this.urlRepo
      .createQueryBuilder()
      .select('*')
      .getRawMany();
    return allRawUrls.map((rawUrl) => UrlMapper.rawToPlain(rawUrl));
  }

  async save(
    urlPartialModel:
      | Pick<UrlPlain, 'url' | 'lastResolvedIp'>
      | Omit<UrlPlain, 'id'>,
  ): Promise<UrlPlain> {
    const newUrl = this.urlRepo.create(urlPartialModel);
    const savedUrl = await this.urlRepo.save(newUrl);
    return {
      id: savedUrl.id,
      url: savedUrl.url,
      lastResolvedIp: savedUrl.lastResolvedIp,
      lastCheckStatus: savedUrl.lastCheckStatus,
      lastCheckedAt: savedUrl.lastCheckedAt,
    };
  }
}
