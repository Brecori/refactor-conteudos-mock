import type { LoadingStateProps } from './props';
import styles from './styles.module.scss';

export const LoadingState = ({ resourceLabel = '/teste.json' }: LoadingStateProps) => (
  <main className={styles.root} aria-busy="true" aria-live="polite">
    <div className={styles.loader} />
    <p>
      Buscando o conteúdo em <code>{resourceLabel}</code>…
    </p>
  </main>
);
