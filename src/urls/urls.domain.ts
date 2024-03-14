import { isIPv4 } from 'node:net';
import { IResolverService } from '../resolve/resolve.interfaces.js';
import { UrlPlain } from './urls.interfaces.js';
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
    UrlDomainModel.assertIp(fields.lastResolvedIp);
    this.lastResolvedIp = fields.lastResolvedIp;
  }

  private static assertIp(ip: string) {
    const isIp = isIPv4(ip);
    if (!isIp) {
      throw new Error('Resolved to not an IP!');
    }
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
    return `${this.schema}://${this.lastResolvedIp}:${this.port}`;
  }

  async refreshResolvedIp() {
    const { ip } = await this.resolverService.resolve(this.fields.url);
    this.lastResolvedIp = ip;
  }
}
