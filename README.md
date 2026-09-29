# Short URL

Projeto de estudo de um encurtador de URLs construído com NestJS e arquitetura
hexagonal.

## Escopo atual

Nesta primeira fase, a aplicação somente valida e normaliza uma URL e gera um
hash curto e determinístico. Ainda não existe persistência nem redirecionamento,
portanto o hash não pode ser resolvido de volta para a URL original.

## Arquitetura

O módulo `url-shortener` está dividido em quatro áreas:

- `domain`: regras centrais e o value object que valida a URL;
- `application`: caso de uso e porta para geração do hash;
- `infrastructure`: adaptador que implementa a porta com SHA-256;
- `presentation`: adaptador HTTP do NestJS.

O fluxo de dependências parte dos adaptadores em direção à aplicação e ao
domínio. O caso de uso conhece a abstração `HashGeneratorPort`, mas não conhece
o algoritmo concreto.

## Geração do hash

A URL é normalizada pela API nativa `URL`. Somente os protocolos HTTP e HTTPS
são aceitos. Em seguida, a implementação atual calcula SHA-256, converte o
resultado para Base64 URL-safe e utiliza os primeiros 11 caracteres,
representando aproximadamente 64 bits.

Como o resultado é truncado, existe uma possibilidade teórica de colisão. Uma
fase futura com persistência deverá impor unicidade e tratar eventuais colisões.

## API

### Criar um hash

```http
POST /urls/hash
Content-Type: application/json

{
  "url": "https://example.com/produtos/123"
}
```

Resposta `201 Created`:

```json
{
  "hash": "wMwEMsiXMJw"
}
```

Uma URL relativa, malformada ou com protocolo diferente de HTTP/HTTPS retorna
`400 Bad Request`.

## Executando o projeto

```bash
pnpm install
pnpm run start:dev
```

## Validações

```bash
pnpm run lint
pnpm run test
pnpm run test:e2e
pnpm run build
```

## Próximos passos

- adicionar um repositório por meio de uma nova porta de saída;
- persistir a associação entre hash e URL;
- detectar e resolver colisões;
- criar o endpoint de redirecionamento;
- discutir expiração, rate limiting, cache e observabilidade.
