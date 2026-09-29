import { InvalidUrlError } from '../errors/invalid-url.error.js';
import { OriginalUrl } from './original-url.js';

describe('OriginalUrl', () => {
  it('normalizes an absolute HTTP URL', () => {
    const url = OriginalUrl.create('https://EXAMPLE.com/products?id=1');

    expect(url.value).toBe('https://example.com/products?id=1');
  });

  it.each([
    'example.com',
    '/relative-path',
    'ftp://example.com/file',
    '',
    undefined,
  ])('rejects an invalid or unsupported URL: %s', (value) => {
    expect(() => OriginalUrl.create(value)).toThrow(InvalidUrlError);
  });
});
