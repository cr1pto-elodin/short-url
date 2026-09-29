export class InvalidUrlError extends Error {
  constructor() {
    super('A URL deve ser absoluta e usar o protocolo HTTP ou HTTPS.');
    this.name = 'InvalidUrlError';
  }
}
