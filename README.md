# Refactor de conteúdos — protótipo JSON

Este projeto é uma prova de conceito para avaliar uma nova forma de entregar os conteúdos educacionais dos templates FIAP.

Hoje, projetos como o `grad-template-react` possuem boa parte do conteúdo pedagógico declarado diretamente em JSX. Isso mantém dados, estrutura da página e componentes visuais fortemente ligados. A proposta estudada é transportar o conteúdo para um documento JSON versionado e deixar o template responsável por interpretar esse contrato e escolher como cada bloco será apresentado.

O objetivo deste repositório é tornar essa ideia visível e testável antes de qualquer migração dos templates reais.

## O que este protótipo demonstra

- Carregamento assíncrono de um capítulo por `fetch`;
- metadados, seções e blocos descritos em JSON;
- seleção do componente pelo campo discriminador `type`;
- renderização recursiva de blocos dentro de sliders;
- estados de carregamento e erro;
- interações locais para slider e cópia de código;
- layout responsivo independente do `grad-template-react`;
- contrato preparado para evolução por meio de `schemaVersion`.

O conteúdo de exemplo apresenta um capítulo de **HTML básico**, dividido em Introdução, Desenvolvimento e Conclusão.

## O que não faz parte deste escopo

Este projeto não é uma nova versão do template de Graduação e não deve ser tratado como implementação final.

Ele não contém:

- API, CMS ou persistência reais;
- a futura biblioteca compartilhada de comportamentos;
- os componentes e estilos oficiais dos templates FIAP;
- autenticação, navegação entre capítulos ou regras de curso;
- validação completa com JSON Schema;
- suporte a conteúdo HTML arbitrário.

Os componentes visuais são deliberadamente simples. Eles existem apenas para comprovar que um mesmo renderer consegue montar a página a partir de dados externos.

## Fluxo da aplicação

```text
public/teste.json
        │
        ▼
fetch + latência simulada
        │
        ▼
content-service.ts
validação estrutural mínima
        │
        ▼
ContentPage
metadados e seções
        │
        ▼
BlockRenderer
seleção pelo campo "type"
        │
        ▼
componentes visuais locais
```

## Contrato de conteúdo

O documento possui três níveis principais:

```text
ContentDocument
├── schemaVersion
├── content
│   ├── id
│   ├── title
│   ├── chapterNumber
│   ├── course
│   ├── discipline
│   └── theme
└── sections[]
    ├── id
    ├── title
    └── blocks[]
```

Blocos atualmente suportados:

| Tipo | Finalidade |
| --- | --- |
| `paragraph` | Texto corrido |
| `subtitle` | Subdivisão interna de uma seção |
| `list` | Lista não ordenada |
| `ordered-list` | Lista numerada configurável |
| `code-box` | Um ou mais trechos de código |
| `image` | Imagem com texto alternativo e fallback |
| `video` | Vídeo externo do Vimeo |
| `slider` | Sequência navegável de outros blocos |

O contrato TypeScript está em [`src/types/content.ts`](./src/types/content.ts).

## Fonte de dados

O arquivo [`../teste.json`](../teste.json) é a referência editável mantida na pasta do estudo. Uma cópia equivalente fica em [`public/teste.json`](./public/teste.json), dentro deste projeto, pois arquivos da pasta `public` são disponibilizados pelo Vite durante desenvolvimento e produção.

A aplicação realiza:

```ts
fetch('/teste.json')
```

Existe uma latência artificial curta para tornar perceptível o estado de carregamento e aproximar o protótipo de uma integração HTTP.

## Estrutura do projeto

```text
src/
├── components/
│   ├── app/
│   ├── blocks/
│   │   ├── block-renderer/
│   │   ├── code-box-block/
│   │   ├── image-block/
│   │   ├── list-block/
│   │   ├── paragraph-block/
│   │   ├── slider-block/
│   │   ├── subtitle-block/
│   │   └── video-block/
│   ├── button/
│   ├── chapter-hero/
│   ├── content-page/
│   ├── content-section/
│   ├── error-state/
│   ├── loading-state/
│   └── page-footer/
├── services/
│   └── content-service.ts
├── types/
│   ├── content.ts
│   └── styles.d.ts
└── main.tsx
```

Responsabilidades principais:

- `components/app`: controla carregamento, sucesso, erro e nova tentativa;
- `content-service.ts`: simula a requisição e valida o documento recebido;
- `content-page.tsx`: monta capa, seções e rodapé;
- `block-renderer.tsx`: direciona cada tipo de bloco ao componente correspondente;
- `content.ts`: define o contrato TypeScript;
- cada componente possui `index.tsx`, `props.ts` e `styles.module.scss`, mantendo tipagem e estilos Sass isolados.

## Executando localmente

Requisitos:

- Node.js 18 ou superior;
- npm.

Instale as dependências e inicie o Vite:

```bash
npm install
npm run dev
```

Para validar e gerar a versão de produção:

```bash
npm run build
```

Para visualizar o build gerado:

```bash
npm run preview
```

## Decisões importantes

- O JSON utiliza texto simples; o renderer não usa `dangerouslySetInnerHTML`.
- A validação atual confirma apenas a estrutura mínima do documento.
- A apresentação pertence ao projeto consumidor, não ao contrato JSON.
- As interações existentes ainda são locais e não representam a API da futura biblioteca headless.
- A adoção em templates reais deve preservar conteúdo, ordenação, acessibilidade e regras específicas de cada produto.

## Próximos passos possíveis

1. Formalizar o contrato usando JSON Schema ou ferramenta equivalente.
2. Validar o conteúdo durante o build e também no runtime.
3. Definir compatibilidade e migrações entre versões do schema.
4. Separar conteúdo pedagógico de dados operacionais vindos de APIs.
5. Criar um registry extensível quando existirem novos tipos de bloco.
6. Integrar gradualmente os comportamentos headless levantados no estudo.

## Materiais relacionados

- [Análise de comportamentos compartilháveis](../analise-refactor-conteudos-compartilhados.md)
- [Decisões de arquitetura do protótipo](./docs/arquitetura-do-prototipo.md)
- [Mapeamento de requisições](../requisicoes-api.xlsx)
- [Board de referência no Miro](https://miro.com/app/board/uXjVHl0amJ0=/)
