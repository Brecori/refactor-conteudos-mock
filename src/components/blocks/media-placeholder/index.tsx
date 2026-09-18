import type { MediaPlaceholderProps } from './props';
import styles from './styles.module.scss';

export const MediaPlaceholder = ({ alternativeText, detail, message }: MediaPlaceholderProps) => (
  <div className={styles.root} role="img" aria-label={alternativeText}>
    <span>{message}</span>
    {detail ? <small className={styles.detail}>{detail}</small> : null}
  </div>
);
