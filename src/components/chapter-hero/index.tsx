import type { ChapterHeroProps } from './props';
import styles from './styles.module.scss';

export const ChapterHero = ({ content }: ChapterHeroProps) => (
  <header className={styles.root}>
    <nav className={styles.topbar} aria-label="Informações do protótipo">
      <span className={styles.brand}>FIAP · LAB</span>
      <span className={styles.status}>
        <i className={styles.statusDot} /> GET /teste.json · 200
      </span>
    </nav>

    <div className={styles.content}>
      <div>
        <p className={styles.eyebrow}>
          {content.course} <span>/</span> {content.discipline}
        </p>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.description}>
          Protótipo do template consumindo uma estrutura de conteúdo externa, sem acoplamento entre dados e layout.
        </p>
      </div>
      <div className={styles.badge}>
        <span>Capítulo</span>
        <strong>{content.chapterNumber.padStart(2, '0')}</strong>
      </div>
    </div>
  </header>
);
