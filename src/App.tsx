import { useEffect, useState } from 'react';
import { ContentPage } from './components/content-page';
import { getContent } from './services/content-service';
import type { ContentDocument } from './types/content';

type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: ContentDocument }
  | { status: 'error'; message: string };

export const App = () => {
  const [requestState, setRequestState] = useState<RequestState>({ status: 'loading' });
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setRequestState({ status: 'loading' });
    getContent(controller.signal)
      .then(data => setRequestState({ status: 'success', data }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        const message = error instanceof Error ? error.message : 'Erro inesperado ao carregar o conteúdo.';
        setRequestState({ status: 'error', message });
      });

    return () => controller.abort();
  }, [requestKey]);

  if (requestState.status === 'loading') {
    return (
      <main className="state-screen" aria-busy="true" aria-live="polite">
        <div className="loader" />
        <p>Buscando o conteúdo em <code>/teste.json</code>…</p>
      </main>
    );
  }

  if (requestState.status === 'error') {
    return (
      <main className="state-screen" role="alert">
        <span className="state-screen__icon">!</span>
        <h1>Falha ao montar o capítulo</h1>
        <p>{requestState.message}</p>
        <button className="button" onClick={() => setRequestKey(key => key + 1)} type="button">
          Tentar novamente
        </button>
      </main>
    );
  }

  return <ContentPage document={requestState.data} />;
};

