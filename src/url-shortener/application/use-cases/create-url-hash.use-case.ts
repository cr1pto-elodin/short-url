import { OriginalUrl } from '../../domain/value-objects/original-url.js';
import { HashGeneratorPort } from '../ports/hash-generator.port.js';

export interface CreateUrlHashInput {
  url: unknown;
}

export interface CreateUrlHashOutput {
  hash: string;
}

export class CreateUrlHashUseCase {
  constructor(private readonly hashGenerator: HashGeneratorPort) {}

  execute(input: CreateUrlHashInput): CreateUrlHashOutput {
    const originalUrl = OriginalUrl.create(input.url);

    return {
      hash: this.hashGenerator.generate(originalUrl.value),
    };
  }
}
