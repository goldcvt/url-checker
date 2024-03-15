import assert from 'assert';

import { ResolverService } from './resolve.service.js';

describe('ResolverService', () => {
  // yep, this might be flaky if you don't have /etc/hosts configured :)
  it('localhost should return 127.0.0.1', async () => {
    // Arrange
    const resolverService = new ResolverService();
    // Act
    const result = await resolverService.resolve('localhost');
    // Assert
    assert.equal(result.ip, '127.0.0.1');
  });
});
