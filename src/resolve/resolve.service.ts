import { lookup } from 'node:dns';
import { promisify } from 'node:util';

import { IResolveResult, IResolverService } from './resolve.interfaces.js';

export class ResolverService implements IResolverService {
  private readonly lookup = promisify(lookup);

  async resolve(url: string): Promise<IResolveResult> {
    const lookupAddress = await this.lookup(url);
    return {
      ip: lookupAddress.address,
    };
  }
}
