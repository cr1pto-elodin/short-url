import { Sha256HashGenerator } from './sha256-hash-generator.js';

describe('Sha256HashGenerator', () => {
  const generator = new Sha256HashGenerator();

  it('generates the same URL-safe 11-character hash for the same value', () => {
    const firstHash = generator.generate('https://example.com/');
    const secondHash = generator.generate('https://example.com/');

    expect(firstHash).toBe(secondHash);
    expect(firstHash).toMatch(/^[A-Za-z0-9_-]{11}$/);
  });

  it('generates different hashes for different values', () => {
    expect(generator.generate('https://example.com/one')).not.toBe(
      generator.generate('https://example.com/two'),
    );
  });
});
