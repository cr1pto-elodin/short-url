import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUrlHashUseCase } from '../../application/use-cases/create-url-hash.use-case.js';
import { InvalidUrlError } from '../../domain/errors/invalid-url.error.js';
import { CreateUrlHashDto } from './create-url-hash.dto.js';

@Controller('urls')
export class CreateUrlHashController {
  constructor(private readonly createUrlHash: CreateUrlHashUseCase) {}

  @Post('hash')
  create(@Body() dto: CreateUrlHashDto) {
    try {
      return this.createUrlHash.execute(dto);
    } catch (error) {
      if (error instanceof InvalidUrlError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
