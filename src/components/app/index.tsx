import { useEffect, useState } from 'react';
import { ContentPage } from '../content-page';
import { ErrorState } from '../error-state';
import { LoadingState } from '../loading-state';
import { getContent } from '../../services/content-service';
import type { ContentDocument } from '../../types/content';
import type { AppProps } from './props';
import styles from './styles.module.scss';

type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: ContentDocument }
  | { status: 'error'; message: string };

export const App = ({}: AppProps) => {
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

  return (
    <div className={styles.application}>
      {requestState.status === 'loading' ? <LoadingState /> : null}
      {requestState.status === 'error' ? (
        <ErrorState message={requestState.message} onRetry={() => setRequestKey(key => key + 1)} />
      ) : null}
      {requestState.status === 'success' ? <ContentPage document={requestState.data} /> : null}
    </div>
  );
};
