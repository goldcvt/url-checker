import { IResolverService } from '../resolve/resolve.interfaces.js';
import { UrlPlain } from './urls.types.js';
import { getSchema, pickPort } from './urls.utils.js';

export class UrlDomainModel {
  private port: number;
  private schema: 'http' | 'https';
  private lastResolvedIp: string;

  private constructor(
    private readonly fields: UrlPlain,
    private readonly resolverService: IResolverService,
  ) {
    const urlObj = new URL(fields.url);
    this.schema = getSchema(urlObj.protocol);
    this.port = pickPort({ schema: this.schema, port: urlObj.port });
    this.lastResolvedIp = fields.lastResolvedIp;
  }

  static create(
    plainUrl: UrlPlain,
    resolverService: IResolverService,
  ): UrlDomainModel {
    return new UrlDomainModel({ ...plainUrl }, resolverService);
  }

  get ip() {
    return this.lastResolvedIp;
  }

  get lastResolvedUrl() {
    return `${this.schema}//${this.lastResolvedIp}:${this.port}`;
  }

  async refreshResolvedIp() {
    const { ip } = await this.resolverService.resolve(this.fields.url);
    this.lastResolvedIp = ip;
  }
}
