import { Inject, Injectable } from '@nestjs/common';
import { UrlPlain } from './urls.interfaces.js';
import { RawUrl } from './entities/url.entity.js';
import { UrlDomainModel } from './urls.domain.js';
import { IResolverService } from '../resolve/resolve.interfaces.js';
import { UrlMapper } from './urls.mapper.js';
import { RESOLVE_SERVICE_TOKEN } from '../resolve/resolve.constants.js';

@Injectable()
export class UrlsDomainFactory {
  constructor(
    @Inject(RESOLVE_SERVICE_TOKEN)
    private readonly resolverService: IResolverService,
  ) {}

  fromRaw(raw: RawUrl): UrlDomainModel {
    return UrlDomainModel.create(
      UrlMapper.rawToPlain(raw),
      this.resolverService,
    );
  }

  fromPlain(plain: UrlPlain): UrlDomainModel {
    return UrlDomainModel.create(plain, this.resolverService);
  }
}
