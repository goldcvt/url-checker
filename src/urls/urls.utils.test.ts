import assert from 'assert';

import { getSchema, pickPort } from './urls.utils';

describe('pickPort', () => {
  it('should return the correct port for http schema', () => {
    const result = pickPort({ schema: 'http', port: '' });
    assert.equal(result, 80);
  });

  it('should return the correct port for https schema', () => {
    const result = pickPort({ schema: 'https', port: '' });
    assert.equal(result, 443);
  });

  it('should return the parsed port when port is provided', () => {
    const result = pickPort({ schema: 'http', port: '8080' });
    assert.equal(result, 8080);
  });

  it('should return by provided schema when an invalid port is provided', () => {
    const result = pickPort({ schema: 'http', port: 'abc' });
    assert.equal(result, 80);

    const result2 = pickPort({ schema: 'https', port: 'abc' });
    assert.equal(result2, 443);
  });
});

describe('getSchema', () => {
  it('should return "http" when given "http:"', () => {
    const result = getSchema('http:');
    assert.equal(result, 'http');
  });

  it('should return "https" when given "https:"', () => {
    const result = getSchema('https:');
    assert.equal(result, 'https');
  });

  it('should return "https" when given an invalid protocol', () => {
    const result = getSchema('ftp:');
    assert.equal(result, 'https');
  });

  it('should return "https" when given a "https" protocol without colon', () => {
    const result = getSchema('https');
    assert.equal(result, 'https');
  });
});
