import { Module } from '@nestjs/common';
import { HashGeneratorPort } from './application/ports/hash-generator.port.js';
import { CreateUrlHashUseCase } from './application/use-cases/create-url-hash.use-case.js';
import { Sha256HashGenerator } from './infrastructure/cryptography/sha256-hash-generator.js';
import { CreateUrlHashController } from './presentation/http/create-url-hash.controller.js';

@Module({
  controllers: [CreateUrlHashController],
  providers: [
    {
      provide: HashGeneratorPort,
      useClass: Sha256HashGenerator,
    },
    {
      provide: CreateUrlHashUseCase,
      inject: [HashGeneratorPort],
      useFactory: (hashGenerator: HashGeneratorPort) =>
        new CreateUrlHashUseCase(hashGenerator),
    },
  ],
})
export class UrlShortenerModule {}
