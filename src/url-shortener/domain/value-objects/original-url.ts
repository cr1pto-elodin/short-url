import { InvalidUrlError } from '../errors/invalid-url.error.js';

export class OriginalUrl {
  private constructor(private readonly normalizedValue: string) {}

  static create(value: unknown): OriginalUrl {
    if (typeof value !== 'string') {
      throw new InvalidUrlError();
    }

    try {
      const url = new URL(value);

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new InvalidUrlError();
      }

      return new OriginalUrl(url.toString());
    } catch (error) {
      if (error instanceof InvalidUrlError) {
        throw error;
      }

      throw new InvalidUrlError();
    }
  }

  get value(): string {
    return this.normalizedValue;
  }
}
