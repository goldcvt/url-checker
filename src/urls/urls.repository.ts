import { IUrlRepository, UrlPlain } from './urls.types.js';
import { InjectRepository } from '@nestjs/typeorm';
import { RawUrl, UrlEntity } from './entities/url.entity.js';
import { Repository } from 'typeorm';

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

  async getAll(): Promise<RawUrl[]> {
    // Could've used cursor, but why when you could just
    // scale the workers and each would get dedicated batch
    // from a dispatcher service
    return this.urlRepo.createQueryBuilder().select('*').getRawMany();
  }
}
