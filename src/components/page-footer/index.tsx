import type { PageFooterProps } from './props';
import styles from './styles.module.scss';

export const PageFooter = ({ contentId, schemaVersion }: PageFooterProps) => (
  <footer className={styles.root}>
    <span>Protótipo técnico</span>
    <span>conteúdo #{contentId} · schema v{schemaVersion}</span>
  </footer>
);
