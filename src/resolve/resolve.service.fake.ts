import { IResolveResult, IResolverService } from './resolve.interfaces.js';

export class FakeResolveService implements IResolverService {
  private static generateRandomIp() {
    return (
      Math.floor(Math.random() * 255) +
      1 +
      '.' +
      Math.floor(Math.random() * 255) +
      '.' +
      Math.floor(Math.random() * 255) +
      '.' +
      Math.floor(Math.random() * 255)
    );
  }

  resolve(): Promise<IResolveResult> {
    const ip = FakeResolveService.generateRandomIp();
    return Promise.resolve({
      ip,
    });
  }
}
