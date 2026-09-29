import { createHash } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { HashGeneratorPort } from '../../application/ports/hash-generator.port.js';

@Injectable()
export class Sha256HashGenerator implements HashGeneratorPort {
  private static readonly HASH_LENGTH = 11;

  generate(value: string): string {
    return createHash('sha256')
      .update(value)
      .digest('base64url')
      .slice(0, Sha256HashGenerator.HASH_LENGTH);
  }
}
