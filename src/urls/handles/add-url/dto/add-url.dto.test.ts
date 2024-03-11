import { plainToInstance } from 'class-transformer';
import { CreateUrlDto } from './add-url.dto.js';
import assert from 'node:assert';

describe('Create URL spec', () => {
  it('Valid URI/URL produces valid base URL', () => {
    const testUri = 'https://x.com/posts/some/';
    const expected = 'https://x.com';
    const instance = plainToInstance(CreateUrlDto, { url: testUri });
    assert.equal(instance.url, expected);
  });
  it('On invalid URL (no schema) will throw', () => {
    const testUri = 'x.com/posts/some/';
    assert.throws(() => plainToInstance(CreateUrlDto, { url: testUri }));
  });
  it('On invalid URL will throw', () => {
    const testUri = 'httpdad:ADAdla/dx.com/posts/some/';
    assert.throws(() => plainToInstance(CreateUrlDto, { url: testUri }));
  });
});
