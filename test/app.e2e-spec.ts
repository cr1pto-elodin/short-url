import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('URL hash creation (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(0);
  });

  it('POST /urls/hash returns a deterministic hash', () => {
    return request(app.getHttpServer())
      .post('/urls/hash')
      .send({ url: 'https://example.com' })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual({ hash: expect.stringMatching(/^[\w-]{11}$/) });
      });
  });

  it('POST /urls/hash rejects an invalid URL', () => {
    return request(app.getHttpServer())
      .post('/urls/hash')
      .send({ url: 'example.com' })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe(
          'A URL deve ser absoluta e usar o protocolo HTTP ou HTTPS.',
        );
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
