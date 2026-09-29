import { HashGeneratorPort } from '../ports/hash-generator.port.js';
import { CreateUrlHashUseCase } from './create-url-hash.use-case.js';

describe('CreateUrlHashUseCase', () => {
  it('generates a hash from the normalized URL', () => {
    const hashGenerator: HashGeneratorPort = {
      generate: vi.fn().mockReturnValue('generatedHash'),
    };
    const useCase = new CreateUrlHashUseCase(hashGenerator);

    const result = useCase.execute({ url: 'https://EXAMPLE.com' });

    expect(hashGenerator.generate).toHaveBeenCalledWith('https://example.com/');
    expect(result).toEqual({ hash: 'generatedHash' });
  });
});
