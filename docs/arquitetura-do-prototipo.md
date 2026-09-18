# Arquitetura do protótipo

## Objetivo

Validar visualmente uma arquitetura em que o template deixa de declarar o conteúdo pedagógico diretamente em JSX e passa a interpretar um documento JSON versionado.

O `grad-template-react` continua sendo a referência de domínio: ele organiza a página em template, seções e componentes como título, lista, vídeo, figura, bloco de código e slider. Este protótipo preserva essa ideia de composição, mas não reutiliza sua aparência nem suas dependências.

## Responsabilidades

### JSON

- Armazena metadados do capítulo, seções e blocos.
- Usa `type` como discriminador de cada bloco.
- Declara `schemaVersion` para permitir evolução futura do contrato.

### Serviço

- Simula latência antes do `fetch`.
- Trata status HTTP e cancelamento.
- Faz uma validação estrutural mínima antes de entregar os dados à interface.

### Renderer

- Percorre seções e blocos sem conhecer o conteúdo específico do capítulo.
- Mapeia cada `type` para um componente visual local.
- Permite blocos dentro do slider usando o mesmo renderer.

### Componentes locais

- Definem apenas a apresentação desta prova de conceito.
- Implementam interações pequenas, como copiar código e navegar no slider.
- Não tentam emular a futura biblioteca headless de comportamentos compartilháveis.

## Limites intencionais

- A validação não substitui um schema formal em JSON Schema, Zod ou ferramenta equivalente.
- Não há CMS, API real, cache ou persistência.
- O JSON de runtime em `public/teste.json` replica o arquivo raiz para que o Vite possa servi-lo estaticamente.
- URLs de mídia fornecidas no exemplo podem não existir; a imagem apresenta fallback visual quando falha.
- A renderização usa texto do React, sem HTML arbitrário e sem `dangerouslySetInnerHTML`.

## Próximos passos possíveis

1. Formalizar o contrato em JSON Schema e validar documentos no build e no runtime.
2. Definir política de compatibilidade e migração entre versões de schema.
3. Separar dados pedagógicos, metadados de navegação e estados vindos de API.
4. Criar um registry extensível de blocos quando houver consumidores reais além do protótipo.
5. Só então conectar os comportamentos headless levantados na análise compartilhada.

