import type { ContentDocument } from '../types/content';

const CONTENT_URL = '/teste.json';
const FAKE_LATENCY_IN_MS = 650;

const wait = (milliseconds: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, milliseconds);

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException('Requisição cancelada', 'AbortError'));
      },
      { once: true }
    );
  });

const isContentDocument = (value: unknown): value is ContentDocument => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<ContentDocument>;

  return (
    candidate.schemaVersion === 1 &&
    Boolean(candidate.content?.id) &&
    Boolean(candidate.content?.title) &&
    Array.isArray(candidate.sections)
  );
};

export const getContent = async (signal?: AbortSignal): Promise<ContentDocument> => {
  await wait(FAKE_LATENCY_IN_MS, signal);

  const response = await fetch(CONTENT_URL, { signal });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar o conteúdo (${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!isContentDocument(data)) {
    throw new Error('O JSON recebido não corresponde à versão 1 do contrato.');
  }

  return data;
};

