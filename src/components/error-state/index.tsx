import { Button } from '../button';
import type { ErrorStateProps } from './props';
import styles from './styles.module.scss';

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <main className={styles.root} role="alert">
    <span className={styles.icon}>!</span>
    <h1>Falha ao montar o capítulo</h1>
    <p>{message}</p>
    <Button className={styles.button} onClick={onRetry}>Tentar novamente</Button>
  </main>
);
